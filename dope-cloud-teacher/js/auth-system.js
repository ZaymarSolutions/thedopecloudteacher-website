// Authentication and Monetization System
// Use global config or fallback for API URL
const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const sameOriginApi = `${window.location.origin}/api`;
const apiOverride = new URLSearchParams(window.location.search).get('api');
const storedApiUrl = localStorage.getItem('DCT_API_URL');
const normalizeApiBase = (value) => (typeof value === 'string' ? value.trim().replace(/\/$/, '') : '');

const API_FALLBACKS = [
  normalizeApiBase(window.DCT_API_URL),
  normalizeApiBase(apiOverride),
  normalizeApiBase(storedApiUrl),
  isLocalhost ? 'http://localhost:3000/api' : sameOriginApi,
  'https://thedopecloudteacher.org/api',
  'https://thedopecloudteacher.com/api'
].filter((url, index, list) => url && list.indexOf(url) === index);

let API_URL = API_FALLBACKS[0];
window.DCT_API_URL = API_URL;

const RETRYABLE_STATUS_CODES = new Set([404, 405, 502, 503, 504]);

async function fetchWithApiFallback(path, options = {}) {
  let lastError = null;

  for (const baseUrl of API_FALLBACKS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, options);

      if (RETRYABLE_STATUS_CODES.has(response.status)) {
        lastError = new Error(`API endpoint ${baseUrl} responded with ${response.status}`);
        continue;
      }

      if (baseUrl !== API_URL) {
        API_URL = baseUrl;
        window.DCT_API_URL = baseUrl;
        localStorage.setItem('DCT_API_URL', baseUrl);
      }

      return response;
    } catch (error) {
      lastError = error;
    }
  }

  throw formatNetworkError(lastError || new Error('Unable to reach any configured API endpoint'));
}

function formatNetworkError(error) {
  if (error instanceof TypeError || /fetch/i.test(error?.message || '')) {
    return new Error(`Unable to reach the app server at ${API_URL}. Please verify backend deployment and API URL configuration.`);
  }
  return error;
}

async function readApiError(response, fallbackMessage) {
  let payload = {};

  try {
    payload = await response.json();
  } catch (jsonError) {
    payload = {};
  }

  const serverMessage = payload.error || payload.message;
  if (serverMessage) {
    return serverMessage;
  }

  if (response.status === 405 || response.status === 404) {
    return `Auth API routing issue detected (${response.status}). This domain is not forwarding /api requests to the backend service.`;
  }

  return `${fallbackMessage} (HTTP ${response.status})`;
}

class DopeCloudAuth {
  constructor() {
    this.token = localStorage.getItem('dct_token');
    this.user = JSON.parse(localStorage.getItem('dct_user') || 'null');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }

  // Get auth headers
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  }

  // Register new user
  async register(email, password, name, phone = '', organization = '') {
    try {
      const response = await fetchWithApiFallback('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, phone, organization })
      });

      const data = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        const errorMessage = data.error || await readApiError(response, 'Registration failed');
        throw new Error(errorMessage);
      }

      this.token = data.token;
      this.user = data.user;
      localStorage.setItem('dct_token', data.token);
      localStorage.setItem('dct_user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw formatNetworkError(error);
    }
  }

  // Login user
  async login(email, password) {
    try {
      const response = await fetchWithApiFallback('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        const errorMessage = data.error || await readApiError(response, 'Login failed');
        throw new Error(errorMessage);
      }

      this.token = data.token;
      this.user = data.user;
      localStorage.setItem('dct_token', data.token);
      localStorage.setItem('dct_user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw formatNetworkError(error);
    }
  }

  // Logout
  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('dct_token');
    localStorage.removeItem('dct_user');
    window.location.href = 'index.html';
  }

  // Get current user
  async getCurrentUser() {
    if (!this.token) return null;

    try {
      const response = await fetchWithApiFallback('/auth/me', {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        this.logout();
        return null;
      }

      const data = await response.json();
      this.user = data.user;
      localStorage.setItem('dct_user', JSON.stringify(data.user));
      
      return data.user;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }
}

class DopeCourseAccess {
  constructor(auth) {
    this.auth = auth;
  }

  // Check if user has access to a course
  async hasCourseAccess(courseId) {
    if (!this.auth.isAuthenticated()) {
      return false;
    }

    try {
      const response = await fetchWithApiFallback(`/courses/${courseId}/access`, {
        headers: this.auth.getHeaders()
      });

      const data = await response.json();
      return data.hasAccess;
    } catch (error) {
      console.error('Access check error:', error);
      return false;
    }
  }

  // Get all courses
  async getAllCourses() {
    try {
      const response = await fetchWithApiFallback('/courses');
      const data = await response.json();
      return data.courses;
    } catch (error) {
      console.error('Get courses error:', error);
      return [];
    }
  }

  // Create checkout session
  async purchaseCourse(courseId) {
    if (!this.auth.isAuthenticated()) {
      throw new Error('Please log in to purchase courses');
    }

    try {
      const response = await fetchWithApiFallback('/create-checkout', {
        method: 'POST',
        headers: this.auth.getHeaders(),
        body: JSON.stringify({ courseId })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Purchase error:', error);
      throw error;
    }
  }
}

class DopeProgressTracker {
  constructor(auth) {
    this.auth = auth;
  }

  // Get progress for a course
  async getCourseProgress(courseId) {
    if (!this.auth.isAuthenticated()) {
      return [];
    }

    try {
      const response = await fetchWithApiFallback(`/progress/${courseId}`, {
        headers: this.auth.getHeaders()
      });

      const data = await response.json();
      return data.progress;
    } catch (error) {
      console.error('Get progress error:', error);
      return [];
    }
  }

  // Mark lesson as complete
  async completeLesson(courseId, lessonId, quizScore = null, timeSpent = 0) {
    if (!this.auth.isAuthenticated()) {
      throw new Error('Please log in to track progress');
    }

    try {
      const response = await fetchWithApiFallback('/progress', {
        method: 'POST',
        headers: this.auth.getHeaders(),
        body: JSON.stringify({
          courseId,
          lessonId,
          completed: true,
          quizScore,
          timeSpent
        })
      });

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Complete lesson error:', error);
      throw error;
    }
  }

  // Calculate course completion percentage
  async getCourseCompletionPercentage(courseId, totalLessons) {
    const progress = await this.getCourseProgress(courseId);
    const completed = progress.filter(p => p.completed).length;
    return Math.round((completed / totalLessons) * 100);
  }
}

class DopeCertificates {
  constructor(auth) {
    this.auth = auth;
  }

  // Generate certificate
  async generateCertificate(courseId) {
    if (!this.auth.isAuthenticated()) {
      throw new Error('Please log in to generate certificates');
    }

    try {
      const response = await fetchWithApiFallback('/certificates/generate', {
        method: 'POST',
        headers: this.auth.getHeaders(),
        body: JSON.stringify({ courseId })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Certificate generation failed');
      }

      return data.certificate;
    } catch (error) {
      console.error('Certificate generation error:', error);
      throw error;
    }
  }

  // Get all user certificates
  async getMyCertificates() {
    if (!this.auth.isAuthenticated()) {
      return [];
    }

    try {
      const response = await fetchWithApiFallback('/certificates', {
        headers: this.auth.getHeaders()
      });

      const data = await response.json();
      return data.certificates;
    } catch (error) {
      console.error('Get certificates error:', error);
      return [];
    }
  }

  // Verify certificate
  async verifyCertificate(code) {
    try {
      const response = await fetchWithApiFallback(`/certificates/verify/${code}`);
      const data = await response.json();
      
      if (!response.ok) {
        return { valid: false };
      }

      return data;
    } catch (error) {
      console.error('Certificate verification error:', error);
      return { valid: false };
    }
  }
}

// Initialize global instances
const dopeAuth = new DopeCloudAuth();
const dopeCourses = new DopeCourseAccess(dopeAuth);
const dopeProgress = new DopeProgressTracker(dopeAuth);
const dopeCertificates = new DopeCertificates(dopeAuth);

// UI Helper Functions
function showAuthModal(mode = 'login') {
  const modal = document.getElementById('authModal');
  if (!modal) {
    createAuthModal();
  }
  
  document.getElementById('authModal').style.display = 'flex';
  if (mode === 'register') {
    showRegisterForm();
  } else {
    showLoginForm();
  }
}

function hideAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function createAuthModal() {
  const modalHTML = `
    <div id="authModal" class="auth-modal" style="display: none;">
      <div class="auth-modal-content">
        <span class="auth-close" onclick="hideAuthModal()">&times;</span>
        
        <div id="loginForm" class="auth-form">
          <h2>Sign In to The Dope Cloud Teacher</h2>
          <form onsubmit="handleLogin(event)">
            <input type="email" id="loginEmail" placeholder="Email" required />
            <input type="password" id="loginPassword" placeholder="Password" required />
            <button type="submit" class="auth-button">Sign In</button>
          </form>
          <p>Don't have an account? <a href="#" onclick="showRegisterForm(); return false;">Create one</a></p>
          <div id="loginError" class="auth-error"></div>
        </div>

        <div id="registerForm" class="auth-form" style="display: none;">
          <h2>Create Your Account</h2>
          <form onsubmit="handleRegister(event)">
            <input type="text" id="registerName" placeholder="Full Name" required />
            <input type="email" id="registerEmail" placeholder="Email" required />
            <input type="password" id="registerPassword" placeholder="Password (min 8 characters)" required minlength="8" />
            <input type="tel" id="registerPhone" placeholder="Phone (optional)" />
            <input type="text" id="registerOrg" placeholder="Organization (optional)" />
            <button type="submit" class="auth-button">Create Account</button>
          </form>
          <p>Already have an account? <a href="#" onclick="showLoginForm(); return false;">Sign in</a></p>
          <div id="registerError" class="auth-error"></div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .auth-modal {
      display: none;
      position: fixed;
      z-index: 10000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.8);
      justify-content: center;
      align-items: center;
    }
    .auth-modal-content {
      background: linear-gradient(135deg, #171d3f, #0b1025);
      padding: 2rem;
      border-radius: 15px;
      width: 90%;
      max-width: 450px;
      position: relative;
      box-shadow: 0 10px 50px rgba(123, 77, 242, 0.3);
    }
    .auth-close {
      position: absolute;
      right: 20px;
      top: 15px;
      font-size: 2rem;
      color: #77efe3;
      cursor: pointer;
    }
    .auth-close:hover {
      color: #fff;
    }
    .auth-form h2 {
      color: #77efe3;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    .auth-form input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: 2px solid #7b4df2;
      border-radius: 8px;
      background: rgba(255,255,255,0.1);
      color: #fff;
      font-size: 1rem;
      box-sizing: border-box;
    }
    .auth-form input:focus {
      outline: none;
      border-color: #77efe3;
    }
    .auth-button {
      width: 100%;
      padding: 12px;
      margin: 15px 0;
      background: #7b4df2;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
    }
    .auth-button:hover {
      background: #5f39c7;
      transform: translateY(-2px);
    }
    .auth-form p {
      text-align: center;
      color: #ddd;
      margin-top: 1rem;
    }
    .auth-form a {
      color: #77efe3;
      text-decoration: none;
    }
    .auth-form a:hover {
      text-decoration: underline;
    }
    .auth-error {
      color: #ff6b6b;
      text-align: center;
      margin-top: 10px;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);
}

function showLoginForm() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
}

function showRegisterForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
}

async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const errorDiv = document.getElementById('loginError');

  try {
    errorDiv.textContent = 'Signing in...';
    await dopeAuth.login(email, password);
    errorDiv.textContent = '';
    hideAuthModal();
    window.location.reload();
  } catch (error) {
    errorDiv.textContent = error.message;
  }
}

async function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const phone = document.getElementById('registerPhone').value;
  const organization = document.getElementById('registerOrg').value;
  const errorDiv = document.getElementById('registerError');

  try {
    errorDiv.textContent = 'Creating account...';
    await dopeAuth.register(email, password, name, phone, organization);
    errorDiv.textContent = '';
    hideAuthModal();
    window.location.reload();
  } catch (error) {
    errorDiv.textContent = error.message;
  }
}

// Update UI based on authentication status
function updateAuthUI() {
  const authButtons = document.querySelectorAll('.auth-required');
  const userNameElements = document.querySelectorAll('.user-name');
  
  if (dopeAuth.isAuthenticated()) {
    authButtons.forEach(btn => {
      btn.textContent = 'My Dashboard';
      btn.onclick = () => window.location.href = 'dashboard.html';
    });

    if (dopeAuth.user) {
      userNameElements.forEach(el => {
        el.textContent = dopeAuth.user.name;
      });
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  createAuthModal();
  updateAuthUI();
});

// Export for use in other scripts
window.dopeAuth = dopeAuth;
window.dopeCourses = dopeCourses;
window.dopeProgress = dopeProgress;
window.dopeCertificates = dopeCertificates;
window.showAuthModal = showAuthModal;
window.hideAuthModal = hideAuthModal;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.showLoginForm = showLoginForm;
window.showRegisterForm = showRegisterForm;

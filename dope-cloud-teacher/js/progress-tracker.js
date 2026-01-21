/**
 * Progress Tracker for Lessons
 * Tracks lesson completion and stores progress in localStorage
 */

// Initialize progress data
function initProgress() {
  if (!localStorage.getItem('lessonProgress')) {
    localStorage.setItem('lessonProgress', JSON.stringify({}));
  }
}

// Get current lesson number from the page
function getCurrentLessonNumber() {
  const title = document.querySelector('h1')?.textContent || '';
  const match = title.match(/Lesson (\d+)/i);
  return match ? parseInt(match[1]) : null;
}

// Mark current lesson as completed
function markLessonComplete() {
  initProgress();
  const lessonNum = getCurrentLessonNumber();
  if (lessonNum) {
    const progress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
    progress[`lesson${lessonNum}`] = {
      completed: true,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem('lessonProgress', JSON.stringify(progress));
    console.log(`Lesson ${lessonNum} marked as complete`);
    return true;
  }
  return false;
}

// Get lesson progress
function getLessonProgress(lessonNum) {
  initProgress();
  const progress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
  return progress[`lesson${lessonNum}`] || { completed: false };
}

// Get all progress
function getAllProgress() {
  initProgress();
  return JSON.parse(localStorage.getItem('lessonProgress') || '{}');
}

// Calculate completion percentage
function getCompletionPercentage() {
  const progress = getAllProgress();
  const totalLessons = 10;
  const completedLessons = Object.values(progress).filter(p => p.completed).length;
  return Math.round((completedLessons / totalLessons) * 100);
}

// Display progress indicator on page
function displayProgress() {
  const lessonNum = getCurrentLessonNumber();
  if (lessonNum) {
    const progress = getLessonProgress(lessonNum);
    if (progress.completed) {
      const indicator = document.createElement('div');
      indicator.className = 'completion-indicator';
      indicator.innerHTML = `
        <div style="background: rgba(16, 185, 129, 0.2); border: 2px solid #10b981; padding: 1rem; border-radius: 10px; margin: 1rem 0; text-align: center;">
          <span style="color: #10b981; font-size: 1.5rem;">✓</span>
          <span style="color: white; margin-left: 0.5rem;">Lesson Completed</span>
        </div>
      `;
      document.body.insertBefore(indicator, document.body.firstChild);
    }
  }
}

// Auto-mark lesson as complete when user reaches the end
function setupAutoComplete() {
  let scrolledToBottom = false;
  
  window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    
    if (scrollPercentage > 0.9 && !scrolledToBottom) {
      scrolledToBottom = true;
      markLessonComplete();
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initProgress();
  displayProgress();
  setupAutoComplete();
  
  // Add manual complete button
  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Mark as Complete';
  completeBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    z-index: 1000;
  `;
  
  completeBtn.addEventListener('click', () => {
    if (markLessonComplete()) {
      completeBtn.textContent = '✓ Completed!';
      completeBtn.style.background = '#059669';
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  });
  
  document.body.appendChild(completeBtn);
});

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
  window.progressTracker = {
    markComplete: markLessonComplete,
    getProgress: getLessonProgress,
    getAllProgress: getAllProgress,
    getCompletionPercentage: getCompletionPercentage
  };
}

(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const hubCourses = new Set(['cloud-fundamentals-101','az-900-azure-fundamentals','az-104-azure-administrator','az-305-azure-solutions-architect','ai-901-azure-ai-fundamentals','ai-fundamentals-everyday-ai','cloud-security','ai-security-responsible-governance','cyber-basics-stay-safer-online']);
  let selectedPhoto = null;
  let preparingPhoto = false;
  function showPhoto(photo, name) {
    const image = byId('profileImagePreview');
    const initials = byId('profileInitials');
    initials.textContent = String(name || 'DCT').trim().split(/\s+/).slice(0,2).map(word => word[0]).join('').toUpperCase();
    image.hidden = !photo;
    initials.hidden = Boolean(photo);
    if (photo) image.src = photo;
    else image.removeAttribute('src');
    image.onerror = () => {
      image.hidden = true;
      initials.hidden = false;
      byId('profileImageStatus').textContent = 'Your saved photo could not be displayed. Choose another photo to replace it.';
    };
  }
  async function requestJson(path) {
    const response = await fetchWithApiFallback(path, { headers: dopeAuth.getHeaders() });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Unable to load this section right now.');
    return data;
  }
  function makeCard(title, description, href, label) {
    const card = document.createElement('article');
    card.className = 'account-card';
    const heading = document.createElement('h3');
    heading.textContent = title;
    const paragraph = document.createElement('p');
    paragraph.textContent = description;
    const link = document.createElement('a');
    link.className = 'account-button';
    link.href = href;
    link.textContent = label;
    card.append(heading, paragraph, link);
    return card;
  }
  async function loadCourses() {
    try {
      const { courses = [] } = await requestJson('/courses');
      const enrollments = await Promise.all(courses.map(async course => {
        const access = await requestJson(`/courses/${encodeURIComponent(course.id)}/access`);
        return access.hasAccess ? course : null;
      }));
      const mine = enrollments.filter(Boolean);
      byId('coursesStatus').textContent = mine.length ? `${mine.length} enrolled course${mine.length === 1 ? '' : 's'}. Classroom access is checked when you open a course.` : '';
      byId('emptyState').hidden = mine.length > 0;
      for (const course of mine) {
        const isHub = hubCourses.has(course.id);
        const href = isHub ? `/hub/classroom.html?course=${encodeURIComponent(course.id)}` : `/lesson.html?course=${encodeURIComponent(course.id)}`;
        byId('enrolledCourses').append(makeCard(course.title, isHub ? 'Open your private classroom to continue learning.' : 'Continue your enrolled course.', href, 'Open classroom'));
      }
    } catch (error) {
      byId('coursesStatus').textContent = `${error.message} Your enrollments have not been changed. Please refresh or contact DCT for help.`;
    }
  }
  async function loadCertificates() {
    try {
      const { certificates = [] } = await requestJson('/certificates');
      byId('certificatesStatus').textContent = certificates.length ? '' : 'Your earned certificates will appear here. Keep learning—you’re building toward something.';
      for (const certificate of certificates) {
        const date = new Date(certificate.issue_date);
        byId('certificatesList').append(makeCard(certificate.course_title || 'Course certificate', Number.isNaN(date.valueOf()) ? 'Course completed.' : `Issued ${date.toLocaleDateString()}`, `/certificate.html?code=${encodeURIComponent(certificate.certificate_code)}`, 'View certificate'));
      }
    } catch (error) { byId('certificatesStatus').textContent = error.message; }
  }
  async function loadDashboard() {
    if (!dopeAuth.isAuthenticated()) { window.location.replace('/login.html'); return; }
    const user = await dopeAuth.getCurrentUser();
    if (!user) { byId('dashboardStatus').textContent = dopeAuth.isAuthenticated() ? 'Your account server is temporarily unavailable. Refresh in a moment; your sign-in and saved photo are unchanged.' : 'Your session has expired. Please sign in again.'; if (!dopeAuth.isAuthenticated()) window.location.replace('/login.html'); return; }
    byId('welcomeName').textContent = String(user.name || 'learner').trim().split(/\s+/)[0];
    byId('profileTitle').textContent = user.name || 'Your account';
    byId('accountEmail').textContent = user.email || '';
    byId('accountRole').textContent = user.role === 'admin' ? 'Owner / administrator' : user.role === 'instructor' ? 'Instructor account' : 'Learner account';
    byId('adminLink').hidden = user.role !== 'admin';
    byId('dashboardStatus').textContent = 'Your account is ready.';
    showPhoto(user.profileImage, user.name);
    byId('profileImageStatus').textContent = user.profileImage ? 'Your saved photo is loaded.' : 'No saved photo yet. Choose one to personalize your account.';
    byId('logoutButton').addEventListener('click', () => dopeAuth.logout());
    byId('profileImageInput').addEventListener('change', async event => {
      const file = event.target.files?.[0];
      selectedPhoto = null;
      preparingPhoto = true;
      byId('profileImageSave').disabled = true;
      byId('profileImageStatus').textContent = file ? 'Preparing your photo…' : 'No photo selected.';
      try {
        if (file) {
          selectedPhoto = await buildRegisterProfileImage(file);
          showPhoto(selectedPhoto, user.name);
          byId('profileImageStatus').textContent = 'Preview ready. Choose Save photo to keep this image.';
        }
      } catch (error) { byId('profileImageStatus').textContent = error.message; }
      finally { preparingPhoto = false; byId('profileImageSave').disabled = !selectedPhoto; }
    });
    byId('profileImageSave').addEventListener('click', async () => {
      if (!selectedPhoto || preparingPhoto) return;
      byId('profileImageSave').disabled = true;
      byId('profileImageInput').disabled = true;
      byId('profileImageStatus').textContent = 'Saving your photo…';
      try {
        const updated = await dopeAuth.updateProfileImage(selectedPhoto);
        showPhoto(updated.profileImage, updated.name);
        selectedPhoto = null;
        byId('profileImageInput').value = '';
        byId('profileImageStatus').textContent = 'Photo saved to your account. It will be here when you return.';
      } catch (error) { byId('profileImageStatus').textContent = `${error.message} Your previous photo is unchanged.`; }
      finally { byId('profileImageSave').disabled = !selectedPhoto; byId('profileImageInput').disabled = false; }
    });
    await Promise.allSettled([loadCourses(),loadCertificates()]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadDashboard);
  else loadDashboard();
})();

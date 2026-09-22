/**
 * DCT instructor applications. Paste this file into the Apps Script project
 * opened from the DCT Instructor Applications Google Sheet.
 * Deploy as a Web app: Execute as me; Who has access: Anyone.
 */
const SHEET_ID = '1Ml-OxftxDj4m5eMh8uOm8VxnFPxfLyofrpdqz4FYYr8';
const TAB_NAME = 'Applications';
const MAX_RESUME_BYTES = 3 * 1024 * 1024;
const FOLDER_NAME = 'DCT Instructor Résumés';

function doPost(e) {
  let nonce = '';
  try {
    const data = JSON.parse(e.parameter.payload || '{}');
    nonce = String(data.nonce || '').slice(0, 100);
    if (data.company_website) return reply_(nonce, false, 'Application could not be submitted.');
    const required = ['full_name', 'email', 'phone', 'city_state', 'technology_specialties',
      'technology_experience_years', 'teaching_experience', 'delivery_preference',
      'availability', 'why_dct', 'explain_complex_concept', 'responsible_ethical_ai',
      'inclusive_learning_environment', 'accuracy_attestation'];
    for (const key of required) {
      if (!String(data[key] || '').trim()) throw new Error('Please complete all required fields.');
    }
    if (!/^\S+@\S+\.\S+$/.test(data.email) || !Array.isArray(data.audiences) || !data.audiences.length) {
      throw new Error('Please check your email address and learner audiences.');
    }
    const resume = data.resume || {};
    if (!/\.(pdf|doc|docx)$/i.test(resume.name || '') || !resume.base64 ||
        !['application/pdf', 'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(resume.type)) {
      throw new Error('Please upload a PDF, DOC, or DOCX résumé.');
    }
    const bytes = Utilities.base64Decode(resume.base64);
    if (bytes.length > MAX_RESUME_BYTES) throw new Error('Résumé must be 3 MB or smaller.');

    const lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) throw new Error('Please try again in a moment.');
    try {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_NAME);
      if (!sheet) throw new Error('Application tracker is unavailable.');
      const folder = getFolder_();
      const id = Utilities.getUuid();
      const safeName = String(resume.name).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100);
      const file = folder.createFile(Utilities.newBlob(bytes, resume.type, id + '_' + safeName));
      file.setDescription('DCT instructor application ' + id);
      try {
        sheet.appendRow([
          new Date(), id, 'New', clean_(data.full_name), clean_(data.email), clean_(data.phone),
          clean_(data.city_state), clean_(data.professional_url), clean_(data.technology_specialties),
          clean_(data.technology_experience_years), clean_(data.certifications),
          clean_(data.teaching_experience), clean_(data.audiences.join(', ')),
          clean_(data.delivery_preference), clean_(data.availability), clean_(data.why_dct),
          clean_(data.explain_complex_concept), clean_(data.responsible_ethical_ai),
          clean_(data.inclusive_learning_environment), file.getUrl(), safeName,
          clean_(data.accuracy_attestation), ''
        ]);
      } catch (err) {
        file.setTrashed(true); // Keep Drive and the tracker in sync on a failed write.
        throw err;
      }
      return reply_(nonce, true, 'Application received.');
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    console.error(err);
    return reply_(nonce, false, err.message || 'Submission failed. Please try again.');
  }
}

function getFolder_() {
  const props = PropertiesService.getScriptProperties();
  const existingId = props.getProperty('DCT_RESUME_FOLDER_ID');
  if (existingId) return DriveApp.getFolderById(existingId);
  const folder = DriveApp.createFolder(FOLDER_NAME);
  props.setProperty('DCT_RESUME_FOLDER_ID', folder.getId());
  return folder;
}

function clean_(value) {
  const text = String(value || '').slice(0, 10000).trim();
  // An applicant must never be able to inject a Sheet formula.
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function reply_(nonce, ok, message) {
  const payload = JSON.stringify({type: 'dct-instructor-result', nonce, ok, message})
    .replace(/</g, '\\u003c');
  return HtmlService.createHtmlOutput('<!doctype html><meta charset="utf-8"><script>' +
    'window.top.postMessage(' + payload + ', "https://thedopecloudteacher.org");' +
    '</script><p>' + (ok ? 'Application received.' : 'Submission failed. Return to the form and try again.') + '</p>')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

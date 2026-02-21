// training-assistant.js
// Professional AI-powered training assistant for The Dope Cloud Teacher
// Uses backend proxy endpoint to keep API keys secure.

const ASSISTANT_API_ENDPOINT = `${window.DCT_API_URL}/assistant/chat`;

// === UI SETUP ===
function createAssistantUI() {
  // Floating button
  const btn = document.createElement('button');
  btn.id = 'ai-assistant-btn';
  btn.innerHTML = '💬 Ask Training Assistant';
  btn.style.position = 'fixed';
  btn.style.bottom = '30px';
  btn.style.right = '30px';
  btn.style.zIndex = 9999;
  btn.style.background = '#9333ea';
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.borderRadius = '50px';
  btn.style.padding = '1rem 2rem';
  btn.style.fontSize = '1.1rem';
  btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
  btn.style.cursor = 'pointer';
  btn.onclick = showAssistantModal;
  document.body.appendChild(btn);

  // Modal
  const modal = document.createElement('div');
  modal.id = 'ai-assistant-modal';
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(31,17,71,0.85)';
  modal.style.zIndex = 10000;
  modal.innerHTML = `
    <div style="max-width: 420px; margin: 5vh auto; background: #fff; color: #1f1147; border-radius: 18px; box-shadow: 0 8px 32px rgba(147,51,234,0.15); padding: 2rem; position: relative;">
      <button id="ai-assistant-close" style="position: absolute; top: 18px; right: 18px; background: none; border: none; font-size: 1.5rem; color: #9333ea; cursor: pointer;">&times;</button>
      <h2 style="color: #9333ea; margin-bottom: 1rem;">Training Assistant</h2>
      <div id="ai-assistant-chat" style="height: 260px; overflow-y: auto; background: #f3f3fa; border-radius: 10px; padding: 1rem; margin-bottom: 1rem;"></div>
      <form id="ai-assistant-form" style="display: flex; gap: 0.5rem;">
        <input id="ai-assistant-input" type="text" placeholder="Ask me anything about cloud, courses, or careers..." style="flex:1; padding: 0.7rem; border-radius: 8px; border: 1px solid #9333ea; font-size: 1rem;" required />
        <button type="submit" style="background: #9333ea; color: #fff; border: none; border-radius: 8px; padding: 0.7rem 1.2rem; font-size: 1rem; cursor: pointer;">Send</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById('ai-assistant-close').onclick = hideAssistantModal;
  document.getElementById('ai-assistant-form').onsubmit = handleAssistantSubmit;
}

function showAssistantModal() {
  document.getElementById('ai-assistant-modal').style.display = 'block';
}
function hideAssistantModal() {
  document.getElementById('ai-assistant-modal').style.display = 'none';
}

// === CHAT LOGIC ===
let chatHistory = [
  { role: 'system', content: 'You are a professional, culturally aware cloud training assistant. Answer questions about cloud, courses, and careers. If you do not know, say so honestly.' }
];

function appendChat(role, content) {
  const chatDiv = document.getElementById('ai-assistant-chat');
  const msg = document.createElement('div');
  msg.style.margin = '0.5rem 0';
  msg.style.textAlign = role === 'user' ? 'right' : 'left';
  msg.innerHTML = `<span style="display:inline-block; background:${role==='user'?'#9333ea':'#e0e7ff'}; color:${role==='user'?'#fff':'#1f1147'}; padding:0.5rem 1rem; border-radius:12px; max-width:80%;">${content}</span>`;
  chatDiv.appendChild(msg);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

async function handleAssistantSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('ai-assistant-input');
  const question = input.value.trim();
  if (!question) return;
  appendChat('user', question);
  chatHistory.push({ role: 'user', content: question });
  input.value = '';
  appendChat('assistant', '<em>Thinking...</em>');
  const answer = await fetchAIAnswer(chatHistory);
  // Remove "Thinking..."
  const chatDiv = document.getElementById('ai-assistant-chat');
  chatDiv.removeChild(chatDiv.lastChild);
  appendChat('assistant', answer);
  chatHistory.push({ role: 'assistant', content: answer });
}

async function fetchAIAnswer(messages) {
  try {
    const response = await fetch(ASSISTANT_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: messages[messages.length - 1]?.content || '',
        history: messages.slice(-10)
      })
    });

    if (!response.ok) {
      throw new Error(`Assistant API error: ${response.status}`);
    }

    const data = await response.json();
    return data.answer || 'Sorry, I could not find an answer.';
  } catch (err) {
    console.error('Training assistant connection error:', err);
    return 'Sorry, there was a problem connecting to the AI service.';
  }
}

// === INIT ===
window.addEventListener('DOMContentLoaded', createAssistantUI);

// === EXTENSION: Inject course/FAQ context for smarter answers ===
// You can add more context from your course data or FAQs here for even better results.
// Example: chatHistory.push({ role: 'system', content: 'Course list: ...' });

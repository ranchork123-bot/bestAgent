// chrome-extension/content.js

// ---------------------------------------------------------
// Feature 4: Recording Mode - Intercept actions
// ---------------------------------------------------------
document.addEventListener('click', (e) => {
  const target = e.target;
  // Basic heuristic for description
  let description = `Clicked on ${target.tagName}`;
  if (target.textContent && target.textContent.trim().length < 50) {
      description += ` ("${target.textContent.trim()}")`;
  } else if (target.id) {
      description += ` with id ${target.id}`;
  } else if (target.className && typeof target.className === 'string') {
      description += ` with class ${target.className}`;
  }

  chrome.runtime.sendMessage({
    type: 'RECORD_ACTION',
    actionType: 'click',
    description: description
  }).catch(() => {}); // Ignore errors if not recording
}, true); // Use capture phase

document.addEventListener('change', (e) => {
  const target = e.target;
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
    chrome.runtime.sendMessage({
      type: 'RECORD_ACTION',
      actionType: 'type',
      description: `Typed into input field ${target.name || target.id || 'unknown'}`
    }).catch(() => {});
  }
});


// ---------------------------------------------------------
// Feature 6: Contextual Task Suggestions
// ---------------------------------------------------------
function showContextualSuggestions() {
  const url = window.location.href;
  let suggestions = [];

  if (url.includes('linkedin.com')) {
    suggestions = [
      "Extract all profiles on this page",
      "Connect with all these people",
      "Export emails to spreadsheet"
    ];
  } else if (url.includes('github.com')) {
    suggestions = [
      "Summarize this repository",
      "List all open issues"
    ];
  }

  if (suggestions.length > 0) {
    const sidebar = document.createElement('div');
    sidebar.id = 'hubtique-suggestions-sidebar';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '20px';
    sidebar.style.right = '20px';
    sidebar.style.backgroundColor = '#ffffff';
    sidebar.style.border = '1px solid #e5e7eb';
    sidebar.style.borderRadius = '8px';
    sidebar.style.padding = '16px';
    sidebar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    sidebar.style.zIndex = '999999';
    sidebar.style.fontFamily = 'system-ui, sans-serif';
    sidebar.style.width = '250px';

    const title = document.createElement('h3');
    title.textContent = 'Hubtique Suggestions';
    title.style.margin = '0 0 10px 0';
    title.style.fontSize = '14px';
    title.style.color = '#374151';
    sidebar.appendChild(title);

    suggestions.forEach(sug => {
      const btn = document.createElement('button');
      btn.textContent = sug;
      btn.style.display = 'block';
      btn.style.width = '100%';
      btn.style.marginBottom = '8px';
      btn.style.padding = '8px';
      btn.style.backgroundColor = '#eff6ff';
      btn.style.color = '#1d4ed8';
      btn.style.border = 'none';
      btn.style.borderRadius = '4px';
      btn.style.cursor = 'pointer';
      btn.style.fontSize = '12px';
      btn.style.textAlign = 'left';
      btn.onclick = () => {
        alert(`Starting task: ${sug}`);
        sidebar.remove();
      };
      sidebar.appendChild(btn);
    });

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.fontSize = '12px';
    closeBtn.style.color = '#6b7280';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.onclick = () => sidebar.remove();
    sidebar.appendChild(closeBtn);

    document.body.appendChild(sidebar);
  }
}

// ---------------------------------------------------------
// Feature 7: 2FA Handling (Detection)
// ---------------------------------------------------------
function checkFor2FAPrompt() {
  const inputs = Array.from(document.querySelectorAll('input'));
  // Basic heuristic for OTP/2FA inputs
  const otpInput = inputs.find(input => {
    const name = input.name.toLowerCase();
    const id = input.id.toLowerCase();
    return name.includes('otp') ||
           name.includes('code') ||
           id.includes('otp') ||
           (input.maxLength >= 4 && input.maxLength <= 8 && input.type === 'text' && document.body.innerText.toLowerCase().includes('verification code'));
  });

  if (otpInput) {
    console.log('Hubtique: 2FA/OTP input detected. Pausing agent and requesting human intervention.');
    // In a full implementation, this would send a message to background.js
    // which calls the Supabase webhook to send a Telegram message.

    // Mocking the pause/request
    chrome.runtime.sendMessage({
      type: 'REQUEST_HUMAN_2FA',
      domain: window.location.hostname
    }).catch(() => {});
  }
}

// Run checks on load
setTimeout(() => {
  showContextualSuggestions();
  checkFor2FAPrompt();
}, 2000);

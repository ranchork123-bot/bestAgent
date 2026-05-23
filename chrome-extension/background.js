// chrome-extension/background.js

let isRecording = false;
let recordedPlan = [];

// Feature 3: Cross-tab Content Synthesis
async function getAllOpenTabsText() {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  let combinedText = '';

  for (const tab of tabs) {
    if (tab.id && tab.url && !tab.url.startsWith('chrome://')) {
      try {
        const results = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => document.body.innerText,
        });

        if (results && results[0] && results[0].result) {
          combinedText += `\n--- Content from Tab: ${tab.title || tab.url} ---\n`;
          combinedText += results[0].result;
        }
      } catch (err) {
        console.warn(`Could not read text from tab ${tab.id}:`, err);
      }
    }
  }

  return combinedText;
}

// Feature 8: Background Async Task Execution (Keep Service Worker Alive)
chrome.alarms.create('keepAlive', { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'keepAlive') {
    console.log('Hubtique OS SW KeepAlive Tick. Polling for async tasks...');
    // In a full implementation, we would poll Supabase here for tasks that are running async
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Feature 4: Recording Mode
  if (request.type === 'START_RECORDING') {
    isRecording = true;
    recordedPlan = [];
    console.log('Started recording...');
    sendResponse({ status: 'recording_started' });
  }
  else if (request.type === 'STOP_RECORDING') {
    isRecording = false;
    console.log('Stopped recording. Plan:', recordedPlan);
    sendResponse({ status: 'recording_stopped', plan: recordedPlan });
  }
  else if (request.type === 'RECORD_ACTION' && isRecording) {
    const step = {
      id: crypto.randomUUID(),
      action: request.actionType, // 'click', 'type'
      description: request.description,
      timestamp: Date.now()
    };
    recordedPlan.push(step);
    console.log('Recorded step:', step);
    sendResponse({ status: 'action_recorded' });
  }

  // Feature 3 request
  else if (request.type === 'GET_ALL_TABS_TEXT') {
    getAllOpenTabsText().then(text => sendResponse({ text }));
    return true; // Keep message channel open for async response
  }
});

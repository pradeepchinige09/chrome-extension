var activeTab = null;
var activeStart = null;
var activeHostname = null;

var productiveSites = [
  'github.com', 'stackoverflow.com', 'leetcode.com',
  'codecademy.com', 'udemy.com', 'coursera.org',
  'docs.google.com', 'notion.so', 'figma.com',
  'codepen.io', 'replit.com', 'w3schools.com',
  'developer.mozilla.org', 'medium.com', 'hashnode.com'
];

var unproductiveSites = [
  'youtube.com', 'facebook.com', 'instagram.com',
  'twitter.com', 'x.com', 'tiktok.com',
  'reddit.com', 'netflix.com', 'twitch.tv',
  'snapchat.com', 'pinterest.com', 'tumblr.com'
];

function getHostname(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch (e) {
    return null;
  }
}

function getCategory(hostname) {
  if (!hostname) return 'neutral';
  for (var i = 0; i < productiveSites.length; i++) {
    if (hostname.includes(productiveSites[i])) return 'productive';
  }
  for (var j = 0; j < unproductiveSites.length; j++) {
    if (hostname.includes(unproductiveSites[j])) return 'unproductive';
  }
  return 'neutral';
}

function saveTime(hostname, seconds) {
  if (!hostname || seconds < 1) return;
  chrome.storage.local.get(['timeData'], function(result) {
    var data = result.timeData || {};
    var today = new Date().toDateString();
    if (!data[today]) data[today] = {};
    if (!data[today][hostname]) data[today][hostname] = 0;
    data[today][hostname] += seconds;
    chrome.storage.local.set({ timeData: data });
  });
}

function stopTracking() {
  if (activeHostname && activeStart) {
    var elapsed = Math.round((Date.now() - activeStart) / 1000);
    saveTime(activeHostname, elapsed);
  }
  activeHostname = null;
  activeStart = null;
}

function startTracking(url) {
  stopTracking();
  var hostname = getHostname(url);
  if (hostname && !hostname.includes('newtab') && !hostname.includes('extensions')) {
    activeHostname = hostname;
    activeStart = Date.now();
  }
}

chrome.tabs.onActivated.addListener(function(info) {
  chrome.tabs.get(info.tabId, function(tab) {
    if (tab && tab.url) startTracking(tab.url);
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active && tab.url) {
    startTracking(tab.url);
  }
});

chrome.windows.onFocusChanged.addListener(function(windowId) {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    stopTracking();
  } else {
    chrome.tabs.query({ active: true, windowId: windowId }, function(tabs) {
      if (tabs[0] && tabs[0].url) startTracking(tabs[0].url);
    });
  }
});

chrome.alarms.create('saveTimer', { periodInMinutes: 0.5 });
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'saveTimer') {
    if (activeHostname && activeStart) {
      var elapsed = Math.round((Date.now() - activeStart) / 1000);
      saveTime(activeHostname, elapsed);
      activeStart = Date.now();
    }
  }
});
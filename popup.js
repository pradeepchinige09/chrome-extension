var productiveSites = [
  'github.com','stackoverflow.com','leetcode.com',
  'codecademy.com','udemy.com','coursera.org',
  'docs.google.com','notion.so','figma.com',
  'codepen.io','replit.com','w3schools.com',
  'developer.mozilla.org','medium.com','hashnode.com'
];

var unproductiveSites = [
  'youtube.com','facebook.com','instagram.com',
  'twitter.com','x.com','tiktok.com',
  'reddit.com','netflix.com','twitch.tv',
  'snapchat.com','pinterest.com','tumblr.com'
];

function getCategory(hostname) {
  for (var i = 0; i < productiveSites.length; i++) {
    if (hostname.includes(productiveSites[i])) return 'productive';
  }
  for (var j = 0; j < unproductiveSites.length; j++) {
    if (hostname.includes(unproductiveSites[j])) return 'unproductive';
  }
  return 'neutral';
}

function formatTime(seconds) {
  if (seconds < 60) return seconds + 's';
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm';
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  return h + 'h ' + m + 'm';
}

function loadData() {
  chrome.storage.local.get(['timeData'], function(result) {
    var data = result.timeData || {};
    var today = new Date().toDateString();
    var todayData = data[today] || {};

    var productive = 0, unproductive = 0, neutral = 0;
    var sites = [];

    for (var host in todayData) {
      var secs = todayData[host];
      var cat = getCategory(host);
      if (cat === 'productive') productive += secs;
      else if (cat === 'unproductive') unproductive += secs;
      else neutral += secs;
      sites.push({ host: host, secs: secs, cat: cat });
    }

    document.getElementById('productiveTime').textContent = formatTime(productive);
    document.getElementById('unproductiveTime').textContent = formatTime(unproductive);
    document.getElementById('neutralTime').textContent = formatTime(neutral);

    var total = productive + unproductive;
    var score = total > 0 ? Math.round((productive / total) * 100) : 0;
    document.getElementById('scoreBar').style.width = score + '%';
    document.getElementById('scoreBar').style.background =
      score >= 70 ? '#1e8e3e' : score >= 40 ? '#f29900' : '#d93025';
    document.getElementById('scoreLabel').textContent =
      total > 0 ? 'Score: ' + score + '% — ' +
      (score >= 70 ? '🌟 Great job!' : score >= 40 ? '⚡ Keep going!' : '😴 Stay focused!') :
      'Start browsing to track time';

    sites.sort(function(a, b) { return b.secs - a.secs; });
    var top = sites.slice(0, 5);
    var container = document.getElementById('topSites');
    container.innerHTML = '';

    if (top.length === 0) {
      container.innerHTML = '<div class="no-data">No data yet today</div>';
      return;
    }

    top.forEach(function(s) {
      var color = s.cat === 'productive' ? '#1e8e3e' :
                  s.cat === 'unproductive' ? '#d93025' : '#4285f4';
      var row = document.createElement('div');
      row.className = 'site-row';
      row.innerHTML =
        '<div class="site-name">' +
        '<div class="site-dot" style="background:' + color + '"></div>' +
        '<span>' + s.host + '</span></div>' +
        '<span class="site-time">' + formatTime(s.secs) + '</span>';
      container.appendChild(row);
    });
  });
}

document.getElementById('openDashboard').addEventListener('click', function() {
  chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
});

document.getElementById('clearBtn').addEventListener('click', function() {
  if (confirm('Clear today\'s data?')) {
    chrome.storage.local.get(['timeData'], function(result) {
      var data = result.timeData || {};
      var today = new Date().toDateString();
      delete data[today];
      chrome.storage.local.set({ timeData: data }, function() {
        loadData();
      });
    });
  }
});

loadData();
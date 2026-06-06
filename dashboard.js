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

document.getElementById('todayDate').textContent = new Date().toDateString();

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

  var total = productive + unproductive + neutral;
  var score = (productive + unproductive) > 0 ?
    Math.round((productive / (productive + unproductive)) * 100) : 0;

  document.getElementById('totalTime').textContent = formatTime(total);
  document.getElementById('prodTime').textContent = formatTime(productive);
  document.getElementById('unprodTime').textContent = formatTime(unproductive);
  document.getElementById('prodScore').textContent = score + '%';

  // Pie Chart
  new Chart(document.getElementById('pieChart'), {
    type: 'doughnut',
    data: {
      labels: ['Productive', 'Unproductive', 'Neutral'],
      datasets: [{
        data: [productive, unproductive, neutral],
        backgroundColor: ['#1e8e3e', '#d93025', '#4285f4'],
        borderWidth: 0
      }]
    },
    options: {
      plugins: { legend: { position: 'bottom' } },
      cutout: '65%'
    }
  });

  // Weekly Bar Chart
  var days = [];
  var scores = [];
  for (var i = 6; i >= 0; i--) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    var key = d.toDateString();
    var dayData = data[key] || {};
    var p = 0, u = 0;
    for (var h in dayData) {
      var c = getCategory(h);
      if (c === 'productive') p += dayData[h];
      else if (c === 'unproductive') u += dayData[h];
    }
    var s = (p + u) > 0 ? Math.round((p / (p + u)) * 100) : 0;
    days.push(d.toLocaleDateString('en', { weekday: 'short' }));
    scores.push(s);
  }

  new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: days,
      datasets: [{
        label: 'Productivity %',
        data: scores,
        backgroundColor: scores.map(function(s) {
          return s >= 70 ? '#1e8e3e' : s >= 40 ? '#f29900' : '#d93025';
        }),
        borderRadius: 6
      }]
    },
    options: {
      scales: {
        y: { min: 0, max: 100, ticks: { callback: function(v) { return v + '%'; } } }
      },
      plugins: { legend: { display: false } }
    }
  });

  // Sites Table
  sites.sort(function(a, b) { return b.secs - a.secs; });
  var tbody = document.getElementById('sitesBody');
  if (sites.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#9aa0a6;padding:20px;">No data yet. Start browsing!</td></tr>';
  } else {
    sites.forEach(function(s) {
      var pct = total > 0 ? Math.round((s.secs / total) * 100) : 0;
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + s.host + '</td>' +
        '<td><span class="badge ' + s.cat + '">' + s.cat + '</span></td>' +
        '<td>' + formatTime(s.secs) + '</td>' +
        '<td>' + pct + '%</td>';
      tbody.appendChild(tr);
    });
  }

  // Weekly Report
  var reportDiv = document.getElementById('weeklyReport');
  var maxScore = Math.max.apply(null, scores.concat([1]));
  reportDiv.innerHTML = days.map(function(day, i) {
    var barWidth = Math.round((scores[i] / 100) * 100);
    var color = scores[i] >= 70 ? '#1e8e3e' : scores[i] >= 40 ? '#f29900' : '#d93025';
    return '<div class="week-row">' +
      '<div class="week-day">' + day + '</div>' +
      '<div class="week-bar-wrap"><div class="week-bar" style="width:' + barWidth + '%;background:' + color + '"></div></div>' +
      '<div class="week-score" style="color:' + color + '">' + scores[i] + '%</div>' +
      '</div>';
  }).join('');
});
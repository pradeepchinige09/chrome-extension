# ⏱️ Chrome Extension for Time Tracking and Productivity Analytics

A Chrome Extension that tracks the time spent on different websites and provides productivity analytics with a beautiful dashboard.

![Manifest Version](https://img.shields.io/badge/Manifest-V3-4285f4?style=flat&logo=googlechrome)
![JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-f7df1e?style=flat&logo=javascript)
![Chrome Extension](https://img.shields.io/badge/Platform-Chrome-4285f4?style=flat&logo=googlechrome)

---

## 🚀 Features

- ⏱️ Automatically tracks time spent on every website
- 🟢 Classifies websites as **Productive** (GitHub, LeetCode, Udemy etc.)
- 🔴 Classifies websites as **Unproductive** (YouTube, Instagram, Netflix etc.)
- 🔵 Neutral sites tracked separately
- 📊 Beautiful dashboard with Pie and Bar charts
- 📅 Weekly productivity report
- 💾 Data stored locally using Chrome Storage API
- 🗑️ Clear data option
- 🔢 Productivity Score calculated daily

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Extension | Chrome Manifest V3 |
| Frontend | HTML, CSS, JavaScript |
| Charts | Chart.js |
| Storage | Chrome Storage API |
| Background | Chrome Service Worker |

---

## 📁 Project Structure
chrome-extension/
├── manifest.json        # Extension configuration
├── background.js        # Service worker - tracks time in background
├── popup.html           # Extension popup UI
├── popup.css            # Popup styles
├── popup.js             # Popup logic and data display
├── dashboard.html       # Full analytics dashboard
├── dashboard.css        # Dashboard styles
├── dashboard.js         # Dashboard charts and weekly report
├── chart.js             # Chart.js library (local)
└── icon.png             # Extension icon

---

## ⚙️ Installation & Setup

### Step 1: Clone the repository
```bash
git clone https://github.com/pradeepchinige09/chrome-extension.git
cd chrome-extension
```

### Step 2: Open Chrome Extensions
- Open Chrome browser
- Go to `chrome://extensions`
- Turn on **Developer Mode** (top right toggle)

### Step 3: Load the Extension
- Click **Load unpacked**
- Select the `chrome-extension` folder
- Extension is now installed! ✅

### Step 4: Pin the Extension
- Click the puzzle 🧩 icon in Chrome toolbar
- Click the pin 📌 next to Time Tracker
- Extension icon appears in toolbar

---

## 🖥️ How to Use

1. Install the extension following steps above
2. Browse websites normally — it tracks automatically!
3. Click the **⏱️ icon** in toolbar to see today's summary
4. Click **📊** to open the full dashboard
5. Dashboard shows:
   - Total time today
   - Productive vs Unproductive time
   - Productivity score
   - Pie chart breakdown
   - Weekly bar chart
   - All sites table with time spent

---

## 🟢 Productive Sites

github.com, stackoverflow.com, leetcode.com,
codecademy.com, udemy.com, coursera.org,
docs.google.com, notion.so, figma.com,
codepen.io, replit.com, w3schools.com,
developer.mozilla.org, medium.com, hashnode.com

## 🔴 Unproductive Sites
youtube.com, facebook.com, instagram.com,
twitter.com, x.com, tiktok.com,
reddit.com, netflix.com, twitch.tv,
snapchat.com, pinterest.com, tumblr.com
---

## 📊 Productivity Score

| Score | Status |
|-------|--------|
| 70% - 100% | 🌟 Great job! |
| 40% - 69% | ⚡ Keep going! |
| 0% - 39% | 😴 Stay focused! |

---

## 📸 Screenshots

> Open `chrome://extensions` → Load unpacked → Select folder → Click extension icon

- Popup with today's summary and productivity score
- Full dashboard with charts and weekly report
- All sites table with time spent and category

---

## 🚧 Future Improvements

- [ ] Custom site classification by user
- [ ] Export report as PDF
- [ ] Daily/weekly email reports
- [ ] Focus mode to block unproductive sites
- [ ] Pomodoro timer integration
- [ ] Sync data across devices

---

## 👨‍💻 Author

**Pradeep Chinige**
- GitHub: [@pradeepchinige09](https://github.com/pradeepchinige09)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Chart.js](https://chartjs.org) — Beautiful charts
- [Chrome Extensions API](https://developer.chrome.com/docs/extensions) — Extension platform
- [Google Material Design](https://material.io) — Design inspiration

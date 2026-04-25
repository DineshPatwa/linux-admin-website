# LinuxMastery — Complete Linux Learning Platform

A comprehensive, interactive, and beautifully designed web application for learning Linux System Administration and DevOps skills.

## 🎯 What's Inside

This learning platform covers beginner to advanced topics, focusing on real-world scenarios and practical knowledge for RHEL-based systems.

### 📚 13 Comprehensive Topic Pages
- **Linux Basics:** Basic Commands, Vi/Vim & Nano, Runlevels, Ownership & Permissions, Find/Locate/Grep, Backup & Sync
- **Intermediate:** Process Management, Networking, Disk & Storage (LVM), Systemd & Services
- **Advanced:** Logs & Monitoring, Performance Tuning, Security & SSH, Shell Scripting, Kernel & Tuning

### 🛠️ Practical Application
- **Troubleshooting Scenarios:** Real-world problems like "Disk is Full", "Server Won't Boot", and "Server is Slow"
- **Interview Preparation:** L1 (Basic) to L3 (Advanced) and scenario-based interview questions
- **Practice Labs:** Guided exercises for users, permissions, LVM, and troubleshooting
- **Real-World Projects:** Setup Nginx, 3-Tier Architecture, Automated Backups, and User Automation scripts

## ✨ Features

- **Single Page Application (SPA):** Fast, seamless navigation without page reloads
- **Dark/Light Mode:** Full CSS custom properties theme toggle
- **Interactive Code Blocks:** Syntax-highlighted code with one-click "Copy" buttons
- **Progress Tracking:** LocalStorage-based progress tracking and completion checkboxes
- **Quick Search:** Client-side fuzzy search across all topics and commands
- **Responsive Design:** Mobile-friendly sidebar and layouts
- **Zero Dependencies:** Pure HTML, CSS, and Vanilla JavaScript. No build step required!

## 🚀 How to Run Locally

You don't need any complex setup to run this platform. Just serve the files using a local HTTP server.

### Option 1: Using Node.js (http-server)
If you have Node.js installed:
```bash
npx http-server . -p 8080 -c-1
```
Then open `http://localhost:8080` in your browser.

### Option 2: Using Python
If you have Python 3 installed:
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

### Option 3: Direct File Open
You can simply double-click the `index.html` file to open it in your browser. Note: Some features like localStorage or module loading might face CORS restrictions depending on your browser. A local server is recommended.

## 📁 Project Structure

\`\`\`text
Linux Administrator Website/
├── index.html                  # Main SPA shell
├── styles.css                  # Complete design system
├── app.js                      # Core routing, search, and UI logic
├── pages-home.js               # Home page and roadmap
├── pages-basic-*.js            # 6 detailed Linux basics modules
├── pages-intermediate.js       # Intermediate topics module
├── pages-advanced.js           # Advanced topics module
├── pages-practical.js          # Projects and Troubleshooting
├── pages-interview-labs.js     # Interview prep and Labs
└── README.md                   # This file
\`\`\`

/* ===== LinuxMastery — Core Application Logic ===== */
(function() {
  'use strict';

  // ===== PAGE REGISTRY =====
  // Content scripts register pages here via window.LM.registerPage()
  window.LM = window.LM || { pages: {}, searchIndex: [] };
  const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:3000/api' : '/api';

  window.LM.registerPage = function(id, html, searchTerms) {
    window.LM.pages[id] = html;
    if (searchTerms) {
      searchTerms.forEach(function(term) {
        window.LM.searchIndex.push({ page: id, title: term.title, section: term.section || '' });
      });
    }
  };

  // ===== DOM REFS =====
  const mainContent = document.getElementById('main-content');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const hamburger = document.getElementById('hamburger');
  const themeToggle = document.getElementById('theme-toggle');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const progressFill = document.getElementById('progress-fill');
  const progressPct = document.getElementById('progress-pct');

  // Auth DOM Refs
  const loginToggleBtn = document.getElementById('login-toggle-btn');
  const userGreeting = document.getElementById('user-greeting');
  const usernameDisplay = document.getElementById('username-display');
  const logoutBtn = document.getElementById('logout-btn');
  const authModal = document.getElementById('auth-modal');
  const closeModal = document.getElementById('close-modal');
  const authMessage = document.getElementById('auth-message');

  // ===== THEME =====
  const savedTheme = localStorage.getItem('lm-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

  themeToggle.addEventListener('click', function() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('lm-theme', next);
    themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
  });

  // ===== MOBILE SIDEBAR =====
  hamburger.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });
  overlay.addEventListener('click', function() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });

  // ===== NAV GROUP TOGGLES =====
  document.querySelectorAll('.nav-group-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const groupId = 'group-' + btn.dataset.group;
      const content = document.getElementById(groupId);
      btn.classList.toggle('open');
      content.classList.toggle('open');
    });
  });

  // ===== NAVIGATION =====
  let currentPage = 'home';

  function navigateTo(pageId) {
    if (!window.LM.pages[pageId]) {
      console.warn('Page not found:', pageId);
      return;
    }
    currentPage = pageId;
    mainContent.innerHTML = window.LM.pages[pageId];
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update active nav
    document.querySelectorAll('.nav-item').forEach(function(item) {
      item.classList.toggle('active', item.dataset.page === pageId);
    });

    // Ensure all parent groups are open
    const activeItem = document.querySelector('.nav-item[data-page="' + pageId + '"]');
    if (activeItem) {
      let parentGroup = activeItem.closest('.nav-group-content');
      while (parentGroup) {
        if (!parentGroup.classList.contains('open')) {
          parentGroup.classList.add('open');
          const toggleBtn = document.querySelector('[data-group="' + parentGroup.id.replace('group-', '') + '"]');
          if (toggleBtn) toggleBtn.classList.add('open');
        }
        parentGroup = parentGroup.parentElement ? parentGroup.parentElement.closest('.nav-group-content') : null;
      }
    }

    // Close mobile sidebar
    sidebar.classList.remove('open');
    overlay.classList.remove('active');

    // Init interactive elements on the new page
    initCopyButtons();
    initAccordions();
    initScenarios();
    initTabs();
    initMarkComplete(pageId);
    updateProgress();

    // Update URL hash
    history.pushState(null, '', '#' + pageId);
  }

  // Nav item clicks
  document.querySelectorAll('.nav-item[data-page]').forEach(function(item) {
    item.addEventListener('click', function() {
      navigateTo(item.dataset.page);
    });
  });

  // Handle back/forward
  window.addEventListener('popstate', function() {
    const hash = location.hash.replace('#', '') || 'home';
    navigateTo(hash);
  });

  // ===== COPY BUTTONS =====
  function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const codeBlock = btn.closest('.code-block');
        const code = codeBlock.querySelector('pre').textContent;
        navigator.clipboard.writeText(code).then(function() {
          btn.textContent = '✓ Copied!';
          btn.classList.add('copied');
          setTimeout(function() {
            btn.textContent = '📋 Copy';
            btn.classList.remove('copied');
          }, 2000);
        });
      });
    });
  }

  // ===== ACCORDIONS (Interview Q&A) =====
  function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(function(header) {
      header.addEventListener('click', function() {
        header.classList.toggle('open');
        const body = header.nextElementSibling;
        body.classList.toggle('open');
      });
    });
  }

  // ===== SCENARIO CARDS =====
  function initScenarios() {
    document.querySelectorAll('.scenario-header').forEach(function(header) {
      header.addEventListener('click', function() {
        header.classList.toggle('open');
        const body = header.nextElementSibling;
        body.classList.toggle('open');
      });
    });
  }

  // ===== TABS =====
  function initTabs() {
    document.querySelectorAll('.tabs').forEach(function(tabGroup) {
      const tabBtns = tabGroup.querySelectorAll('.tab-btn');
      const parent = tabGroup.parentElement;
      tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          const target = btn.dataset.tab;
          tabBtns.forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          parent.querySelectorAll('.tab-content').forEach(function(tc) {
            tc.classList.toggle('active', tc.id === target);
          });
        });
      });
    });
  }

  // ===== AUTHENTICATION =====
  let currentUser = localStorage.getItem('lm-username');
  let authToken = localStorage.getItem('lm-token');

  function updateAuthUI() {
    if (authToken) {
      if(loginToggleBtn) loginToggleBtn.style.display = 'none';
      if(userGreeting) userGreeting.style.display = 'flex';
      if(usernameDisplay) usernameDisplay.textContent = currentUser;
    } else {
      if(loginToggleBtn) loginToggleBtn.style.display = 'block';
      if(userGreeting) userGreeting.style.display = 'none';
      // Clear progress UI if logged out
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('completed'));
      if(progressFill) progressFill.style.width = '0%';
      if(progressPct) progressPct.textContent = '0%';
      const btn = document.querySelector('.mark-complete-btn');
      if(btn) { btn.classList.remove('completed'); btn.innerHTML = '☐ Mark as Complete'; }
    }
  }
  updateAuthUI();

  if(loginToggleBtn) loginToggleBtn.addEventListener('click', () => { authModal.classList.add('active'); });
  if(closeModal) closeModal.addEventListener('click', () => { authModal.classList.remove('active'); authMessage.textContent = ''; });
  
  if(logoutBtn) logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('lm-token');
    localStorage.removeItem('lm-username');
    authToken = null;
    currentUser = null;
    completedPagesCache = [];
    updateAuthUI();
  });

  // Auth Tabs
  document.querySelectorAll('.auth-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.auth-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('#auth-modal .tab-content').forEach(tc => tc.classList.remove('active'));
      document.getElementById(btn.dataset.tab).classList.add('active');
      if(authMessage) authMessage.textContent = '';
    });
  });

  // Login Form
  const loginForm = document.getElementById('login-form');
  if(loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const u = document.getElementById('login-user').value;
      const p = document.getElementById('login-pass').value;
      try {
        const res = await fetch(API_URL + '/auth/login', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: u, password: p })
        });
        const data = await res.json();
        if(res.ok) {
          authToken = data.token; currentUser = data.username;
          localStorage.setItem('lm-token', authToken);
          localStorage.setItem('lm-username', currentUser);
          authModal.classList.remove('active');
          updateAuthUI();
          fetchAndSetProgress();
        } else {
          authMessage.className = 'auth-message error'; authMessage.textContent = data.error || 'Login failed';
        }
      } catch(err) { authMessage.className = 'auth-message error'; authMessage.textContent = 'Server connection failed.'; }
    });
  }

  // Register Form
  const regForm = document.getElementById('register-form');
  if(regForm) {
    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const u = document.getElementById('reg-user').value;
      const p = document.getElementById('reg-pass').value;
      try {
        const res = await fetch(API_URL + '/auth/register', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: u, password: p })
        });
        const data = await res.json();
        if(res.ok) {
          authMessage.className = 'auth-message success'; authMessage.textContent = 'Account created! Please login.';
          document.querySelector('[data-tab="login-tab"]').click();
        } else {
          authMessage.className = 'auth-message error'; authMessage.textContent = data.error || 'Registration failed';
        }
      } catch(err) { authMessage.className = 'auth-message error'; authMessage.textContent = 'Server connection failed.'; }
    });
  }

  // ===== PROGRESS TRACKING (API CONNECTED) =====
  let completedPagesCache = [];

  async function fetchAndSetProgress() {
    if(!authToken) return;
    try {
      const res = await fetch(API_URL + '/progress', {
        headers: { 'Authorization': 'Bearer ' + authToken }
      });
      if(res.ok) {
        completedPagesCache = await res.json();
        updateProgressUI();
        initMarkComplete(currentPage); // update button on current page
      }
    } catch(e) { console.error('Failed to fetch progress'); }
  }

  async function setCompleted(pageId, isComplete) {
    if(!authToken) {
      alert('Please login to save your progress!');
      // revert button state
      const btn = document.querySelector('.mark-complete-btn');
      if(btn) { 
        btn.classList.toggle('completed', !isComplete); 
        btn.innerHTML = !isComplete ? '✅ Completed!' : '☐ Mark as Complete'; 
      }
      return;
    }
    
    // Optimistic UI update
    if (isComplete && !completedPagesCache.includes(pageId)) completedPagesCache.push(pageId);
    else if (!isComplete) completedPagesCache = completedPagesCache.filter(p => p !== pageId);
    updateProgressUI();

    try {
      await fetch(API_URL + '/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
        body: JSON.stringify({ pageId, isComplete })
      });
    } catch(e) { console.error('Failed to save progress'); }
  }

  function updateProgressUI() {
    const totalPages = document.querySelectorAll('.nav-item[data-page]').length - 1; // exclude home
    const pct = totalPages > 0 ? Math.round((completedPagesCache.length / totalPages) * 100) : 0;
    if(progressFill) progressFill.style.width = pct + '%';
    if(progressPct) progressPct.textContent = pct + '%';

    document.querySelectorAll('.nav-item[data-page]').forEach(function(item) {
      item.classList.toggle('completed', completedPagesCache.includes(item.dataset.page));
    });
  }

  function initMarkComplete(pageId) {
    const btn = document.querySelector('.mark-complete-btn');
    if (!btn) return;
    
    if (completedPagesCache.includes(pageId)) {
      btn.classList.add('completed');
      btn.innerHTML = '✅ Completed!';
    } else {
      btn.classList.remove('completed');
      btn.innerHTML = '☐ Mark as Complete';
    }
    
    // Remove old listeners to avoid duplicates
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', function() {
      const isNowComplete = !newBtn.classList.contains('completed');
      newBtn.classList.toggle('completed', isNowComplete);
      newBtn.innerHTML = isNowComplete ? '✅ Completed!' : '☐ Mark as Complete';
      setCompleted(pageId, isNowComplete);
    });
  }

  // Call this once on load
  if(authToken) fetchAndSetProgress();

  // ===== SEARCH =====
  searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length < 2) {
      searchResults.classList.remove('active');
      searchResults.innerHTML = '';
      return;
    }
    const matches = window.LM.searchIndex.filter(function(item) {
      return item.title.toLowerCase().includes(query) ||
             item.section.toLowerCase().includes(query);
    }).slice(0, 10);

    if (matches.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item"><div class="sr-title">No results found</div></div>';
    } else {
      searchResults.innerHTML = matches.map(function(m) {
        return '<div class="search-result-item" data-page="' + m.page + '">' +
               '<div class="sr-title">' + m.title + '</div>' +
               '<div class="sr-section">' + m.section + '</div></div>';
      }).join('');
    }
    searchResults.classList.add('active');

    // Click on search result
    searchResults.querySelectorAll('.search-result-item[data-page]').forEach(function(item) {
      item.addEventListener('click', function() {
        navigateTo(item.dataset.page);
        searchInput.value = '';
        searchResults.classList.remove('active');
      });
    });
  });

  // Close search on outside click
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-box')) {
      searchResults.classList.remove('active');
    }
  });

  // ===== ROADMAP CARD CLICKS =====
  mainContent.addEventListener('click', function(e) {
    const card = e.target.closest('.roadmap-card[data-page]');
    if (card) navigateTo(card.dataset.page);
  });

  // ===== INITIAL LOAD =====
  const initialPage = location.hash.replace('#', '') || 'home';
  // Small delay to ensure all content scripts have registered
  setTimeout(function() {
    navigateTo(initialPage);
  }, 50);

})();

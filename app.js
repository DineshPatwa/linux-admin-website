/* ===== LinuxMastery — Core Application Logic ===== */
(function() {
  'use strict';

  // ===== PAGE REGISTRY =====
  // Content scripts register pages here via window.LM.registerPage()
  window.LM = window.LM || { pages: {}, searchIndex: [] };

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

    // Ensure parent group is open
    const activeItem = document.querySelector('.nav-item[data-page="' + pageId + '"]');
    if (activeItem) {
      const parentGroup = activeItem.closest('.nav-group-content');
      if (parentGroup && !parentGroup.classList.contains('open')) {
        parentGroup.classList.add('open');
        const toggleBtn = document.querySelector('[data-group="' + parentGroup.id.replace('group-', '') + '"]');
        if (toggleBtn) toggleBtn.classList.add('open');
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

  // ===== PROGRESS TRACKING =====
  function getCompletedPages() {
    const data = localStorage.getItem('lm-completed');
    return data ? JSON.parse(data) : [];
  }

  function setCompleted(pageId, isComplete) {
    let completed = getCompletedPages();
    if (isComplete && !completed.includes(pageId)) {
      completed.push(pageId);
    } else if (!isComplete) {
      completed = completed.filter(function(p) { return p !== pageId; });
    }
    localStorage.setItem('lm-completed', JSON.stringify(completed));
    updateProgress();
  }

  function updateProgress() {
    const completed = getCompletedPages();
    const totalPages = document.querySelectorAll('.nav-item[data-page]').length - 1; // exclude home
    const pct = totalPages > 0 ? Math.round((completed.length / totalPages) * 100) : 0;
    progressFill.style.width = pct + '%';
    progressPct.textContent = pct + '%';

    // Update nav check marks
    document.querySelectorAll('.nav-item[data-page]').forEach(function(item) {
      item.classList.toggle('completed', completed.includes(item.dataset.page));
    });
  }

  function initMarkComplete(pageId) {
    const btn = document.querySelector('.mark-complete-btn');
    if (!btn) return;
    const completed = getCompletedPages();
    if (completed.includes(pageId)) {
      btn.classList.add('completed');
      btn.innerHTML = '✅ Completed!';
    }
    btn.addEventListener('click', function() {
      const isNowComplete = !btn.classList.contains('completed');
      btn.classList.toggle('completed', isNowComplete);
      btn.innerHTML = isNowComplete ? '✅ Completed!' : '☐ Mark as Complete';
      setCompleted(pageId, isNowComplete);
    });
  }

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

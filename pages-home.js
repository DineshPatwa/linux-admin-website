/* ===== HOME PAGE ===== */
window.LM = window.LM || { pages: {}, searchIndex: [] };

window.LM.registerPage('home', `
<div class="hero">
  <h1><span class="hero-gradient">LinuxMastery</span></h1>
  <p>Your complete journey from Linux beginner to production-ready System Administrator & DevOps Engineer. Real-world examples, hands-on labs, interview prep.</p>
  <div class="hero-stats">
    <div class="hero-stat"><div class="stat-num">13+</div><div class="stat-label">Topics</div></div>
    <div class="hero-stat"><div class="stat-num">50+</div><div class="stat-label">Commands</div></div>
    <div class="hero-stat"><div class="stat-num">5</div><div class="stat-label">Projects</div></div>
    <div class="hero-stat"><div class="stat-num">30+</div><div class="stat-label">Labs</div></div>
  </div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🗺️</span> Learning Roadmap</h2>
  <p style="color:var(--text-secondary);margin-bottom:1.25rem;">Follow this path from beginner to expert. Click any card to start learning.</p>

  <div class="roadmap-grid">
    <div class="roadmap-card" data-page="basic-commands">
      <span class="card-badge badge-beginner">Beginner</span>
      <div class="card-icon">⌨️</div>
      <div class="card-title">Basic Commands & Structure</div>
      <div class="card-desc">Navigate the filesystem, manage files, system monitoring, networking, package management, RHEL comparison</div>
    </div>
    <div class="roadmap-card" data-page="editors">
      <span class="card-badge badge-beginner">Beginner</span>
      <div class="card-icon">📝</div>
      <div class="card-title">Vi/Vim & Nano Editors</div>
      <div class="card-desc">Master text editors — insert/visual modes, navigation, multiple tabs, backup & recovery</div>
    </div>
    <div class="roadmap-card" data-page="runlevels">
      <span class="card-badge badge-beginner">Beginner</span>
      <div class="card-icon">🔄</div>
      <div class="card-title">Runlevels</div>
      <div class="card-desc">SysVinit vs Systemd, boot targets, changing runlevels, system reboot procedures</div>
    </div>
    <div class="roadmap-card" data-page="permissions">
      <span class="card-badge badge-beginner">Beginner</span>
      <div class="card-icon">🔐</div>
      <div class="card-title">Ownership & Permissions</div>
      <div class="card-desc">Users, groups, chmod, chown, ACLs, SUID/SGID, sticky bit, least privilege</div>
    </div>
    <div class="roadmap-card" data-page="find-grep">
      <span class="card-badge badge-beginner">Beginner</span>
      <div class="card-icon">🔍</div>
      <div class="card-title">Find / Locate / Grep</div>
      <div class="card-desc">Search files by name/type/size, fast locate, grep patterns, searching logs</div>
    </div>
    <div class="roadmap-card" data-page="backup">
      <span class="card-badge badge-beginner">Beginner</span>
      <div class="card-icon">💾</div>
      <div class="card-title">Backup: Cp, Mv, Rsync</div>
      <div class="card-desc">Copy, move, sync files locally and remotely. Backup strategies for production</div>
    </div>
    <div class="roadmap-card" data-page="process">
      <span class="card-badge badge-intermediate">Intermediate</span>
      <div class="card-icon">⚙️</div>
      <div class="card-title">Process Management</div>
      <div class="card-desc">ps, top, kill, nice, background jobs, zombie processes</div>
    </div>
    <div class="roadmap-card" data-page="networking">
      <span class="card-badge badge-intermediate">Intermediate</span>
      <div class="card-icon">🌐</div>
      <div class="card-title">Networking</div>
      <div class="card-desc">IP config, DNS, firewall, routing, troubleshooting connectivity</div>
    </div>
    <div class="roadmap-card" data-page="storage">
      <span class="card-badge badge-intermediate">Intermediate</span>
      <div class="card-icon">💿</div>
      <div class="card-title">Disk & Storage (LVM)</div>
      <div class="card-desc">Partitions, LVM, mounting, fstab, extending volumes</div>
    </div>
    <div class="roadmap-card" data-page="systemd">
      <span class="card-badge badge-intermediate">Intermediate</span>
      <div class="card-icon">🔧</div>
      <div class="card-title">Systemd & Services</div>
      <div class="card-desc">Unit files, service management, timers, boot targets</div>
    </div>
    <div class="roadmap-card" data-page="security">
      <span class="card-badge badge-advanced">Advanced</span>
      <div class="card-icon">🛡️</div>
      <div class="card-title">Security & SSH</div>
      <div class="card-desc">SSH hardening, firewalld, SELinux, key-based auth</div>
    </div>
    <div class="roadmap-card" data-page="projects">
      <span class="card-badge badge-advanced">Project</span>
      <div class="card-icon">🏗️</div>
      <div class="card-title">Real-World Projects</div>
      <div class="card-desc">Web server setup, 3-tier architecture, backup systems, monitoring</div>
    </div>
  </div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">💡</span> How to Use This Site</h2>
  <ul style="color:var(--text-secondary);">
    <li><strong>Follow the roadmap</strong> — topics are ordered from beginner to advanced</li>
    <li><strong>Read the analogy first</strong> — each topic starts with a simple real-world comparison</li>
    <li><strong>Practice every command</strong> — use the hands-on labs on a real Linux VM</li>
    <li><strong>Mark topics complete</strong> — track your progress with the button at the bottom of each page</li>
    <li><strong>Use search</strong> — quickly find any command or topic using the search bar above</li>
  </ul>
</div>
`, [
  { title: 'Home', section: 'Overview' },
  { title: 'Learning Roadmap', section: 'Overview' },
  { title: 'Getting Started with Linux', section: 'Overview' }
]);

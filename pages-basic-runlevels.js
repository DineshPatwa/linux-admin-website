window.LM = window.LM || { pages: {}, searchIndex: [] };
window.LM.registerPage('runlevels', `
<h1 class="page-title">Runlevels & Boot Targets</h1>
<p class="page-subtitle">Understand how Linux boots and how to control system states</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔄</span> What are Runlevels?</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    Think of runlevels like <strong>modes on an AC</strong>. Mode 0 = Off. Mode 3 = Cooling only (command-line / server mode). Mode 5 = Full comfort with display (GUI mode). Mode 6 = Restart. You switch modes depending on what you need.
  </div>
  <p>A <strong>runlevel</strong> defines what services and processes start when Linux boots. Older systems (RHEL 6) used <strong>SysVinit</strong> with numbered runlevels. Modern systems (RHEL 7+) use <strong>Systemd</strong> with named targets.</p>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔀</span> SysVinit vs Systemd Comparison</h2>
  <table class="styled-table">
    <thead><tr><th>Runlevel</th><th>SysVinit (RHEL 6)</th><th>Systemd Target (RHEL 7+)</th><th>Purpose</th></tr></thead>
    <tbody>
      <tr><td><strong>0</strong></td><td>runlevel 0</td><td>poweroff.target</td><td>Shut down the system</td></tr>
      <tr><td><strong>1</strong></td><td>runlevel 1</td><td>rescue.target</td><td>Single-user / rescue mode (password reset)</td></tr>
      <tr><td><strong>2</strong></td><td>runlevel 2</td><td>multi-user.target</td><td>Multi-user, no networking (rarely used)</td></tr>
      <tr><td><strong>3</strong></td><td>runlevel 3</td><td>multi-user.target</td><td>Multi-user with networking (servers use this)</td></tr>
      <tr><td><strong>4</strong></td><td>runlevel 4</td><td>—</td><td>Unused / custom</td></tr>
      <tr><td><strong>5</strong></td><td>runlevel 5</td><td>graphical.target</td><td>GUI mode (desktop with networking)</td></tr>
      <tr><td><strong>6</strong></td><td>runlevel 6</td><td>reboot.target</td><td>Reboot the system</td></tr>
    </tbody>
  </table>
  <div class="info-box note"><span class="info-icon">📌</span><div><strong>Key Point:</strong> Production servers always run in <strong>runlevel 3</strong> (multi-user.target) — no GUI needed. GUI wastes resources on servers.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">⚙️</span> Checking & Changing Runlevels</h2>
  <div class="tabs">
    <button class="tab-btn active" data-tab="tab-systemd">Systemd (RHEL 7/8/9)</button>
    <button class="tab-btn" data-tab="tab-sysvinit">SysVinit (RHEL 6)</button>
  </div>
  <div class="tab-content active" id="tab-systemd">
    <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Check current target (runlevel)</span>
<span class="cmd">systemctl</span> <span class="flag">get-default</span>
<span class="output">multi-user.target</span>

<span class="comment"># Change default boot target</span>
<span class="cmd">systemctl</span> <span class="flag">set-default</span> <span class="path">multi-user.target</span>   <span class="comment"># Boot to CLI</span>
<span class="cmd">systemctl</span> <span class="flag">set-default</span> <span class="path">graphical.target</span>    <span class="comment"># Boot to GUI</span>

<span class="comment"># Switch target RIGHT NOW (without reboot)</span>
<span class="cmd">systemctl</span> <span class="flag">isolate</span> <span class="path">multi-user.target</span>      <span class="comment"># Switch to CLI now</span>
<span class="cmd">systemctl</span> <span class="flag">isolate</span> <span class="path">graphical.target</span>       <span class="comment"># Switch to GUI now</span>
<span class="cmd">systemctl</span> <span class="flag">isolate</span> <span class="path">rescue.target</span>          <span class="comment"># Enter rescue mode</span>

<span class="comment"># Reboot and shutdown</span>
<span class="cmd">systemctl</span> <span class="flag">reboot</span>                          <span class="comment"># Reboot system</span>
<span class="cmd">systemctl</span> <span class="flag">poweroff</span>                        <span class="comment"># Shutdown system</span>

<span class="comment"># Check current runlevel</span>
<span class="cmd">runlevel</span>
<span class="output">N 3</span>    <span class="comment"># N = no previous runlevel, 3 = current</span>

<span class="comment"># Who is logged in + runlevel</span>
<span class="cmd">who</span> <span class="flag">-r</span></pre></div>
  </div>
  <div class="tab-content" id="tab-sysvinit">
    <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Check current runlevel</span>
<span class="cmd">runlevel</span>
<span class="output">N 3</span>

<span class="comment"># Change runlevel immediately</span>
<span class="cmd">init</span> <span class="num">3</span>     <span class="comment"># Switch to multi-user CLI</span>
<span class="cmd">init</span> <span class="num">5</span>     <span class="comment"># Switch to GUI</span>
<span class="cmd">init</span> <span class="num">1</span>     <span class="comment"># Single-user / rescue mode</span>
<span class="cmd">init</span> <span class="num">6</span>     <span class="comment"># Reboot</span>
<span class="cmd">init</span> <span class="num">0</span>     <span class="comment"># Shutdown</span>

<span class="comment"># Set default runlevel (edit /etc/inittab)</span>
<span class="cmd">cat</span> <span class="path">/etc/inittab</span>
<span class="output">id:3:initdefault:</span>   <span class="comment"># Change 3 to 5 for GUI boot</span>

<span class="comment"># Reboot commands</span>
<span class="cmd">reboot</span>
<span class="cmd">shutdown</span> <span class="flag">-r</span> <span class="path">now</span>           <span class="comment"># Reboot now</span>
<span class="cmd">shutdown</span> <span class="flag">-r</span> <span class="path">+5</span>            <span class="comment"># Reboot in 5 minutes</span>
<span class="cmd">shutdown</span> <span class="flag">-h</span> <span class="path">now</span>           <span class="comment"># Halt/shutdown now</span>
<span class="cmd">shutdown</span> <span class="flag">-c</span>                <span class="comment"># Cancel scheduled shutdown</span></pre></div>
  </div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔧</span> Boot Process Overview</h2>
  <p>Understanding how Linux boots helps you troubleshoot boot failures:</p>
  <div class="code-block"><div class="code-header"><span class="lang">boot sequence</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment">Step 1: BIOS/UEFI → Hardware check (POST)</span>
<span class="comment">Step 2: Boot Loader → GRUB2 loads kernel</span>
<span class="comment">Step 3: Kernel → Loads drivers, mounts root filesystem</span>
<span class="comment">Step 4: Init/Systemd → PID 1, starts services based on target/runlevel</span>
<span class="comment">Step 5: Login Prompt → getty (CLI) or Display Manager (GUI)</span>

<span class="comment"># Useful commands for boot troubleshooting:</span>
<span class="cmd">dmesg</span>                   <span class="comment"># Kernel boot messages</span>
<span class="cmd">journalctl</span> <span class="flag">-b</span>           <span class="comment"># All logs from current boot</span>
<span class="cmd">journalctl</span> <span class="flag">-b -1</span>        <span class="comment"># Logs from previous boot</span>
<span class="cmd">systemd-analyze</span>          <span class="comment"># How long did boot take?</span>
<span class="cmd">systemd-analyze blame</span>   <span class="comment"># Which services took longest?</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔥</span> Real-World Scenario: Server Stuck in Wrong Runlevel</h2>
  <p><strong>Problem:</strong> Server boots into GUI (graphical.target) but it's a production server — GUI is wasting RAM.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash — fix</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Step 1: Check current default</span>
<span class="cmd">systemctl</span> <span class="flag">get-default</span>
<span class="output">graphical.target</span>

<span class="comment"># Step 2: Switch to CLI right now</span>
<span class="cmd">systemctl</span> <span class="flag">isolate</span> <span class="path">multi-user.target</span>

<span class="comment"># Step 3: Set CLI as permanent default</span>
<span class="cmd">systemctl</span> <span class="flag">set-default</span> <span class="path">multi-user.target</span>

<span class="comment"># Step 4: Verify</span>
<span class="cmd">systemctl</span> <span class="flag">get-default</span>
<span class="output">multi-user.target</span>   <span class="comment"># ✅ Now server boots to CLI</span></pre></div>
  <div class="info-box warning"><span class="info-icon">⚠️</span><div><strong>Common Mistake:</strong> Using <code class="code-inline">init 0</code> when you meant <code class="code-inline">init 6</code> — one shuts down, the other reboots! On a remote server, shutdown means you need physical/IPMI access to power it back on.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧪</span> Hands-on Lab</h2>
  <ol class="lab-steps">
    <li>Check your current runlevel: <code class="code-inline">runlevel</code> and <code class="code-inline">systemctl get-default</code></li>
    <li>Check boot time: <code class="code-inline">systemd-analyze</code></li>
    <li>Find slowest services: <code class="code-inline">systemd-analyze blame | head -10</code></li>
    <li>List all available targets: <code class="code-inline">systemctl list-units --type=target</code></li>
    <li>View boot logs: <code class="code-inline">journalctl -b | head -50</code></li>
    <li>(VM only) Switch to rescue: <code class="code-inline">systemctl isolate rescue.target</code></li>
    <li>Switch back: <code class="code-inline">systemctl isolate multi-user.target</code></li>
  </ol>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🎯</span> Interview Questions</h2>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is the difference between runlevel 3 and runlevel 5?<span class="arrow-acc">▼</span></button><div class="accordion-body">Runlevel 3 = multi-user mode with networking but NO GUI. Runlevel 5 = multi-user with networking AND GUI. Production servers use runlevel 3 to save resources.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How to change the default runlevel in RHEL 7+?<span class="arrow-acc">▼</span></button><div class="accordion-body">Use <code class="code-inline">systemctl set-default multi-user.target</code> (for CLI) or <code class="code-inline">systemctl set-default graphical.target</code> (for GUI). In RHEL 6, you edited <code class="code-inline">/etc/inittab</code>.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is PID 1 in Linux?<span class="arrow-acc">▼</span></button><div class="accordion-body">PID 1 is the first process started by the kernel. In RHEL 6 it's <code class="code-inline">init</code>, in RHEL 7+ it's <code class="code-inline">systemd</code>. It's the parent of all processes. If PID 1 dies, the system panics.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How do you troubleshoot a server that won't boot?<span class="arrow-acc">▼</span></button><div class="accordion-body">1) Check BIOS/boot order. 2) Check GRUB — edit boot entry, add <code class="code-inline">rd.break</code> for emergency shell. 3) Boot into rescue mode from ISO. 4) Check <code class="code-inline">journalctl -b -1</code> for previous boot logs. 5) Check <code class="code-inline">/etc/fstab</code> for bad mounts.</div></div>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  {title:'Runlevels', section:'Linux Basics'},
  {title:'SysVinit vs Systemd', section:'Linux Basics'},
  {title:'Boot Targets', section:'Linux Basics'},
  {title:'init command runlevels', section:'Linux Basics'},
  {title:'systemctl get-default set-default', section:'Linux Basics'},
  {title:'Linux Boot Process', section:'Linux Basics'},
  {title:'rescue.target emergency mode', section:'Linux Basics'}
]);

window.LM = window.LM || { pages: {}, searchIndex: [] };

// ===== LOGS & MONITORING =====
window.LM.registerPage('logs', `
<h1 class="page-title">Logs & Monitoring</h1>
<p class="page-subtitle">Read, search, and monitor system logs like a detective</p>
<div class="content-section">
  <h2 class="section-title"><span class="icon">📊</span> Essential Log Files & Commands</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Logs are like <strong>CCTV recordings</strong> for your server. When something goes wrong, you rewind the footage (logs) to find what happened, when, and why.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Key log files</span>
<span class="path">/var/log/messages</span>     <span class="comment"># General system log (RHEL)</span>
<span class="path">/var/log/secure</span>       <span class="comment"># Authentication logs (SSH, sudo)</span>
<span class="path">/var/log/boot.log</span>     <span class="comment"># Boot messages</span>
<span class="path">/var/log/cron</span>         <span class="comment"># Cron job logs</span>
<span class="path">/var/log/dmesg</span>        <span class="comment"># Kernel ring buffer</span>

<span class="comment"># journalctl — modern log viewer (systemd)</span>
<span class="cmd">journalctl</span> <span class="flag">-xe</span>                     <span class="comment"># Recent logs with explanations</span>
<span class="cmd">journalctl</span> <span class="flag">-u sshd -f</span>              <span class="comment"># Follow SSH logs live</span>
<span class="cmd">journalctl</span> <span class="flag">--since</span> <span class="string">"1 hour ago"</span>   <span class="comment"># Logs from last hour</span>
<span class="cmd">journalctl</span> <span class="flag">-p err</span>                  <span class="comment"># Only error-level logs</span>
<span class="cmd">journalctl</span> <span class="flag">--disk-usage</span>            <span class="comment"># How much space logs use</span>

<span class="comment"># Real-time monitoring</span>
<span class="cmd">tail</span> <span class="flag">-f</span> <span class="path">/var/log/messages</span>          <span class="comment"># Follow log file live</span>
<span class="cmd">tail</span> <span class="flag">-f</span> <span class="path">/var/log/secure</span> | <span class="cmd">grep</span> <span class="string">"Failed"</span>  <span class="comment"># Watch failed logins</span></pre></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{title:'Log files /var/log', section:'Advanced'},{title:'journalctl logs', section:'Advanced'},{title:'tail -f monitoring', section:'Advanced'}]);

// ===== PERFORMANCE TUNING =====
window.LM.registerPage('performance', `
<h1 class="page-title">Performance Tuning</h1>
<p class="page-subtitle">Identify bottlenecks and optimize Linux server performance</p>
<div class="content-section">
  <h2 class="section-title"><span class="icon">🚀</span> Performance Analysis Toolkit</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Performance tuning is like being a <strong>car mechanic</strong>. You check the engine (CPU), fuel tank (memory), trunk space (disk), and highway (network) to find what's slowing the car down.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># CPU</span>
<span class="cmd">top</span>                   <span class="comment"># Live CPU/memory (press 1 to see per-core)</span>
<span class="cmd">mpstat</span> <span class="num">1 5</span>            <span class="comment"># CPU stats every 1s for 5 times</span>
<span class="cmd">uptime</span>                <span class="comment"># Load average (1, 5, 15 min)</span>

<span class="comment"># Memory</span>
<span class="cmd">free</span> <span class="flag">-h</span>               <span class="comment"># RAM usage</span>
<span class="cmd">vmstat</span> <span class="num">1 5</span>            <span class="comment"># Virtual memory stats</span>
<span class="cmd">slabtop</span>               <span class="comment"># Kernel cache usage</span>

<span class="comment"># Disk I/O</span>
<span class="cmd">iostat</span> <span class="flag">-x</span> <span class="num">1 5</span>        <span class="comment"># Disk I/O stats (install sysstat)</span>
<span class="cmd">iotop</span>                 <span class="comment"># Which process is doing most I/O</span>

<span class="comment"># Network</span>
<span class="cmd">sar</span> <span class="flag">-n DEV</span> <span class="num">1 5</span>       <span class="comment"># Network throughput</span>
<span class="cmd">iftop</span>                 <span class="comment"># Live network bandwidth by connection</span>

<span class="comment"># All-in-one</span>
<span class="cmd">sar</span> <span class="flag">-A</span>                <span class="comment"># Complete system activity report</span>
<span class="cmd">dstat</span>                 <span class="comment"># CPU, disk, net, page in one view</span></pre></div>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Quick Triage:</strong> Load average > CPU count = overloaded. Free memory low + swap used = needs more RAM. iowait high = disk bottleneck.</div></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{title:'Performance Tuning Linux', section:'Advanced'},{title:'top mpstat vmstat iostat', section:'Advanced'},{title:'Load Average CPU', section:'Advanced'}]);

// ===== SECURITY & SSH =====
window.LM.registerPage('security', `
<h1 class="page-title">Security & SSH</h1>
<p class="page-subtitle">Secure your Linux servers with SSH hardening, firewalls, and best practices</p>
<div class="content-section">
  <h2 class="section-title"><span class="icon">🛡️</span> SSH Security & Configuration</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>SSH is like a <strong>secure tunnel</strong> between your laptop and the server. Password auth is like a PIN code (can be guessed). Key-based auth is like a <strong>fingerprint scanner</strong> — much harder to fake.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Generate SSH key pair</span>
<span class="cmd">ssh-keygen</span> <span class="flag">-t ed25519 -C</span> <span class="string">"admin@server"</span>

<span class="comment"># Copy public key to remote server</span>
<span class="cmd">ssh-copy-id</span> <span class="path">user@remote-server</span>

<span class="comment"># SSH hardening (/etc/ssh/sshd_config)</span>
<span class="keyword">PermitRootLogin</span> no                <span class="comment"># Disable root SSH login</span>
<span class="keyword">PasswordAuthentication</span> no         <span class="comment"># Disable password auth (keys only)</span>
<span class="keyword">Port</span> 2222                         <span class="comment"># Change default port</span>
<span class="keyword">MaxAuthTries</span> 3                    <span class="comment"># Limit login attempts</span>
<span class="keyword">AllowUsers</span> admin deployer         <span class="comment"># Only allow specific users</span>

<span class="comment"># Restart SSH after changes</span>
<span class="cmd">systemctl</span> <span class="flag">restart</span> <span class="path">sshd</span>

<span class="comment"># Firewall basics (firewalld)</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--state</span>                               <span class="comment"># Check status</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--list-all</span>                             <span class="comment"># List all rules</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--add-service=http --permanent</span>         <span class="comment"># Allow HTTP</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--add-port=8080/tcp --permanent</span>       <span class="comment"># Allow port 8080</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--remove-service=ftp --permanent</span>      <span class="comment"># Remove FTP</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--reload</span>                               <span class="comment"># Apply changes</span></pre></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{title:'SSH Security Hardening', section:'Advanced'},{title:'ssh-keygen key-based auth', section:'Advanced'},{title:'firewalld firewall-cmd', section:'Advanced'},{title:'sshd_config', section:'Advanced'}]);

// ===== SHELL SCRIPTING =====
window.LM.registerPage('scripting', `
<h1 class="page-title">Shell Scripting Basics</h1>
<p class="page-subtitle">Automate repetitive tasks with bash scripts</p>
<div class="content-section">
  <h2 class="section-title"><span class="icon">📜</span> Bash Scripting Fundamentals</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>A shell script is like a <strong>recipe card</strong>. Instead of cooking each step manually every time, you write down all the steps once. Then you just say "follow the recipe" and it's done automatically.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment">#!/bin/bash</span>
<span class="comment"># Script: server_health.sh — Check server health</span>

<span class="keyword">echo</span> <span class="string">"===== Server Health Report ====="</span>
<span class="keyword">echo</span> <span class="string">"Hostname: $(hostname)"</span>
<span class="keyword">echo</span> <span class="string">"Date: $(date)"</span>
<span class="keyword">echo</span> <span class="string">"Uptime: $(uptime -p)"</span>
<span class="keyword">echo</span> <span class="string">""</span>

<span class="comment"># CPU Load</span>
<span class="keyword">LOAD</span>=$(<span class="cmd">uptime</span> | <span class="cmd">awk</span> <span class="string">'{print $(NF-2)}'</span> | <span class="cmd">tr</span> <span class="flag">-d</span> <span class="string">','</span>)
<span class="keyword">echo</span> <span class="string">"CPU Load: $LOAD"</span>

<span class="comment"># Memory</span>
<span class="keyword">MEM_USED</span>=$(<span class="cmd">free</span> <span class="flag">-h</span> | <span class="cmd">awk</span> <span class="string">'/^Mem/{print $3}'</span>)
<span class="keyword">MEM_TOTAL</span>=$(<span class="cmd">free</span> <span class="flag">-h</span> | <span class="cmd">awk</span> <span class="string">'/^Mem/{print $2}'</span>)
<span class="keyword">echo</span> <span class="string">"Memory: $MEM_USED / $MEM_TOTAL"</span>

<span class="comment"># Disk</span>
<span class="keyword">DISK</span>=$(<span class="cmd">df</span> <span class="flag">-h</span> <span class="path">/</span> | <span class="cmd">awk</span> <span class="string">'NR==2{print $5}'</span>)
<span class="keyword">echo</span> <span class="string">"Root Disk Used: $DISK"</span>

<span class="comment"># Alert if disk > 80%</span>
<span class="keyword">DISK_PCT</span>=$(<span class="keyword">echo</span> <span class="string">"$DISK"</span> | <span class="cmd">tr</span> <span class="flag">-d</span> <span class="string">'%'</span>)
<span class="keyword">if</span> [ <span class="string">"$DISK_PCT"</span> <span class="flag">-gt</span> <span class="num">80</span> ]; <span class="keyword">then</span>
    <span class="keyword">echo</span> <span class="string">"⚠️ WARNING: Disk usage is above 80%!"</span>
<span class="keyword">fi</span>

<span class="comment"># Variables, Loops, Conditionals</span>
<span class="keyword">for</span> user <span class="keyword">in</span> alice bob charlie; <span class="keyword">do</span>
    <span class="keyword">echo</span> <span class="string">"Checking user: $user"</span>
    <span class="cmd">id</span> <span class="path">$user</span> <span class="num">2>/dev/null</span> || <span class="keyword">echo</span> <span class="string">"  User $user not found"</span>
<span class="keyword">done</span></pre></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash — run it</span><button class="copy-btn">📋 Copy</button></div><pre><span class="cmd">chmod</span> <span class="num">755</span> <span class="path">server_health.sh</span>
<span class="cmd">./server_health.sh</span></pre></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{title:'Shell Scripting Bash', section:'Advanced'},{title:'Bash Variables Loops If', section:'Advanced'},{title:'Server Health Script', section:'Advanced'}]);

// ===== KERNEL & ADVANCED =====
window.LM.registerPage('kernel', `
<h1 class="page-title">Kernel & Advanced Topics</h1>
<p class="page-subtitle">Kernel tuning, ulimits, sysctl, and advanced system administration</p>
<div class="content-section">
  <h2 class="section-title"><span class="icon">🧠</span> Kernel Parameters & System Tuning</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>The kernel is the <strong>engine</strong> of your Linux car. Tuning kernel parameters is like adjusting the engine's settings — fuel injection (memory), RPM limits (process limits), and transmission (network buffers) — to get optimal performance for your workload.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View kernel version</span>
<span class="cmd">uname</span> <span class="flag">-r</span>

<span class="comment"># sysctl — Runtime kernel parameters</span>
<span class="cmd">sysctl</span> <span class="flag">-a</span>                                 <span class="comment"># List ALL parameters</span>
<span class="cmd">sysctl</span> <span class="path">vm.swappiness</span>                      <span class="comment"># View specific parameter</span>
<span class="cmd">sysctl</span> <span class="flag">-w</span> <span class="path">vm.swappiness=10</span>                <span class="comment"># Set temporarily</span>

<span class="comment"># Permanent: add to /etc/sysctl.conf</span>
<span class="output">vm.swappiness = 10</span>                         <span class="comment"># Reduce swap usage</span>
<span class="output">net.core.somaxconn = 65535</span>                 <span class="comment"># Max socket connections</span>
<span class="output">net.ipv4.ip_forward = 1</span>                   <span class="comment"># Enable IP forwarding</span>
<span class="cmd">sysctl</span> <span class="flag">-p</span>                                 <span class="comment"># Apply changes</span>

<span class="comment"># ulimit — User resource limits</span>
<span class="cmd">ulimit</span> <span class="flag">-a</span>                                 <span class="comment"># View all limits</span>
<span class="cmd">ulimit</span> <span class="flag">-n</span>                                 <span class="comment"># Max open files</span>

<span class="comment"># Permanent limits: /etc/security/limits.conf</span>
<span class="output">*  soft  nofile  65535</span>
<span class="output">*  hard  nofile  65535</span>
<span class="output">*  soft  nproc   65535</span>

<span class="comment"># Loaded kernel modules</span>
<span class="cmd">lsmod</span>                                      <span class="comment"># List loaded modules</span>
<span class="cmd">modinfo</span> <span class="path">ext4</span>                               <span class="comment"># Info about a module</span>
<span class="cmd">modprobe</span> <span class="path">br_netfilter</span>                      <span class="comment"># Load a module</span></pre></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{title:'Kernel Tuning sysctl', section:'Advanced'},{title:'ulimit resource limits', section:'Advanced'},{title:'lsmod kernel modules', section:'Advanced'},{title:'vm.swappiness', section:'Advanced'}]);

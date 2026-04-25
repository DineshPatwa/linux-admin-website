window.LM = window.LM || { pages: {}, searchIndex: [] };

window.LM.registerPage('projects', `
<h1 class="page-title">Real-World Projects</h1>
<p class="page-subtitle">Step-by-step guided projects to build production-ready skills</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🌐</span> Project 1: Setup a Production Web Server (Nginx)</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Step 1: Install Nginx</span>
<span class="cmd">dnf</span> <span class="flag">install</span> <span class="path">nginx -y</span>

<span class="comment"># Step 2: Start & enable</span>
<span class="cmd">systemctl</span> <span class="flag">enable --now</span> <span class="path">nginx</span>

<span class="comment"># Step 3: Open firewall</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--add-service=http --permanent</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--add-service=https --permanent</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--reload</span>

<span class="comment"># Step 4: Create website</span>
<span class="cmd">cat</span> > <span class="path">/usr/share/nginx/html/index.html</span> << 'EOF'
&lt;html&gt;&lt;body&gt;&lt;h1&gt;Production Server is Live!&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;
EOF

<span class="comment"># Step 5: SSL with self-signed cert</span>
<span class="cmd">openssl</span> <span class="flag">req -x509 -nodes -days 365</span> \\
  <span class="flag">-newkey rsa:2048</span> \\
  <span class="flag">-keyout</span> <span class="path">/etc/nginx/ssl/server.key</span> \\
  <span class="flag">-out</span> <span class="path">/etc/nginx/ssl/server.crt</span> \\
  <span class="flag">-subj</span> <span class="string">"/CN=myserver.local"</span>

<span class="comment"># Step 6: Verify</span>
<span class="cmd">curl</span> <span class="flag">-I</span> <span class="path">http://localhost</span>
<span class="cmd">systemctl</span> <span class="flag">status</span> <span class="path">nginx</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🏗️</span> Project 2: 3-Tier Architecture</h2>
  <div class="code-block"><div class="code-header"><span class="lang">architecture</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># 3-Tier Architecture:</span>
<span class="comment"># [Client Browser] → [Web Server: Nginx] → [App Server: Node.js] → [DB: MySQL]</span>

<span class="comment"># Tier 1: Web Server (Nginx as reverse proxy)</span>
<span class="cmd">dnf</span> <span class="flag">install</span> <span class="path">nginx -y</span>

<span class="comment"># Add reverse proxy config to /etc/nginx/conf.d/app.conf:</span>
<span class="output">server {</span>
<span class="output">    listen 80;</span>
<span class="output">    location / {</span>
<span class="output">        proxy_pass http://127.0.0.1:3000;</span>
<span class="output">        proxy_set_header Host $host;</span>
<span class="output">    }</span>
<span class="output">}</span>

<span class="comment"># Tier 2: App Server (Node.js)</span>
<span class="cmd">dnf</span> <span class="flag">module install</span> <span class="path">nodejs:18 -y</span>

<span class="comment"># Tier 3: Database (MySQL)</span>
<span class="cmd">dnf</span> <span class="flag">install</span> <span class="path">mysql-server -y</span>
<span class="cmd">systemctl</span> <span class="flag">enable --now</span> <span class="path">mysqld</span>
<span class="cmd">mysql_secure_installation</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">💾</span> Project 3: Automated Backup System</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment">#!/bin/bash</span>
<span class="comment"># /usr/local/bin/backup.sh — Production backup script</span>
<span class="keyword">SRC</span>=<span class="string">"/var/www /etc /home"</span>
<span class="keyword">DST</span>=<span class="string">"/backup/$(hostname)/$(date +%F)"</span>
<span class="keyword">LOG</span>=<span class="string">"/var/log/backup-$(date +%F).log"</span>

<span class="cmd">mkdir</span> <span class="flag">-p</span> <span class="path">$DST</span>
<span class="keyword">echo</span> <span class="string">"Backup started: $(date)"</span> | <span class="cmd">tee</span> <span class="path">$LOG</span>

<span class="keyword">for</span> dir <span class="keyword">in</span> $SRC; <span class="keyword">do</span>
    <span class="cmd">rsync</span> <span class="flag">-av --delete</span> <span class="path">$dir</span> <span class="path">$DST/</span> >> <span class="path">$LOG</span> 2>&1
    <span class="keyword">if</span> [ $? <span class="flag">-eq</span> <span class="num">0</span> ]; <span class="keyword">then</span>
        <span class="keyword">echo</span> <span class="string">"✅ $dir backed up successfully"</span> | <span class="cmd">tee</span> <span class="flag">-a</span> <span class="path">$LOG</span>
    <span class="keyword">else</span>
        <span class="keyword">echo</span> <span class="string">"❌ $dir backup FAILED"</span> | <span class="cmd">tee</span> <span class="flag">-a</span> <span class="path">$LOG</span>
    <span class="keyword">fi</span>
<span class="keyword">done</span>

<span class="comment"># Cleanup old backups (keep 30 days)</span>
<span class="cmd">find</span> <span class="path">/backup/$(hostname)/</span> <span class="flag">-maxdepth 1 -type d -mtime +30 -exec</span> <span class="cmd">rm</span> <span class="flag">-rf</span> {} \\;
<span class="keyword">echo</span> <span class="string">"Backup completed: $(date)"</span> | <span class="cmd">tee</span> <span class="flag">-a</span> <span class="path">$LOG</span>

<span class="comment"># Schedule with cron (run daily at 2 AM):</span>
<span class="comment"># crontab -e</span>
<span class="comment"># 0 2 * * * /usr/local/bin/backup.sh</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">👥</span> Project 4: User Management Automation</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment">#!/bin/bash</span>
<span class="comment"># bulk_users.sh — Create users from CSV file</span>
<span class="comment"># CSV format: username,group,shell</span>

<span class="keyword">CSV_FILE</span>=<span class="string">"users.csv"</span>

<span class="keyword">while</span> IFS=<span class="string">','</span> <span class="keyword">read</span> username group shell; <span class="keyword">do</span>
    <span class="comment"># Skip header</span>
    [ <span class="string">"$username"</span> == <span class="string">"username"</span> ] && <span class="keyword">continue</span>

    <span class="comment"># Create group if not exists</span>
    <span class="cmd">groupadd</span> <span class="path">$group</span> <span class="num">2>/dev/null</span>

    <span class="comment"># Create user</span>
    <span class="cmd">useradd</span> <span class="flag">-m -g</span> <span class="path">$group</span> <span class="flag">-s</span> <span class="path">$shell</span> <span class="path">$username</span> <span class="num">2>/dev/null</span>

    <span class="keyword">if</span> [ $? <span class="flag">-eq</span> <span class="num">0</span> ]; <span class="keyword">then</span>
        <span class="comment"># Set temp password</span>
        <span class="keyword">echo</span> <span class="string">"$username:TempPass123!"</span> | <span class="cmd">chpasswd</span>
        <span class="comment"># Force password change on first login</span>
        <span class="cmd">chage</span> <span class="flag">-d 0</span> <span class="path">$username</span>
        <span class="keyword">echo</span> <span class="string">"✅ Created: $username ($group)"</span>
    <span class="keyword">else</span>
        <span class="keyword">echo</span> <span class="string">"⚠️ Skipped: $username (already exists)"</span>
    <span class="keyword">fi</span>
<span class="keyword">done</span> < <span class="path">$CSV_FILE</span></pre></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{title:'Web Server Setup Nginx', section:'Projects'},{title:'3-Tier Architecture', section:'Projects'},{title:'Automated Backup Script', section:'Projects'},{title:'User Management Automation', section:'Projects'}]);

window.LM.registerPage('troubleshooting', `
<h1 class="page-title">Troubleshooting & Scenarios</h1>
<p class="page-subtitle">Learn by scenario — real problems you'll face as a Linux admin</p>

<div class="scenario-card">
  <button class="scenario-header"><span class="scenario-icon">💿</span> Scenario: Disk is Full — What to Do?<span class="arrow-sc">▼</span></button>
  <div class="scenario-body"><div class="scenario-body-inner">
    <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Step 1: Check which filesystem is full</span>
<span class="cmd">df</span> <span class="flag">-h</span>

<span class="comment"># Step 2: Find largest directories</span>
<span class="cmd">du</span> <span class="flag">-sh</span> <span class="path">/*</span> <span class="num">2>/dev/null</span> | <span class="cmd">sort</span> <span class="flag">-rh</span> | <span class="cmd">head</span> <span class="flag">-10</span>

<span class="comment"># Step 3: Find large files</span>
<span class="cmd">find</span> <span class="path">/</span> <span class="flag">-type f -size +100M</span> <span class="flag">-exec</span> <span class="cmd">ls</span> <span class="flag">-lh</span> {} \\; <span class="num">2>/dev/null</span>

<span class="comment"># Step 4: Check for old logs</span>
<span class="cmd">du</span> <span class="flag">-sh</span> <span class="path">/var/log/*</span> | <span class="cmd">sort</span> <span class="flag">-rh</span> | <span class="cmd">head</span>

<span class="comment"># Step 5: Clean old logs</span>
<span class="cmd">journalctl</span> <span class="flag">--vacuum-size=100M</span>
<span class="cmd">find</span> <span class="path">/var/log</span> <span class="flag">-name "*.gz" -mtime +30 -delete</span>

<span class="comment"># Step 6: Check for deleted-but-open files (hidden space)</span>
<span class="cmd">lsof</span> | <span class="cmd">grep</span> <span class="string">"deleted"</span></pre></div>
  </div></div>
</div>

<div class="scenario-card">
  <button class="scenario-header"><span class="scenario-icon">🐌</span> Scenario: Server is Slow — How to Troubleshoot?<span class="arrow-sc">▼</span></button>
  <div class="scenario-body"><div class="scenario-body-inner">
    <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Step 1: Check load average</span>
<span class="cmd">uptime</span>
<span class="comment"># If load > number of CPUs → overloaded</span>

<span class="comment"># Step 2: Check CPU-hungry processes</span>
<span class="cmd">top</span> <span class="flag">-bn1</span> | <span class="cmd">head</span> <span class="flag">-15</span>

<span class="comment"># Step 3: Check memory</span>
<span class="cmd">free</span> <span class="flag">-h</span>
<span class="comment"># If swap is heavily used → needs more RAM</span>

<span class="comment"># Step 4: Check disk I/O</span>
<span class="cmd">iostat</span> <span class="flag">-x</span> <span class="num">1 3</span>
<span class="comment"># If %util > 80% → disk bottleneck</span>

<span class="comment"># Step 5: Check for OOM kills</span>
<span class="cmd">dmesg</span> | <span class="cmd">grep</span> <span class="flag">-i</span> <span class="string">"out of memory"</span>
<span class="cmd">journalctl</span> | <span class="cmd">grep</span> <span class="flag">-i</span> <span class="string">"oom"</span></pre></div>
  </div></div>
</div>

<div class="scenario-card">
  <button class="scenario-header"><span class="scenario-icon">🔒</span> Scenario: Can't SSH into Server<span class="arrow-sc">▼</span></button>
  <div class="scenario-body"><div class="scenario-body-inner">
    <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Step 1: Check if server is reachable</span>
<span class="cmd">ping</span> <span class="flag">-c 3</span> <span class="path">server-ip</span>

<span class="comment"># Step 2: Check if SSH port is open</span>
<span class="cmd">telnet</span> <span class="path">server-ip</span> <span class="num">22</span>
<span class="cmd">nmap</span> <span class="flag">-p 22</span> <span class="path">server-ip</span>

<span class="comment"># Step 3: On the server — check sshd</span>
<span class="cmd">systemctl</span> <span class="flag">status</span> <span class="path">sshd</span>
<span class="cmd">ss</span> <span class="flag">-tlnp</span> | <span class="cmd">grep</span> <span class="num">22</span>

<span class="comment"># Step 4: Check firewall</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--list-all</span>

<span class="comment"># Step 5: Check SSH config</span>
<span class="cmd">sshd</span> <span class="flag">-t</span>   <span class="comment"># Test config syntax</span>

<span class="comment"># Step 6: Check auth logs</span>
<span class="cmd">tail</span> <span class="flag">-50</span> <span class="path">/var/log/secure</span></pre></div>
  </div></div>
</div>

<div class="scenario-card">
  <button class="scenario-header"><span class="scenario-icon">🌐</span> Scenario: Web Server is Down<span class="arrow-sc">▼</span></button>
  <div class="scenario-body"><div class="scenario-body-inner">
    <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Step 1: Check service status</span>
<span class="cmd">systemctl</span> <span class="flag">status</span> <span class="path">nginx</span>    <span class="comment"># or httpd</span>

<span class="comment"># Step 2: Check if port 80/443 is listening</span>
<span class="cmd">ss</span> <span class="flag">-tlnp</span> | <span class="cmd">grep</span> <span class="string">":80"</span>

<span class="comment"># Step 3: Check error logs</span>
<span class="cmd">tail</span> <span class="flag">-50</span> <span class="path">/var/log/nginx/error.log</span>
<span class="cmd">journalctl</span> <span class="flag">-u nginx --since</span> <span class="string">"10 min ago"</span>

<span class="comment"># Step 4: Test config syntax</span>
<span class="cmd">nginx</span> <span class="flag">-t</span>

<span class="comment"># Step 5: Try to restart</span>
<span class="cmd">systemctl</span> <span class="flag">restart</span> <span class="path">nginx</span>

<span class="comment"># Step 6: Check firewall</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--list-services</span></pre></div>
  </div></div>
</div>

<div class="scenario-card">
  <button class="scenario-header"><span class="scenario-icon">💀</span> Scenario: Server Won't Boot<span class="arrow-sc">▼</span></button>
  <div class="scenario-body"><div class="scenario-body-inner">
    <div class="code-block"><div class="code-header"><span class="lang">steps</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Step 1: Check GRUB menu — select rescue kernel</span>
<span class="comment"># Step 2: Boot into rescue mode from ISO</span>
<span class="comment"># Step 3: Check /etc/fstab for bad entries</span>
<span class="cmd">cat</span> <span class="path">/etc/fstab</span>   <span class="comment"># Look for typos or missing disks</span>

<span class="comment"># Step 4: Check journalctl from failed boot</span>
<span class="cmd">journalctl</span> <span class="flag">-b -1 -p err</span>

<span class="comment"># Step 5: Check disk health</span>
<span class="cmd">fsck</span> <span class="path">/dev/sda1</span>

<span class="comment"># Step 6: Reset root password (from GRUB)</span>
<span class="comment"># Edit GRUB: add rd.break to kernel line</span>
<span class="comment"># mount -o remount,rw /sysroot</span>
<span class="comment"># chroot /sysroot</span>
<span class="comment"># passwd root</span>
<span class="comment"># touch /.autorelabel</span>
<span class="comment"># exit && reboot</span></pre></div>
  </div></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{title:'Disk Full Troubleshooting', section:'Troubleshooting'},{title:'Server Slow Performance', section:'Troubleshooting'},{title:'SSH Connection Failed', section:'Troubleshooting'},{title:'Web Server Down', section:'Troubleshooting'},{title:'Server Boot Failure', section:'Troubleshooting'}]);

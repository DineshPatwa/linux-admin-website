window.LM = window.LM || { pages: {}, searchIndex: [] };

window.LM.registerPage('interview', `
<h1 class="page-title">Interview Preparation</h1>
<p class="page-subtitle">Top Linux Admin & DevOps interview questions — L1, L2, L3 levels</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🟢</span> L1 — Basic Level</h2>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is Linux and why is it used in servers?<span class="arrow-acc">▼</span></button><div class="accordion-body">Linux is an open-source operating system kernel. It's used in servers because it's free, stable, secure, lightweight, and highly customizable. Over 90% of the world's servers and cloud infrastructure runs Linux.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is the difference between / and /root?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">/</code> is the root of the entire filesystem (top-level directory). <code class="code-inline">/root</code> is the home directory of the root user. They are completely different!</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How do you check disk space?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">df -h</code> shows filesystem disk space usage. <code class="code-inline">du -sh /path</code> shows size of a specific directory. Use <code class="code-inline">lsblk</code> to see all block devices.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What are file permissions in Linux?<span class="arrow-acc">▼</span></button><div class="accordion-body">Every file has permissions for Owner, Group, and Others: Read(4), Write(2), Execute(1). <code class="code-inline">chmod 755 file</code> means owner=rwx, group=rx, others=rx. <code class="code-inline">chmod 600 file</code> means owner=rw only.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How do you find a file in Linux?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">find / -name "filename"</code> for real-time search. <code class="code-inline">locate filename</code> for fast cached search (needs <code class="code-inline">updatedb</code>). <code class="code-inline">grep -r "text" /path</code> to search inside files.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🟡</span> L2 — Intermediate Level</h2>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> Explain the Linux boot process<span class="arrow-acc">▼</span></button><div class="accordion-body">BIOS/UEFI → GRUB2 (bootloader) → Kernel loads → systemd (PID 1) starts → Default target (multi-user/graphical) → Services start → Login prompt. Use <code class="code-inline">systemd-analyze blame</code> to see boot timing.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is LVM and why is it used?<span class="arrow-acc">▼</span></button><div class="accordion-body">LVM (Logical Volume Manager) allows flexible disk management. You can resize partitions without unmounting, span volumes across multiple disks, and create snapshots. It adds a layer between physical disks and filesystems.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How do you troubleshoot a service that won't start?<span class="arrow-acc">▼</span></button><div class="accordion-body">1) <code class="code-inline">systemctl status service</code> — check error. 2) <code class="code-inline">journalctl -u service -xe</code> — detailed logs. 3) Check config syntax (e.g., <code class="code-inline">nginx -t</code>). 4) Check port conflicts with <code class="code-inline">ss -tlnp</code>. 5) Check SELinux: <code class="code-inline">ausearch -m avc</code>.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is the difference between hard link and soft link?<span class="arrow-acc">▼</span></button><div class="accordion-body">Hard link: same inode, same data, survives if original deleted. Soft link (symlink): pointer to a file path, breaks if original deleted. Hard links can't cross filesystems or link directories. Soft links can do both.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How to set up password-less SSH?<span class="arrow-acc">▼</span></button><div class="accordion-body">1) <code class="code-inline">ssh-keygen -t ed25519</code> on client. 2) <code class="code-inline">ssh-copy-id user@server</code> copies public key. 3) Test: <code class="code-inline">ssh user@server</code> should connect without password. Ensure <code class="code-inline">~/.ssh</code> is 700 and key files are 600.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔴</span> L3 — Advanced Level</h2>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How do you tune a Linux server for high performance?<span class="arrow-acc">▼</span></button><div class="accordion-body">1) Set <code class="code-inline">vm.swappiness=10</code> to reduce swap usage. 2) Increase <code class="code-inline">ulimit -n</code> for open files. 3) Tune <code class="code-inline">net.core.somaxconn</code> for high connections. 4) Use <code class="code-inline">tuned-adm profile throughput-performance</code>. 5) Monitor with <code class="code-inline">sar</code>, <code class="code-inline">iostat</code>, <code class="code-inline">vmstat</code>.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is a zombie process and how to fix it?<span class="arrow-acc">▼</span></button><div class="accordion-body">A zombie (defunct) process has completed but its parent hasn't collected the exit status via wait(). Find with <code class="code-inline">ps aux | grep Z</code>. Fix: restart the parent process. If parent is PID 1, a reboot may be needed. Zombies themselves don't consume resources.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> Explain the OOM Killer<span class="arrow-acc">▼</span></button><div class="accordion-body">When Linux runs out of memory and swap, the OOM (Out Of Memory) Killer selects and kills processes to free RAM. Check with <code class="code-inline">dmesg | grep -i oom</code>. Prevent by: adding more RAM, setting <code class="code-inline">vm.overcommit_memory</code>, or tuning <code class="code-inline">oom_score_adj</code> for critical processes.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> Scenario: Server has high CPU but you can't find the process<span class="arrow-acc">▼</span></button><div class="accordion-body">Possible causes: 1) Kernel threads (check <code class="code-inline">top</code> — names in brackets). 2) Short-lived processes (use <code class="code-inline">atop</code> or <code class="code-inline">pidstat 1</code>). 3) IRQ storms (check <code class="code-inline">/proc/interrupts</code>). 4) iowait disguised as CPU (check <code class="code-inline">iostat</code>). 5) Cryptocurrency miner hiding its process name.</div></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{title:'Linux Interview Questions', section:'Interview'},{title:'L1 L2 L3 Interview Prep', section:'Interview'},{title:'Scenario Based Questions', section:'Interview'}]);

window.LM.registerPage('labs', `
<h1 class="page-title">Practice Labs</h1>
<p class="page-subtitle">Hands-on exercises to build real muscle memory</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧪</span> Lab 1: User & Permission Management</h2>
  <p><strong>Objective:</strong> Create users, groups, and set up a shared project directory with proper permissions.</p>
  <ol class="lab-steps">
    <li>Create 3 users: <code class="code-inline">sudo useradd -m dev1 && sudo useradd -m dev2 && sudo useradd -m ops1</code></li>
    <li>Create 2 groups: <code class="code-inline">sudo groupadd developers && sudo groupadd operations</code></li>
    <li>Add users to groups: <code class="code-inline">sudo usermod -aG developers dev1 && sudo usermod -aG developers dev2 && sudo usermod -aG operations ops1</code></li>
    <li>Create shared directory: <code class="code-inline">sudo mkdir -p /opt/project</code></li>
    <li>Set ownership: <code class="code-inline">sudo chown root:developers /opt/project && sudo chmod 2775 /opt/project</code></li>
    <li>Test as dev1: <code class="code-inline">su - dev1</code> → create file in /opt/project → verify group is "developers"</li>
    <li>Test as ops1: should NOT be able to write to /opt/project</li>
    <li>Give ops1 read-only ACL: <code class="code-inline">sudo setfacl -m u:ops1:rx /opt/project</code></li>
    <li>Verify: <code class="code-inline">getfacl /opt/project</code></li>
    <li>Cleanup: <code class="code-inline">sudo userdel -r dev1 && sudo userdel -r dev2 && sudo userdel -r ops1</code></li>
  </ol>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧪</span> Lab 2: Service Management & Troubleshooting</h2>
  <p><strong>Objective:</strong> Install, configure, and troubleshoot a web server.</p>
  <ol class="lab-steps">
    <li>Install Nginx: <code class="code-inline">sudo dnf install nginx -y</code></li>
    <li>Start and enable: <code class="code-inline">sudo systemctl enable --now nginx</code></li>
    <li>Check status: <code class="code-inline">systemctl status nginx</code></li>
    <li>Open firewall: <code class="code-inline">sudo firewall-cmd --add-service=http --permanent && sudo firewall-cmd --reload</code></li>
    <li>Test: <code class="code-inline">curl http://localhost</code></li>
    <li>Break it on purpose: edit /etc/nginx/nginx.conf — add a typo</li>
    <li>Try restart: <code class="code-inline">sudo systemctl restart nginx</code> — watch it fail</li>
    <li>Troubleshoot: <code class="code-inline">sudo nginx -t</code> and <code class="code-inline">journalctl -u nginx -xe</code></li>
    <li>Fix the typo and restart successfully</li>
    <li>Check logs: <code class="code-inline">tail -5 /var/log/nginx/access.log</code></li>
  </ol>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧪</span> Lab 3: LVM — Create, Extend, and Mount</h2>
  <p><strong>Objective:</strong> Practice LVM workflow (requires a spare disk or VM with extra disk).</p>
  <ol class="lab-steps">
    <li>Identify available disk: <code class="code-inline">lsblk</code> (look for unused disk like /dev/sdb)</li>
    <li>Create physical volume: <code class="code-inline">sudo pvcreate /dev/sdb</code></li>
    <li>Create volume group: <code class="code-inline">sudo vgcreate labvg /dev/sdb</code></li>
    <li>Create logical volume: <code class="code-inline">sudo lvcreate -L 2G -n lablv labvg</code></li>
    <li>Format: <code class="code-inline">sudo mkfs.xfs /dev/labvg/lablv</code></li>
    <li>Mount: <code class="code-inline">sudo mkdir /labdata && sudo mount /dev/labvg/lablv /labdata</code></li>
    <li>Verify: <code class="code-inline">df -h /labdata</code></li>
    <li>Extend: <code class="code-inline">sudo lvextend -L +1G /dev/labvg/lablv && sudo xfs_growfs /labdata</code></li>
    <li>Verify new size: <code class="code-inline">df -h /labdata</code></li>
    <li>Add to fstab for persistence (optional)</li>
  </ol>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧪</span> Lab 4: Log Analysis Challenge</h2>
  <p><strong>Objective:</strong> Find critical information in system logs using grep and journalctl.</p>
  <ol class="lab-steps">
    <li>Find all SSH login attempts: <code class="code-inline">grep "sshd" /var/log/secure | tail -20</code></li>
    <li>Find failed logins: <code class="code-inline">grep "Failed password" /var/log/secure | wc -l</code></li>
    <li>Find unique IPs that failed: <code class="code-inline">grep "Failed password" /var/log/secure | awk '{print $(NF-3)}' | sort -u</code></li>
    <li>Check for errors today: <code class="code-inline">journalctl --since today -p err</code></li>
    <li>Find disk-related messages: <code class="code-inline">dmesg | grep -i "error\\|fail" | tail -10</code></li>
    <li>Check which services failed: <code class="code-inline">systemctl list-units --state=failed</code></li>
    <li>View boot timing: <code class="code-inline">systemd-analyze blame | head -10</code></li>
  </ol>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🏆</span> Challenge: Full Server Setup (30 min)</h2>
  <p><strong>Can you do all of these in 30 minutes?</strong></p>
  <ol class="lab-steps">
    <li>Set hostname: <code class="code-inline">hostnamectl set-hostname lab-server</code></li>
    <li>Create user "webadmin" with sudo access</li>
    <li>Set up SSH key-based auth for webadmin</li>
    <li>Install and start Nginx</li>
    <li>Open firewall for HTTP/HTTPS</li>
    <li>Create a custom webpage at /var/www/html/index.html</li>
    <li>Set up a cron job to backup /etc daily at midnight</li>
    <li>Check all services are running, no failures</li>
    <li>Document everything you did in /root/setup-notes.txt</li>
  </ol>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{title:'Practice Labs Hands-on', section:'Labs'},{title:'User Permission Lab', section:'Labs'},{title:'LVM Lab Exercise', section:'Labs'},{title:'Server Setup Challenge', section:'Labs'}]);

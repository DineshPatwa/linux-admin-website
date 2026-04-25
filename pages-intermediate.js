window.LM = window.LM || { pages: {}, searchIndex: [] };

// ===== PROCESS MANAGEMENT =====
window.LM.registerPage('process', `
<h1 class="page-title">Process Management</h1>
<p class="page-subtitle">Monitor, control, and troubleshoot running processes on Linux servers</p>
<div class="content-section">
  <h2 class="section-title"><span class="icon">⚙️</span> Understanding Processes</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Processes are like <strong>employees in a company</strong>. Each has a unique ID (PID), a boss (parent process), and a job to do. Some work in the foreground (at the front desk), some in the background (in the back office). The CEO (PID 1 / systemd) manages everyone.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View processes</span>
<span class="cmd">ps</span> <span class="flag">aux</span>                           <span class="comment"># All processes with details</span>
<span class="cmd">ps</span> <span class="flag">aux --sort=-%mem</span> | <span class="cmd">head</span> <span class="flag">-10</span> <span class="comment"># Top 10 memory consumers</span>
<span class="cmd">ps</span> <span class="flag">aux --sort=-%cpu</span> | <span class="cmd">head</span> <span class="flag">-10</span> <span class="comment"># Top 10 CPU consumers</span>
<span class="cmd">pstree</span>                            <span class="comment"># Process tree (parent-child)</span>
<span class="cmd">top</span>                               <span class="comment"># Live process monitor (q to quit)</span>
<span class="cmd">htop</span>                              <span class="comment"># Better top (install: dnf install htop)</span>

<span class="comment"># Control processes</span>
<span class="cmd">kill</span> <span class="num">1234</span>                         <span class="comment"># Graceful stop (SIGTERM)</span>
<span class="cmd">kill</span> <span class="flag">-9</span> <span class="num">1234</span>                      <span class="comment"># Force kill (SIGKILL) — last resort!</span>
<span class="cmd">killall</span> <span class="path">httpd</span>                     <span class="comment"># Kill all processes by name</span>
<span class="cmd">pkill</span> <span class="flag">-f</span> <span class="string">"python script"</span>          <span class="comment"># Kill by pattern</span>

<span class="comment"># Background & foreground</span>
<span class="cmd">command</span> <span class="flag">&</span>                         <span class="comment"># Run in background</span>
<span class="cmd">jobs</span>                              <span class="comment"># List background jobs</span>
<span class="cmd">fg</span> <span class="num">%1</span>                             <span class="comment"># Bring job 1 to foreground</span>
<span class="cmd">bg</span> <span class="num">%1</span>                             <span class="comment"># Resume stopped job in background</span>
<span class="cmd">nohup</span> <span class="path">command</span> <span class="flag">&</span>                  <span class="comment"># Keep running after logout</span>

<span class="comment"># Priority (nice values: -20 highest to 19 lowest)</span>
<span class="cmd">nice</span> <span class="flag">-n 10</span> <span class="path">command</span>                <span class="comment"># Start with lower priority</span>
<span class="cmd">renice</span> <span class="flag">-n 5</span> <span class="flag">-p</span> <span class="num">1234</span>              <span class="comment"># Change priority of running process</span></pre></div>
  <div class="info-box warning"><span class="info-icon">⚠️</span><div><strong>Zombie Process:</strong> A process that finished but its parent hasn't collected its exit status. Check with <code class="code-inline">ps aux | grep Z</code>. Fix by restarting the parent process or using <code class="code-inline">kill -SIGCHLD parent_pid</code>.</div></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{title:'Process Management ps top kill', section:'Intermediate'},{title:'Background Jobs nohup fg bg', section:'Intermediate'},{title:'Zombie Process', section:'Intermediate'},{title:'nice renice priority', section:'Intermediate'}]);

// ===== NETWORKING =====
window.LM.registerPage('networking', `
<h1 class="page-title">Networking Basics & Troubleshooting</h1>
<p class="page-subtitle">Configure and troubleshoot network connectivity on Linux servers</p>
<div class="content-section">
  <h2 class="section-title"><span class="icon">🌐</span> Network Configuration</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Networking is like the <strong>postal system</strong>. Your IP address is your home address, the gateway is the local post office, DNS is the phone directory that converts names to addresses, and the subnet mask defines your neighborhood.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View network config</span>
<span class="cmd">ip</span> <span class="flag">addr show</span>                        <span class="comment"># Show all interfaces and IPs</span>
<span class="cmd">ip</span> <span class="flag">route show</span>                       <span class="comment"># Show routing table</span>
<span class="cmd">nmcli</span> <span class="flag">con show</span>                      <span class="comment"># Show connections (NetworkManager)</span>
<span class="cmd">nmcli</span> <span class="flag">dev status</span>                    <span class="comment"># Device status</span>
<span class="cmd">cat</span> <span class="path">/etc/resolv.conf</span>                <span class="comment"># DNS servers</span>

<span class="comment"># Configure static IP with nmcli</span>
<span class="cmd">nmcli</span> <span class="flag">con mod</span> <span class="string">"eth0"</span> <span class="flag">ipv4.addresses</span> <span class="path">192.168.1.100/24</span>
<span class="cmd">nmcli</span> <span class="flag">con mod</span> <span class="string">"eth0"</span> <span class="flag">ipv4.gateway</span> <span class="path">192.168.1.1</span>
<span class="cmd">nmcli</span> <span class="flag">con mod</span> <span class="string">"eth0"</span> <span class="flag">ipv4.dns</span> <span class="path">"8.8.8.8 8.8.4.4"</span>
<span class="cmd">nmcli</span> <span class="flag">con mod</span> <span class="string">"eth0"</span> <span class="flag">ipv4.method</span> <span class="path">manual</span>
<span class="cmd">nmcli</span> <span class="flag">con up</span> <span class="string">"eth0"</span>                <span class="comment"># Apply changes</span>

<span class="comment"># Troubleshooting</span>
<span class="cmd">ping</span> <span class="flag">-c 4</span> <span class="path">8.8.8.8</span>                 <span class="comment"># Test connectivity</span>
<span class="cmd">traceroute</span> <span class="path">google.com</span>              <span class="comment"># Trace network path</span>
<span class="cmd">ss</span> <span class="flag">-tulnp</span>                          <span class="comment"># Listening ports + process</span>
<span class="cmd">dig</span> <span class="path">google.com</span>                     <span class="comment"># DNS lookup</span>
<span class="cmd">curl</span> <span class="flag">-I</span> <span class="path">https://google.com</span>        <span class="comment"># Check HTTP headers</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--list-all</span>            <span class="comment"># Check firewall rules</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--add-port=80/tcp --permanent</span>  <span class="comment"># Open port 80</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--reload</span>              <span class="comment"># Apply firewall changes</span></pre></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{title:'Networking ip addr nmcli', section:'Intermediate'},{title:'Static IP Configuration', section:'Intermediate'},{title:'firewall-cmd firewalld', section:'Intermediate'},{title:'DNS dig traceroute', section:'Intermediate'}]);

// ===== DISK & STORAGE =====
window.LM.registerPage('storage', `
<h1 class="page-title">Disk & Storage (LVM)</h1>
<p class="page-subtitle">Manage partitions, LVM, and filesystems for production storage</p>
<div class="content-section">
  <h2 class="section-title"><span class="icon">💿</span> Disk Management</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Think of a disk as a <strong>plot of land</strong>. Partitioning is dividing it into plots. A filesystem is like building houses on each plot. Mounting is adding a door (access point). LVM is like having <strong>elastic walls</strong> — you can expand or shrink rooms without rebuilding.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View disks and partitions</span>
<span class="cmd">lsblk</span>                              <span class="comment"># Block device tree</span>
<span class="cmd">fdisk</span> <span class="flag">-l</span>                           <span class="comment"># List all partitions</span>
<span class="cmd">df</span> <span class="flag">-h</span>                              <span class="comment"># Filesystem usage</span>
<span class="cmd">du</span> <span class="flag">-sh</span> <span class="path">/var/*</span>                     <span class="comment"># Directory sizes</span>
<span class="cmd">blkid</span>                              <span class="comment"># UUIDs and filesystem types</span>

<span class="comment"># LVM — Logical Volume Manager</span>
<span class="cmd">pvs</span>                                <span class="comment"># Physical volumes</span>
<span class="cmd">vgs</span>                                <span class="comment"># Volume groups</span>
<span class="cmd">lvs</span>                                <span class="comment"># Logical volumes</span>

<span class="comment"># Create LVM (new disk /dev/sdb)</span>
<span class="cmd">pvcreate</span> <span class="path">/dev/sdb</span>                  <span class="comment"># Create physical volume</span>
<span class="cmd">vgcreate</span> <span class="path">datavg</span> <span class="path">/dev/sdb</span>          <span class="comment"># Create volume group</span>
<span class="cmd">lvcreate</span> <span class="flag">-L 10G</span> <span class="flag">-n</span> <span class="path">datalv datavg</span>  <span class="comment"># Create 10GB logical volume</span>
<span class="cmd">mkfs.xfs</span> <span class="path">/dev/datavg/datalv</span>       <span class="comment"># Format with XFS</span>
<span class="cmd">mount</span> <span class="path">/dev/datavg/datalv</span> <span class="path">/data</span>    <span class="comment"># Mount it</span>

<span class="comment"># Extend LVM (add space without downtime!)</span>
<span class="cmd">lvextend</span> <span class="flag">-L +5G</span> <span class="path">/dev/datavg/datalv</span>  <span class="comment"># Add 5GB</span>
<span class="cmd">xfs_growfs</span> <span class="path">/data</span>                   <span class="comment"># Grow XFS (use resize2fs for ext4)</span>

<span class="comment"># Reduce LVM (RISKY! ext4 only — XFS cannot be reduced)</span>
<span class="cmd">umount</span> <span class="path">/data</span>                       <span class="comment"># 1. Unmount the filesystem</span>
<span class="cmd">e2fsck</span> <span class="flag">-f</span> <span class="path">/dev/datavg/datalv</span>      <span class="comment"># 2. Check filesystem for errors</span>
<span class="cmd">resize2fs</span> <span class="path">/dev/datavg/datalv</span> <span class="path">5G</span>    <span class="comment"># 3. Shrink filesystem to 5GB first</span>
<span class="cmd">lvreduce</span> <span class="flag">-L 5G</span> <span class="path">/dev/datavg/datalv</span>  <span class="comment"># 4. Shrink logical volume to 5GB</span>
<span class="cmd">mount</span> <span class="path">/dev/datavg/datalv</span> <span class="path">/data</span>    <span class="comment"># 5. Remount</span>

<span class="comment"># Permanent mount (survives reboot)</span>
<span class="comment"># Add to /etc/fstab:</span>
<span class="output">/dev/datavg/datalv  /data  xfs  defaults  0 0</span>
<span class="cmd">mount</span> <span class="flag">-a</span>                           <span class="comment"># Test fstab without reboot</span></pre></div>
  <div class="info-box danger"><span class="info-icon">🚫</span><div><strong>Warning:</strong> Wrong fstab entries can prevent boot! Always test with <code class="code-inline">mount -a</code> before rebooting. Use <code class="code-inline">nofail</code> option for non-critical mounts. Note: XFS filesystems CANNOT be reduced.</div></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{title:'LVM Logical Volume Manager', section:'Intermediate'},{title:'Disk Partition fdisk lsblk', section:'Intermediate'},{title:'Mount fstab', section:'Intermediate'},{title:'Extend LVM lvextend', section:'Intermediate'},{title:'Reduce LVM lvreduce resize2fs', section:'Intermediate'}]);

// ===== SYSTEMD & SERVICES =====
window.LM.registerPage('systemd', `
<h1 class="page-title">Systemd & Services</h1>
<p class="page-subtitle">Manage services, boot targets, and unit files with systemd</p>
<div class="content-section">
  <h2 class="section-title"><span class="icon">🔧</span> Service Management with Systemctl</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Systemd is the <strong>building manager</strong> of Linux. It decides which "tenants" (services) start at boot, monitors them, and restarts them if they crash. <code class="code-inline">systemctl</code> is the intercom you use to give instructions.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Service control</span>
<span class="cmd">systemctl</span> <span class="flag">start</span> <span class="path">httpd</span>              <span class="comment"># Start service NOW</span>
<span class="cmd">systemctl</span> <span class="flag">stop</span> <span class="path">httpd</span>               <span class="comment"># Stop service NOW</span>
<span class="cmd">systemctl</span> <span class="flag">restart</span> <span class="path">httpd</span>            <span class="comment"># Restart (stop + start)</span>
<span class="cmd">systemctl</span> <span class="flag">reload</span> <span class="path">httpd</span>             <span class="comment"># Reload config without downtime</span>
<span class="cmd">systemctl</span> <span class="flag">status</span> <span class="path">httpd</span>             <span class="comment"># Check status (Active/Inactive)</span>

<span class="comment"># Boot behavior</span>
<span class="cmd">systemctl</span> <span class="flag">enable</span> <span class="path">httpd</span>             <span class="comment"># Start on boot</span>
<span class="cmd">systemctl</span> <span class="flag">disable</span> <span class="path">httpd</span>            <span class="comment"># Don't start on boot</span>
<span class="cmd">systemctl</span> <span class="flag">enable --now</span> <span class="path">httpd</span>       <span class="comment"># Enable AND start immediately</span>
<span class="cmd">systemctl</span> <span class="flag">is-enabled</span> <span class="path">httpd</span>         <span class="comment"># Check if enabled</span>
<span class="cmd">systemctl</span> <span class="flag">is-active</span> <span class="path">httpd</span>          <span class="comment"># Check if running</span>

<span class="comment"># View all services</span>
<span class="cmd">systemctl</span> <span class="flag">list-units --type=service</span>              <span class="comment"># Running services</span>
<span class="cmd">systemctl</span> <span class="flag">list-units --type=service --state=failed</span>  <span class="comment"># Failed services</span>
<span class="cmd">systemctl</span> <span class="flag">list-unit-files --type=service</span>         <span class="comment"># All service files</span>

<span class="comment"># View logs for a service</span>
<span class="cmd">journalctl</span> <span class="flag">-u</span> <span class="path">httpd</span>               <span class="comment"># All logs for httpd</span>
<span class="cmd">journalctl</span> <span class="flag">-u</span> <span class="path">httpd</span> <span class="flag">-f</span>            <span class="comment"># Follow live logs</span>
<span class="cmd">journalctl</span> <span class="flag">-u</span> <span class="path">httpd</span> <span class="flag">--since today</span> <span class="comment"># Today's logs only</span></pre></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{title:'systemctl start stop restart enable', section:'Intermediate'},{title:'journalctl service logs', section:'Intermediate'},{title:'systemd service management', section:'Intermediate'}]);

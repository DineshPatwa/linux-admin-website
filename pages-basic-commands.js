window.LM = window.LM || { pages: {}, searchIndex: [] };
window.LM.registerPage('basic-commands', `
<h1 class="page-title">Basic Commands & Structure</h1>
<p class="page-subtitle">Master essential Linux commands for daily system administration</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧭</span> Navigating the Filesystem</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    Think of the Linux filesystem like a <strong>building with floors and rooms</strong>. The root <code class="code-inline">/</code> is the ground floor. <code class="code-inline">/home</code> is the residential floor, <code class="code-inline">/etc</code> is the admin office, and <code class="code-inline">/var</code> is the storage room. You use commands to walk between floors and rooms.
  </div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="cmd">pwd</span>                  <span class="comment"># Print current location (Which room am I in?)</span>
<span class="cmd">ls</span>                   <span class="comment"># List files in current directory</span>
<span class="cmd">ls</span> <span class="flag">-la</span>               <span class="comment"># List ALL files with details (hidden + permissions)</span>
<span class="cmd">ls</span> <span class="flag">-lh</span>               <span class="comment"># Human-readable sizes (KB, MB, GB)</span>
<span class="cmd">cd</span> <span class="path">/var/log</span>          <span class="comment"># Go to specific directory</span>
<span class="cmd">cd</span> <span class="path">..</span>                <span class="comment"># Go one level up (parent directory)</span>
<span class="cmd">cd</span> <span class="path">~</span>                 <span class="comment"># Go to home directory</span>
<span class="cmd">cd</span> <span class="path">-</span>                 <span class="comment"># Go back to previous directory</span>
<span class="cmd">tree</span> <span class="path">/etc</span> <span class="flag">-L 2</span>      <span class="comment"># Show directory tree, 2 levels deep</span>
<span class="cmd">mkdir</span> <span class="flag">-p</span> <span class="path">a/b/c</span>      <span class="comment"># Create nested directories at once</span></pre></div>
  <div class="info-box warning"><span class="info-icon">⚠️</span><div><strong>Common Mistake:</strong> Using <code class="code-inline">rm -rf /</code> instead of <code class="code-inline">rm -rf ./</code> — one wrong character can delete your entire system! Always double-check paths.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📁</span> Managing Files</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Creating files</span>
<span class="cmd">touch</span> <span class="path">file.txt</span>              <span class="comment"># Create empty file</span>
<span class="cmd">cat</span> <span class="flag">></span> <span class="path">notes.txt</span>             <span class="comment"># Create file and type content (Ctrl+D to save)</span>

<span class="comment"># Viewing files</span>
<span class="cmd">cat</span> <span class="path">file.txt</span>                <span class="comment"># Display entire file</span>
<span class="cmd">head</span> <span class="flag">-20</span> <span class="path">file.txt</span>           <span class="comment"># First 20 lines</span>
<span class="cmd">tail</span> <span class="flag">-f</span> <span class="path">/var/log/messages</span>   <span class="comment"># Follow log file in real-time (very useful!)</span>
<span class="cmd">less</span> <span class="path">largefile.log</span>          <span class="comment"># Scroll through file (q to quit)</span>
<span class="cmd">wc</span> <span class="flag">-l</span> <span class="path">file.txt</span>              <span class="comment"># Count lines in file</span>

<span class="comment"># Copying, Moving, Deleting</span>
<span class="cmd">cp</span> <span class="path">file.txt</span> <span class="path">backup.txt</span>     <span class="comment"># Copy file</span>
<span class="cmd">cp</span> <span class="flag">-r</span> <span class="path">dir1/</span> <span class="path">dir2/</span>          <span class="comment"># Copy entire directory</span>
<span class="cmd">mv</span> <span class="path">old.txt</span> <span class="path">new.txt</span>         <span class="comment"># Rename/move file</span>
<span class="cmd">rm</span> <span class="path">file.txt</span>                 <span class="comment"># Delete file</span>
<span class="cmd">rm</span> <span class="flag">-rf</span> <span class="path">directory/</span>           <span class="comment"># Delete directory and contents (CAREFUL!)</span>

<span class="comment"># File info</span>
<span class="cmd">file</span> <span class="path">document.pdf</span>           <span class="comment"># Detect file type</span>
<span class="cmd">stat</span> <span class="path">file.txt</span>               <span class="comment"># Detailed file metadata</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📊</span> System Monitoring & Management</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    System monitoring is like the <strong>dashboard of a car</strong>. You check fuel (disk), speed (CPU), temperature (load), and passengers (processes) to make sure everything is running smoothly.
  </div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="cmd">top</span>                      <span class="comment"># Live process monitor (press q to quit)</span>
<span class="cmd">htop</span>                     <span class="comment"># Better version of top (install: yum install htop)</span>
<span class="cmd">free</span> <span class="flag">-h</span>                  <span class="comment"># RAM usage in human-readable format</span>
<span class="cmd">df</span> <span class="flag">-h</span>                    <span class="comment"># Disk space usage</span>
<span class="cmd">du</span> <span class="flag">-sh</span> <span class="path">/var/log</span>          <span class="comment"># Size of a directory</span>
<span class="cmd">uptime</span>                   <span class="comment"># How long server has been running + load average</span>
<span class="cmd">uname</span> <span class="flag">-a</span>                 <span class="comment"># Kernel and OS info</span>
<span class="cmd">hostname</span>                 <span class="comment"># Show server hostname</span>
<span class="cmd">whoami</span>                   <span class="comment"># Current logged-in user</span>
<span class="cmd">date</span>                     <span class="comment"># Current date and time</span>
<span class="cmd">lscpu</span>                    <span class="comment"># CPU details</span>
<span class="cmd">lsblk</span>                    <span class="comment"># List block devices (disks)</span></pre></div>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Pro Tip:</strong> In production, if <code class="code-inline">uptime</code> shows load average &gt; number of CPUs, your server is overloaded. Example: load of 8.0 on a 4-CPU server = trouble!</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🌐</span> Network Commands</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="cmd">ip</span> <span class="flag">addr show</span>              <span class="comment"># Show IP addresses (modern replacement for ifconfig)</span>
<span class="cmd">ip</span> <span class="flag">route show</span>             <span class="comment"># Show routing table</span>
<span class="cmd">ping</span> <span class="flag">-c 4</span> <span class="path">google.com</span>     <span class="comment"># Test connectivity (4 packets)</span>
<span class="cmd">ss</span> <span class="flag">-tulnp</span>                 <span class="comment"># Show listening ports (replaces netstat)</span>
<span class="cmd">netstat</span> <span class="flag">-tulnp</span>            <span class="comment"># Show listening ports (older systems)</span>
<span class="cmd">nmcli</span> <span class="flag">con show</span>            <span class="comment"># Show network connections (NetworkManager)</span>
<span class="cmd">nmcli</span> <span class="flag">dev status</span>           <span class="comment"># Show device status</span>
<span class="cmd">curl</span> <span class="flag">-I</span> <span class="path">https://site.com</span> <span class="comment"># Check HTTP headers</span>
<span class="cmd">dig</span> <span class="path">google.com</span>            <span class="comment"># DNS lookup</span>
<span class="cmd">traceroute</span> <span class="path">google.com</span>     <span class="comment"># Trace network path</span>
<span class="cmd">hostnamectl</span>               <span class="comment"># Show/set hostname</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📦</span> Package Management (RHEL: yum/dnf/rpm)</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    Package managers are like an <strong>app store</strong>. <code class="code-inline">yum/dnf</code> = App Store (handles dependencies automatically). <code class="code-inline">rpm</code> = manually installing an APK file (you manage dependencies yourself).
  </div>
  <div class="tabs">
    <button class="tab-btn active" data-tab="tab-dnf">DNF/YUM (RHEL 7+)</button>
    <button class="tab-btn" data-tab="tab-rpm">RPM</button>
    <button class="tab-btn" data-tab="tab-apt">APT (Ubuntu)</button>
  </div>
  <div class="tab-content active" id="tab-dnf">
    <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="cmd">dnf</span> <span class="flag">install</span> <span class="path">httpd</span>          <span class="comment"># Install Apache web server</span>
<span class="cmd">dnf</span> <span class="flag">remove</span> <span class="path">httpd</span>           <span class="comment"># Remove package</span>
<span class="cmd">dnf</span> <span class="flag">update</span>                  <span class="comment"># Update all packages</span>
<span class="cmd">dnf</span> <span class="flag">search</span> <span class="path">nginx</span>           <span class="comment"># Search for a package</span>
<span class="cmd">dnf</span> <span class="flag">info</span> <span class="path">httpd</span>              <span class="comment"># Package details</span>
<span class="cmd">dnf</span> <span class="flag">list installed</span>          <span class="comment"># List all installed packages</span>
<span class="cmd">dnf</span> <span class="flag">provides</span> <span class="path">/usr/sbin/ss</span>  <span class="comment"># Which package provides this file?</span>
<span class="cmd">dnf</span> <span class="flag">history</span>                 <span class="comment"># View install/update history</span>
<span class="cmd">dnf</span> <span class="flag">clean all</span>               <span class="comment"># Clear cache</span></pre></div>
  </div>
  <div class="tab-content" id="tab-rpm">
    <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="cmd">rpm</span> <span class="flag">-ivh</span> <span class="path">package.rpm</span>       <span class="comment"># Install RPM package</span>
<span class="cmd">rpm</span> <span class="flag">-qa</span>                     <span class="comment"># List all installed RPMs</span>
<span class="cmd">rpm</span> <span class="flag">-qi</span> <span class="path">httpd</span>              <span class="comment"># Package info</span>
<span class="cmd">rpm</span> <span class="flag">-ql</span> <span class="path">httpd</span>              <span class="comment"># List files installed by package</span>
<span class="cmd">rpm</span> <span class="flag">-qf</span> <span class="path">/usr/sbin/httpd</span>   <span class="comment"># Which RPM owns this file?</span>
<span class="cmd">rpm</span> <span class="flag">-e</span> <span class="path">httpd</span>               <span class="comment"># Remove/erase package</span>
<span class="cmd">rpm</span> <span class="flag">-Uvh</span> <span class="path">package.rpm</span>      <span class="comment"># Upgrade package</span></pre></div>
  </div>
  <div class="tab-content" id="tab-apt">
    <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="cmd">apt</span> <span class="flag">update</span>                  <span class="comment"># Update package index</span>
<span class="cmd">apt</span> <span class="flag">install</span> <span class="path">nginx</span>          <span class="comment"># Install package</span>
<span class="cmd">apt</span> <span class="flag">remove</span> <span class="path">nginx</span>           <span class="comment"># Remove package</span>
<span class="cmd">apt</span> <span class="flag">upgrade</span>                 <span class="comment"># Upgrade all packages</span>
<span class="cmd">apt</span> <span class="flag">search</span> <span class="path">nginx</span>           <span class="comment"># Search packages</span>
<span class="cmd">dpkg</span> <span class="flag">-i</span> <span class="path">package.deb</span>        <span class="comment"># Install .deb file manually</span>
<span class="cmd">dpkg</span> <span class="flag">-l</span>                     <span class="comment"># List all installed packages</span></pre></div>
  </div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🗜️</span> File Compression & Archiving</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># tar — Tape ARchive (most common in Linux)</span>
<span class="cmd">tar</span> <span class="flag">-cvf</span> <span class="path">archive.tar</span> <span class="path">folder/</span>       <span class="comment"># Create tar archive</span>
<span class="cmd">tar</span> <span class="flag">-czvf</span> <span class="path">archive.tar.gz</span> <span class="path">folder/</span>   <span class="comment"># Create compressed tar (gzip)</span>
<span class="cmd">tar</span> <span class="flag">-xzvf</span> <span class="path">archive.tar.gz</span>           <span class="comment"># Extract compressed tar</span>
<span class="cmd">tar</span> <span class="flag">-tvf</span> <span class="path">archive.tar.gz</span>            <span class="comment"># List contents without extracting</span>
<span class="cmd">tar</span> <span class="flag">-xzvf</span> <span class="path">archive.tar.gz</span> <span class="flag">-C</span> <span class="path">/opt/</span> <span class="comment"># Extract to specific directory</span>

<span class="comment"># gzip / gunzip</span>
<span class="cmd">gzip</span> <span class="path">file.txt</span>               <span class="comment"># Compress file → file.txt.gz (original deleted)</span>
<span class="cmd">gunzip</span> <span class="path">file.txt.gz</span>          <span class="comment"># Decompress</span>
<span class="cmd">gzip</span> <span class="flag">-k</span> <span class="path">file.txt</span>            <span class="comment"># Compress but keep original</span>

<span class="comment"># zip / unzip (compatible with Windows)</span>
<span class="cmd">zip</span> <span class="flag">-r</span> <span class="path">backup.zip</span> <span class="path">folder/</span>  <span class="comment"># Create zip archive</span>
<span class="cmd">unzip</span> <span class="path">backup.zip</span>            <span class="comment"># Extract zip</span>
<span class="cmd">unzip</span> <span class="flag">-l</span> <span class="path">backup.zip</span>        <span class="comment"># List contents</span></pre></div>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Remember:</strong> <code class="code-inline">tar -czvf</code> = <strong>C</strong>reate <strong>Z</strong>ip(gzip) <strong>V</strong>erbose <strong>F</strong>ile. Think: "<em>Create Ze Verbose File!</em>"</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔀</span> RHEL 6 vs 7 vs 8 vs 9 Comparison</h2>
  <table class="styled-table">
    <thead><tr><th>Feature</th><th>RHEL 6</th><th>RHEL 7</th><th>RHEL 8</th><th>RHEL 9</th></tr></thead>
    <tbody>
      <tr><td><strong>Init System</strong></td><td>SysVinit (init)</td><td>Systemd</td><td>Systemd</td><td>Systemd</td></tr>
      <tr><td><strong>Package Manager</strong></td><td>yum</td><td>yum</td><td>dnf</td><td>dnf</td></tr>
      <tr><td><strong>Default FS</strong></td><td>ext4</td><td>XFS</td><td>XFS</td><td>XFS</td></tr>
      <tr><td><strong>Firewall</strong></td><td>iptables</td><td>firewalld</td><td>firewalld+nftables</td><td>firewalld+nftables</td></tr>
      <tr><td><strong>Network Config</strong></td><td>network scripts</td><td>NetworkManager</td><td>NetworkManager</td><td>NetworkManager</td></tr>
      <tr><td><strong>Kernel</strong></td><td>2.6.x</td><td>3.10.x</td><td>4.18.x</td><td>5.14.x</td></tr>
      <tr><td><strong>Python</strong></td><td>2.6</td><td>2.7</td><td>3.6</td><td>3.9</td></tr>
      <tr><td><strong>EOL</strong></td><td>Nov 2020</td><td>Jun 2024</td><td>May 2029</td><td>May 2032</td></tr>
    </tbody>
  </table>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">💻</span> 3 Installation Methods</h2>
  <p><strong>1. Minimal Install</strong> — Command-line only, no GUI. Best for servers. Smallest footprint (~1GB). You add only what you need.</p>
  <p><strong>2. GUI Install (Server with GUI)</strong> — Includes GNOME desktop. Good for learning. Uses more resources (~4GB+).</p>
  <p><strong>3. Kickstart (Automated)</strong> — Unattended install using a config file. Used in enterprises to deploy 100+ servers identically.</p>
  <div class="code-block"><div class="code-header"><span class="lang">kickstart example</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Sample Kickstart snippet (ks.cfg)</span>
<span class="keyword">lang</span> en_US.UTF-8
<span class="keyword">keyboard</span> us
<span class="keyword">timezone</span> Asia/Kolkata --isUtc
<span class="keyword">rootpw</span> --iscrypted $6$rounds=...
<span class="keyword">bootloader</span> --location=mbr
<span class="keyword">autopart</span> --type=lvm
<span class="keyword">%packages</span>
@core
vim
wget
curl
<span class="keyword">%end</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧪</span> Hands-on Lab</h2>
  <ol class="lab-steps">
    <li>Open a terminal on your Linux VM</li>
    <li>Navigate: <code class="code-inline">cd /tmp && mkdir -p lab/project/{src,docs,config}</code></li>
    <li>Create files: <code class="code-inline">touch lab/project/src/{main.sh,utils.sh} lab/project/docs/readme.txt</code></li>
    <li>View structure: <code class="code-inline">tree lab/</code> (install with <code class="code-inline">yum install tree</code>)</li>
    <li>Check disk: <code class="code-inline">df -h</code> and memory: <code class="code-inline">free -h</code></li>
    <li>Check IP: <code class="code-inline">ip addr show</code> and connectivity: <code class="code-inline">ping -c 2 google.com</code></li>
    <li>Install a package: <code class="code-inline">sudo dnf install -y wget</code></li>
    <li>Create an archive: <code class="code-inline">tar -czvf lab-backup.tar.gz lab/</code></li>
    <li>List archive contents: <code class="code-inline">tar -tvf lab-backup.tar.gz</code></li>
    <li>Clean up: <code class="code-inline">rm -rf lab/ lab-backup.tar.gz</code></li>
  </ol>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🎯</span> Interview Questions</h2>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is the difference between absolute and relative path?<span class="arrow-acc">▼</span></button><div class="accordion-body"><strong>Absolute path</strong> starts from root <code class="code-inline">/</code> (e.g., <code class="code-inline">/var/log/messages</code>). <strong>Relative path</strong> starts from current directory (e.g., <code class="code-inline">../log/messages</code>). Absolute always works from anywhere; relative depends on where you are.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What does the command df -h show?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">df -h</code> shows disk filesystem usage in human-readable format — total size, used, available, and mount point for each partition.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> Difference between yum and rpm?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">yum/dnf</code> automatically resolves and installs dependencies from repositories. <code class="code-inline">rpm</code> installs/removes individual packages without handling dependencies. Use yum/dnf in production, rpm for offline installs.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How to check which process is using the most CPU?<span class="arrow-acc">▼</span></button><div class="accordion-body">Use <code class="code-inline">top</code> and press <code class="code-inline">P</code> to sort by CPU. Or use <code class="code-inline">ps aux --sort=-%cpu | head -10</code> for a one-shot view of top 10 CPU consumers.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is the difference between tar.gz and zip?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">tar.gz</code> first archives (tar) then compresses (gzip) — native to Linux, preserves permissions. <code class="code-inline">zip</code> archives and compresses in one step — cross-platform compatible with Windows. For Linux servers, tar.gz is standard.</div></div>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  {title:'Basic Linux Commands', section:'Linux Basics'},
  {title:'Navigating Filesystem - cd, ls, pwd', section:'Linux Basics'},
  {title:'Managing Files - cat, cp, mv, rm', section:'Linux Basics'},
  {title:'System Monitoring - top, free, df', section:'Linux Basics'},
  {title:'Network Commands - ip, ping, ss', section:'Linux Basics'},
  {title:'Package Management - yum, dnf, rpm', section:'Linux Basics'},
  {title:'File Compression - tar, gzip, zip', section:'Linux Basics'},
  {title:'RHEL 6 7 8 9 Comparison', section:'Linux Basics'},
  {title:'Kickstart Installation', section:'Linux Basics'}
]);

window.LM = window.LM || { pages: {}, searchIndex: [] };
window.LM.registerPage('backup', `
<h1 class="page-title">Backup: Cp, Mv & Rsync</h1>
<p class="page-subtitle">Copy, move, and sync files locally and remotely — essential for data protection</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📋</span> Copying Files & Directories with Cp</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    <code class="code-inline">cp</code> is like a <strong>photocopy machine</strong> — it makes a duplicate. The original stays, and you get a copy. Use <code class="code-inline">-p</code> to keep the "date stamp" on the copy (preserve metadata).
  </div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Basic copy</span>
<span class="cmd">cp</span> <span class="path">file.txt</span> <span class="path">file_backup.txt</span>                <span class="comment"># Copy single file</span>
<span class="cmd">cp</span> <span class="path">file1.txt</span> <span class="path">file2.txt</span> <span class="path">/backup/</span>            <span class="comment"># Copy multiple files to directory</span>

<span class="comment"># Copy directories (MUST use -r)</span>
<span class="cmd">cp</span> <span class="flag">-r</span> <span class="path">/etc/nginx/</span> <span class="path">/backup/nginx_backup/</span>    <span class="comment"># Copy entire directory</span>

<span class="comment"># Preserve permissions, timestamps, ownership</span>
<span class="cmd">cp</span> <span class="flag">-p</span> <span class="path">file.txt</span> <span class="path">/backup/</span>                     <span class="comment"># Preserve metadata</span>
<span class="cmd">cp</span> <span class="flag">-a</span> <span class="path">/var/www/</span> <span class="path">/backup/www_backup/</span>          <span class="comment"># Archive mode (-a = -rpL): best for backups</span>

<span class="comment"># Interactive & verbose</span>
<span class="cmd">cp</span> <span class="flag">-i</span> <span class="path">file.txt</span> <span class="path">/backup/</span>                     <span class="comment"># Ask before overwriting</span>
<span class="cmd">cp</span> <span class="flag">-v</span> <span class="path">file.txt</span> <span class="path">/backup/</span>                     <span class="comment"># Verbose: show what's being copied</span>
<span class="cmd">cp</span> <span class="flag">-u</span> <span class="path">*.conf</span> <span class="path">/backup/</span>                       <span class="comment"># Update: only copy if source is newer</span>

<span class="comment"># Real-world: Backup config before changes</span>
<span class="cmd">cp</span> <span class="flag">-a</span> <span class="path">/etc/httpd/conf/httpd.conf</span> <span class="path">/etc/httpd/conf/httpd.conf.bak.$(date +%F)</span></pre></div>
  <div class="info-box warning"><span class="info-icon">⚠️</span><div><strong>Common Mistake:</strong> Forgetting <code class="code-inline">-r</code> when copying directories — <code class="code-inline">cp /etc/nginx /backup/</code> will fail! Always use <code class="code-inline">cp -r</code> or <code class="code-inline">cp -a</code> for directories.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🚚</span> Moving & Migrating Data with Mv</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    <code class="code-inline">mv</code> is like <strong>physically moving furniture</strong> — the item is gone from the old location and appears in the new one. It's also used to <strong>rename</strong> files (like changing a name plate on a door).
  </div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Rename a file</span>
<span class="cmd">mv</span> <span class="path">oldname.txt</span> <span class="path">newname.txt</span>

<span class="comment"># Move file to another directory</span>
<span class="cmd">mv</span> <span class="path">report.pdf</span> <span class="path">/home/john/documents/</span>

<span class="comment"># Move multiple files</span>
<span class="cmd">mv</span> <span class="path">*.log</span> <span class="path">/var/log/archive/</span>

<span class="comment"># Move entire directory</span>
<span class="cmd">mv</span> <span class="path">/old/data/</span> <span class="path">/new/location/data/</span>

<span class="comment"># Safe move (ask before overwrite)</span>
<span class="cmd">mv</span> <span class="flag">-i</span> <span class="path">file.txt</span> <span class="path">/destination/</span>

<span class="comment"># Verbose (show what's being moved)</span>
<span class="cmd">mv</span> <span class="flag">-v</span> <span class="path">*.conf</span> <span class="path">/backup/configs/</span>

<span class="comment"># Real-world: Migrate data between disks</span>
<span class="comment"># Step 1: Mount new disk</span>
<span class="cmd">mount</span> <span class="path">/dev/sdb1</span> <span class="path">/mnt/newdisk</span>
<span class="comment"># Step 2: Move data</span>
<span class="cmd">mv</span> <span class="path">/var/lib/mysql/*</span> <span class="path">/mnt/newdisk/mysql/</span>
<span class="comment"># Step 3: Create symlink for compatibility</span>
<span class="cmd">ln</span> <span class="flag">-s</span> <span class="path">/mnt/newdisk/mysql</span> <span class="path">/var/lib/mysql</span></pre></div>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Pro Tip:</strong> Moving within the same filesystem is instant (just updates the directory entry). Moving across filesystems is slow (copies then deletes). For large data across disks, use <code class="code-inline">rsync</code> instead.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔄</span> Rsync — The Backup Powerhouse</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    <code class="code-inline">rsync</code> is like a <strong>smart moving company</strong> — it checks what's already at the destination and only moves the NEW or CHANGED items. If you're moving 1000 books and 990 are already there, it only moves the 10 new ones. This saves massive time and bandwidth.
  </div>

  <h3>Local Synchronization</h3>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Basic local sync</span>
<span class="cmd">rsync</span> <span class="flag">-av</span> <span class="path">/source/dir/</span> <span class="path">/backup/dir/</span>
<span class="comment"># -a = archive mode (preserves permissions, timestamps, symlinks)</span>
<span class="comment"># -v = verbose</span>

<span class="comment"># With progress bar</span>
<span class="cmd">rsync</span> <span class="flag">-av --progress</span> <span class="path">/source/</span> <span class="path">/backup/</span>

<span class="comment"># Delete files in destination that don't exist in source (mirror)</span>
<span class="cmd">rsync</span> <span class="flag">-av --delete</span> <span class="path">/source/</span> <span class="path">/backup/</span>

<span class="comment"># Dry run — see what WOULD happen without actually doing it</span>
<span class="cmd">rsync</span> <span class="flag">-av --dry-run</span> <span class="path">/source/</span> <span class="path">/backup/</span>

<span class="comment"># Exclude certain files</span>
<span class="cmd">rsync</span> <span class="flag">-av --exclude='*.tmp' --exclude='.git'</span> <span class="path">/source/</span> <span class="path">/backup/</span></pre></div>

  <h3>Remote Synchronization (over SSH)</h3>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Push: Local → Remote server</span>
<span class="cmd">rsync</span> <span class="flag">-avz</span> <span class="path">/var/www/</span> <span class="path">user@remote-server:/backup/www/</span>
<span class="comment"># -z = compress during transfer (saves bandwidth)</span>

<span class="comment"># Pull: Remote server → Local</span>
<span class="cmd">rsync</span> <span class="flag">-avz</span> <span class="path">user@remote-server:/var/log/</span> <span class="path">/local/backup/logs/</span>

<span class="comment"># With specific SSH port</span>
<span class="cmd">rsync</span> <span class="flag">-avz -e 'ssh -p 2222'</span> <span class="path">/data/</span> <span class="path">user@server:/backup/</span>

<span class="comment"># Bandwidth limit (useful for production servers)</span>
<span class="cmd">rsync</span> <span class="flag">-avz --bwlimit=5000</span> <span class="path">/data/</span> <span class="path">user@server:/backup/</span>
<span class="comment"># --bwlimit=5000 = limit to 5000 KB/s</span></pre></div>
  <div class="info-box warning"><span class="info-icon">⚠️</span><div><strong>Trailing Slash Matters!</strong><br>
  <code class="code-inline">rsync -av /source/ /dest/</code> → copies CONTENTS of source into dest<br>
  <code class="code-inline">rsync -av /source /dest/</code> → copies the source DIRECTORY itself into dest<br>
  This is the #1 rsync mistake!</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">💼</span> Backup to External Storage</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash — production backup script</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment">#!/bin/bash</span>
<span class="comment"># Daily backup script using rsync</span>
<span class="keyword">BACKUP_SRC</span>=<span class="string">"/var/www /etc /home"</span>
<span class="keyword">BACKUP_DST</span>=<span class="string">"/mnt/external/backup/$(date +%F)"</span>
<span class="keyword">LOG</span>=<span class="string">"/var/log/backup.log"</span>

<span class="cmd">mkdir</span> <span class="flag">-p</span> <span class="path">$BACKUP_DST</span>

<span class="keyword">echo</span> <span class="string">"=== Backup started: $(date) ==="</span> >> <span class="path">$LOG</span>

<span class="keyword">for</span> dir <span class="keyword">in</span> $BACKUP_SRC; <span class="keyword">do</span>
    <span class="cmd">rsync</span> <span class="flag">-av --delete</span> <span class="path">$dir</span> <span class="path">$BACKUP_DST/</span> >> <span class="path">$LOG</span> 2>&1
<span class="keyword">done</span>

<span class="comment"># Remove backups older than 30 days</span>
<span class="cmd">find</span> <span class="path">/mnt/external/backup/</span> <span class="flag">-maxdepth 1 -type d -mtime +30</span> <span class="flag">-exec</span> <span class="cmd">rm</span> <span class="flag">-rf</span> {} \\;

<span class="keyword">echo</span> <span class="string">"=== Backup completed: $(date) ==="</span> >> <span class="path">$LOG</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔀</span> Cp vs Mv vs Rsync — When to Use What</h2>
  <table class="styled-table">
    <thead><tr><th>Scenario</th><th>Use</th><th>Why</th></tr></thead>
    <tbody>
      <tr><td>Quick config backup</td><td><code class="code-inline">cp -a</code></td><td>Simple, preserves permissions</td></tr>
      <tr><td>Rename a file</td><td><code class="code-inline">mv</code></td><td>Only way to rename</td></tr>
      <tr><td>Move data to new disk</td><td><code class="code-inline">rsync + rm</code></td><td>Safer than mv for large data; can resume</td></tr>
      <tr><td>Daily backup to remote</td><td><code class="code-inline">rsync -avz</code></td><td>Only sends changes, saves bandwidth</td></tr>
      <tr><td>Mirror two directories</td><td><code class="code-inline">rsync --delete</code></td><td>Keeps exact copy, removes deleted files</td></tr>
      <tr><td>Copy between partitions</td><td><code class="code-inline">rsync -av</code></td><td>Shows progress, can resume if interrupted</td></tr>
    </tbody>
  </table>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧪</span> Hands-on Lab</h2>
  <ol class="lab-steps">
    <li>Create test data: <code class="code-inline">mkdir -p /tmp/lab/{src,dest} && echo "hello" > /tmp/lab/src/file{1..5}.txt</code></li>
    <li>Copy with cp: <code class="code-inline">cp -av /tmp/lab/src/ /tmp/lab/cp_backup/</code></li>
    <li>Rename a file: <code class="code-inline">mv /tmp/lab/src/file1.txt /tmp/lab/src/renamed.txt</code></li>
    <li>Rsync first sync: <code class="code-inline">rsync -av --progress /tmp/lab/src/ /tmp/lab/dest/</code></li>
    <li>Add a new file: <code class="code-inline">echo "new data" > /tmp/lab/src/file6.txt</code></li>
    <li>Rsync again (notice only file6 transfers): <code class="code-inline">rsync -av --progress /tmp/lab/src/ /tmp/lab/dest/</code></li>
    <li>Try dry run: <code class="code-inline">rsync -av --dry-run --delete /tmp/lab/src/ /tmp/lab/dest/</code></li>
    <li>Clean up: <code class="code-inline">rm -rf /tmp/lab</code></li>
  </ol>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🎯</span> Interview Questions</h2>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is the difference between cp and rsync?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">cp</code> always copies everything (full copy). <code class="code-inline">rsync</code> uses delta-transfer algorithm — only copies changed files. Rsync is much faster for repeated backups and can work over SSH for remote servers.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How do you perform a backup to a remote server?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">rsync -avz /local/path/ user@remote:/backup/path/</code> — Uses SSH for encryption, <code class="code-inline">-z</code> compresses data during transfer, <code class="code-inline">-a</code> preserves all metadata. Set up SSH key auth for unattended cron backups.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What does the trailing slash mean in rsync?<span class="arrow-acc">▼</span></button><div class="accordion-body">With trailing slash <code class="code-inline">/source/</code>: copies the CONTENTS of source. Without <code class="code-inline">/source</code>: copies the directory ITSELF. Example: <code class="code-inline">rsync -a /data/ /backup/</code> puts files directly in /backup. <code class="code-inline">rsync -a /data /backup/</code> creates /backup/data/.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How would you migrate data from one disk to another?<span class="arrow-acc">▼</span></button><div class="accordion-body">1) Mount new disk. 2) <code class="code-inline">rsync -av /old/path/ /new/path/</code>. 3) Verify with <code class="code-inline">diff -r</code>. 4) Update /etc/fstab. 5) Unmount old, mount new at original path. Using rsync is safer than mv because it can resume if interrupted.</div></div>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  {title:'cp command copy files', section:'Linux Basics'},
  {title:'mv command move rename', section:'Linux Basics'},
  {title:'rsync backup sync', section:'Linux Basics'},
  {title:'Remote backup rsync SSH', section:'Linux Basics'},
  {title:'rsync trailing slash', section:'Linux Basics'},
  {title:'Backup script Linux', section:'Linux Basics'},
  {title:'Migrate data between disks', section:'Linux Basics'}
]);

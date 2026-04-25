window.LM = window.LM || { pages: {}, searchIndex: [] };
window.LM.registerPage('find-grep', `
<h1 class="page-title">Find / Locate / Grep</h1>
<p class="page-subtitle">Search for files and text like a pro — essential skills for every Linux admin</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔍</span> FIND — Search Files by Name, Type, Size, Time</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    <code class="code-inline">find</code> is like a <strong>detective with a magnifying glass</strong> — it physically walks through every room (directory) looking for what you need. Thorough but can be slow on large filesystems.
  </div>

  <h3 style="margin-top:1rem;">Basic File Searching</h3>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Find by name</span>
<span class="cmd">find</span> <span class="path">/etc</span> <span class="flag">-name</span> <span class="string">"hosts"</span>              <span class="comment"># Exact name (case-sensitive)</span>
<span class="cmd">find</span> <span class="path">/etc</span> <span class="flag">-iname</span> <span class="string">"*.CONF"</span>            <span class="comment"># Case-insensitive</span>
<span class="cmd">find</span> <span class="path">/home</span> <span class="flag">-name</span> <span class="string">"*.log"</span>             <span class="comment"># Find all .log files</span>
<span class="cmd">find</span> <span class="path">/</span> <span class="flag">-name</span> <span class="string">"sshd_config"</span> <span class="num">2>/dev/null</span>  <span class="comment"># Search everywhere, hide errors</span></pre></div>

  <h3>Searching by File Type</h3>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="cmd">find</span> <span class="path">/var</span> <span class="flag">-type f</span>                    <span class="comment"># Regular files only</span>
<span class="cmd">find</span> <span class="path">/var</span> <span class="flag">-type d</span>                    <span class="comment"># Directories only</span>
<span class="cmd">find</span> <span class="path">/dev</span> <span class="flag">-type l</span>                    <span class="comment"># Symbolic links only</span>
<span class="cmd">find</span> <span class="path">/var</span> <span class="flag">-type f -name</span> <span class="string">"*.log"</span>     <span class="comment"># Combine: files named *.log</span></pre></div>

  <h3>Advanced Searching (Size, Time, Permissions)</h3>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># By size</span>
<span class="cmd">find</span> <span class="path">/var</span> <span class="flag">-size +100M</span>               <span class="comment"># Files larger than 100MB</span>
<span class="cmd">find</span> <span class="path">/tmp</span> <span class="flag">-size -1k</span>                <span class="comment"># Files smaller than 1KB</span>
<span class="cmd">find</span> <span class="path">/</span> <span class="flag">-size +1G</span> <span class="flag">-type f</span>           <span class="comment"># Files over 1GB (disk hogs!)</span>

<span class="comment"># By modification time</span>
<span class="cmd">find</span> <span class="path">/etc</span> <span class="flag">-mtime -7</span>                <span class="comment"># Modified in last 7 days</span>
<span class="cmd">find</span> <span class="path">/var/log</span> <span class="flag">-mtime +30</span>           <span class="comment"># Modified more than 30 days ago</span>
<span class="cmd">find</span> <span class="path">/tmp</span> <span class="flag">-mmin -60</span>               <span class="comment"># Modified in last 60 minutes</span>

<span class="comment"># By permissions</span>
<span class="cmd">find</span> <span class="path">/</span> <span class="flag">-perm -4000</span> <span class="flag">-type f</span>        <span class="comment"># Find SUID files (security audit!)</span>
<span class="cmd">find</span> <span class="path">/</span> <span class="flag">-perm 777</span> <span class="flag">-type f</span>          <span class="comment"># World-writable files (security risk!)</span>
<span class="cmd">find</span> <span class="path">/home</span> <span class="flag">-nouser</span>                 <span class="comment"># Files with no owner (orphaned)</span>

<span class="comment"># By user/group</span>
<span class="cmd">find</span> <span class="path">/home</span> <span class="flag">-user john</span>               <span class="comment"># Files owned by john</span>
<span class="cmd">find</span> <span class="path">/var</span> <span class="flag">-group devops</span>             <span class="comment"># Files owned by devops group</span>

<span class="comment"># Execute command on results</span>
<span class="cmd">find</span> <span class="path">/tmp</span> <span class="flag">-name</span> <span class="string">"*.tmp"</span> <span class="flag">-delete</span>   <span class="comment"># Delete matching files</span>
<span class="cmd">find</span> <span class="path">/var/log</span> <span class="flag">-name</span> <span class="string">"*.log"</span> <span class="flag">-exec</span> <span class="cmd">ls</span> <span class="flag">-lh</span> {} \\;  <span class="comment"># Run ls on each result</span>
<span class="cmd">find</span> <span class="path">/opt</span> <span class="flag">-type f -name</span> <span class="string">"*.sh"</span> <span class="flag">-exec</span> <span class="cmd">chmod</span> <span class="num">755</span> {} \\;  <span class="comment"># Make all .sh files executable</span></pre></div>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Production Tip:</strong> When disk is full, quickly find large files: <code class="code-inline">find / -type f -size +100M -exec ls -lh {} \\; 2>/dev/null | sort -k5 -h</code></div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📍</span> LOCATE — Fast File Search</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    <code class="code-inline">locate</code> is like using the <strong>index at the back of a book</strong> — instant lookup, but the index might be outdated. <code class="code-inline">find</code> is like reading every page.
  </div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Install locate (if not available)</span>
<span class="cmd">yum</span> <span class="flag">install</span> <span class="path">mlocate</span>
<span class="cmd">updatedb</span>                             <span class="comment"># Build/update the file database</span>

<span class="comment"># Basic search</span>
<span class="cmd">locate</span> <span class="path">httpd.conf</span>                   <span class="comment"># Find all paths containing "httpd.conf"</span>
<span class="cmd">locate</span> <span class="flag">-i</span> <span class="path">readme</span>                   <span class="comment"># Case-insensitive search</span>

<span class="comment"># Limit results</span>
<span class="cmd">locate</span> <span class="flag">-n 5</span> <span class="path">"*.conf"</span>               <span class="comment"># Show only first 5 results</span>

<span class="comment"># Filter to specific directory</span>
<span class="cmd">locate</span> <span class="path">httpd</span> | <span class="cmd">grep</span> <span class="path">/etc</span>          <span class="comment"># Only results in /etc</span>

<span class="comment"># Count matches</span>
<span class="cmd">locate</span> <span class="flag">-c</span> <span class="string">"*.log"</span>                  <span class="comment"># Count how many .log files exist</span></pre></div>
  <div class="info-box warning"><span class="info-icon">⚠️</span><div><strong>Important:</strong> <code class="code-inline">locate</code> uses a pre-built database. Newly created files won't show until you run <code class="code-inline">updatedb</code>. The database auto-updates daily via cron.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📝</span> GREP — Search Inside Files</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    <code class="code-inline">grep</code> is like using <strong>Ctrl+F in a document</strong> — but for the entire server. It searches the <em>contents</em> of files for text patterns.
  </div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Basic text search</span>
<span class="cmd">grep</span> <span class="string">"error"</span> <span class="path">/var/log/messages</span>          <span class="comment"># Find "error" in log file</span>
<span class="cmd">grep</span> <span class="flag">-i</span> <span class="string">"error"</span> <span class="path">/var/log/messages</span>       <span class="comment"># Case-insensitive</span>
<span class="cmd">grep</span> <span class="flag">-n</span> <span class="string">"error"</span> <span class="path">file.txt</span>               <span class="comment"># Show line numbers</span>
<span class="cmd">grep</span> <span class="flag">-c</span> <span class="string">"error"</span> <span class="path">file.txt</span>               <span class="comment"># Count matching lines</span>
<span class="cmd">grep</span> <span class="flag">-v</span> <span class="string">"comment"</span> <span class="path">file.conf</span>            <span class="comment"># Show lines NOT matching (invert)</span>

<span class="comment"># Search in multiple files</span>
<span class="cmd">grep</span> <span class="string">"Failed"</span> <span class="path">/var/log/*.log</span>            <span class="comment"># Search all .log files</span>
<span class="cmd">grep</span> <span class="flag">-l</span> <span class="string">"password"</span> <span class="path">/etc/*</span>              <span class="comment"># List filenames that contain match</span>

<span class="comment"># Recursive search (search in all subdirectories)</span>
<span class="cmd">grep</span> <span class="flag">-r</span> <span class="string">"ServerName"</span> <span class="path">/etc/httpd/</span>       <span class="comment"># Search all files in directory tree</span>
<span class="cmd">grep</span> <span class="flag">-ri</span> <span class="string">"listen"</span> <span class="path">/etc/nginx/</span>          <span class="comment"># Recursive + case-insensitive</span>

<span class="comment"># Search system logs (real-world scenarios)</span>
<span class="cmd">grep</span> <span class="string">"Failed password"</span> <span class="path">/var/log/secure</span>   <span class="comment"># Find failed SSH logins</span>
<span class="cmd">grep</span> <span class="string">"Out of memory"</span> <span class="path">/var/log/messages</span>  <span class="comment"># Find OOM killer events</span>
<span class="cmd">grep</span> <span class="flag">-E</span> <span class="string">"error|fail|critical"</span> <span class="path">/var/log/messages</span>  <span class="comment"># Multiple patterns (OR)</span>

<span class="comment"># Show context around matches</span>
<span class="cmd">grep</span> <span class="flag">-A 3</span> <span class="string">"error"</span> <span class="path">log.txt</span>    <span class="comment"># 3 lines After match</span>
<span class="cmd">grep</span> <span class="flag">-B 3</span> <span class="string">"error"</span> <span class="path">log.txt</span>    <span class="comment"># 3 lines Before match</span>
<span class="cmd">grep</span> <span class="flag">-C 3</span> <span class="string">"error"</span> <span class="path">log.txt</span>    <span class="comment"># 3 lines before AND after (Context)</span>

<span class="comment"># Useful with pipes</span>
<span class="cmd">ps</span> <span class="flag">aux</span> | <span class="cmd">grep</span> <span class="string">"httpd"</span>                 <span class="comment"># Find running Apache processes</span>
<span class="cmd">cat</span> <span class="path">/etc/passwd</span> | <span class="cmd">grep</span> <span class="string">"bash"</span>         <span class="comment"># Users with bash shell</span>
<span class="cmd">dmesg</span> | <span class="cmd">grep</span> <span class="flag">-i</span> <span class="string">"error"</span>               <span class="comment"># Kernel errors</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔀</span> Comparison: find vs locate vs grep</h2>
  <table class="styled-table">
    <thead><tr><th>Feature</th><th>find</th><th>locate</th><th>grep</th></tr></thead>
    <tbody>
      <tr><td><strong>Searches</strong></td><td>File names & attributes</td><td>File names</td><td>File contents</td></tr>
      <tr><td><strong>Speed</strong></td><td>Slow (scans disk)</td><td>Very fast (uses database)</td><td>Moderate</td></tr>
      <tr><td><strong>Real-time</strong></td><td>✅ Yes</td><td>❌ No (needs updatedb)</td><td>✅ Yes</td></tr>
      <tr><td><strong>Best for</strong></td><td>Complex searches (size, time, perms)</td><td>Quick file lookup</td><td>Searching text in files/logs</td></tr>
    </tbody>
  </table>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧪</span> Hands-on Lab</h2>
  <ol class="lab-steps">
    <li>Find all .conf files in /etc: <code class="code-inline">find /etc -name "*.conf" -type f | head -20</code></li>
    <li>Find files larger than 10MB: <code class="code-inline">find /var -size +10M -type f 2>/dev/null</code></li>
    <li>Find files modified today: <code class="code-inline">find /etc -mtime 0 -type f</code></li>
    <li>Search for "root" in /etc/passwd: <code class="code-inline">grep "root" /etc/passwd</code></li>
    <li>Find failed logins: <code class="code-inline">grep -i "failed" /var/log/secure 2>/dev/null | tail -5</code></li>
    <li>Recursive grep: <code class="code-inline">grep -r "Listen" /etc/httpd/ 2>/dev/null</code></li>
    <li>Use locate: <code class="code-inline">sudo updatedb && locate passwd</code></li>
    <li>Combine find + grep: <code class="code-inline">find /etc -name "*.conf" -exec grep -l "port" {} \\;</code></li>
  </ol>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🎯</span> Interview Questions</h2>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How do you find all files larger than 100MB on a server?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">find / -type f -size +100M -exec ls -lh {} \\; 2>/dev/null</code> — This is critical when disk is full. Sort by size: pipe to <code class="code-inline">sort -k5 -h</code></div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> Difference between find and locate?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">find</code> searches the filesystem in real-time (slow but always current). <code class="code-inline">locate</code> searches a pre-built database (fast but may be outdated). Run <code class="code-inline">updatedb</code> to refresh locate's database.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How to search for a pattern in all files recursively?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">grep -r "pattern" /path/to/directory</code> — Add <code class="code-inline">-i</code> for case-insensitive, <code class="code-inline">-l</code> to show only filenames, <code class="code-inline">-n</code> for line numbers.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How do you find files modified in the last 24 hours?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">find /path -mtime 0</code> (0 = within last 24 hours). For last 7 days: <code class="code-inline">find /path -mtime -7</code>. For more than 30 days old: <code class="code-inline">find /path -mtime +30</code></div></div>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  {title:'find command Linux', section:'Linux Basics'},
  {title:'locate command updatedb', section:'Linux Basics'},
  {title:'grep search text files', section:'Linux Basics'},
  {title:'Find files by size type time', section:'Linux Basics'},
  {title:'grep recursive search logs', section:'Linux Basics'},
  {title:'find vs locate vs grep', section:'Linux Basics'}
]);

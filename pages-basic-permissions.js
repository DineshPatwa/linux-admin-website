window.LM = window.LM || { pages: {}, searchIndex: [] };
window.LM.registerPage('permissions', `
<h1 class="page-title">Ownership & Permissions</h1>
<p class="page-subtitle">Control who can read, write, and execute files — the foundation of Linux security</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">👥</span> Creating & Managing Users and Groups</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    Think of Linux like an <strong>office building</strong>. Each <strong>user</strong> is an employee with their own desk (home directory). A <strong>group</strong> is a department (HR, IT, Finance). Permissions are like <strong>key cards</strong> — some doors are open to everyone, some only to specific departments, some only to individuals.
  </div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># User management</span>
<span class="cmd">useradd</span> <span class="path">john</span>                    <span class="comment"># Create user</span>
<span class="cmd">useradd</span> <span class="flag">-m -s /bin/bash</span> <span class="path">john</span>  <span class="comment"># Create with home dir + bash shell</span>
<span class="cmd">passwd</span> <span class="path">john</span>                     <span class="comment"># Set password</span>
<span class="cmd">usermod</span> <span class="flag">-aG</span> <span class="path">wheel john</span>         <span class="comment"># Add user to sudo group</span>
<span class="cmd">usermod</span> <span class="flag">-L</span> <span class="path">john</span>                <span class="comment"># Lock user account</span>
<span class="cmd">usermod</span> <span class="flag">-U</span> <span class="path">john</span>                <span class="comment"># Unlock user account</span>
<span class="cmd">userdel</span> <span class="flag">-r</span> <span class="path">john</span>                <span class="comment"># Delete user + home directory</span>
<span class="cmd">id</span> <span class="path">john</span>                         <span class="comment"># Show user's UID, GID, groups</span>

<span class="comment"># Group management</span>
<span class="cmd">groupadd</span> <span class="path">devops</span>                  <span class="comment"># Create group</span>
<span class="cmd">usermod</span> <span class="flag">-aG</span> <span class="path">devops john</span>        <span class="comment"># Add user to group (-a = append)</span>
<span class="cmd">gpasswd</span> <span class="flag">-d</span> <span class="path">john devops</span>         <span class="comment"># Remove user from group</span>
<span class="cmd">groups</span> <span class="path">john</span>                      <span class="comment"># Show user's groups</span>
<span class="cmd">cat</span> <span class="path">/etc/passwd</span>                  <span class="comment"># All users</span>
<span class="cmd">cat</span> <span class="path">/etc/group</span>                   <span class="comment"># All groups</span>
<span class="cmd">cat</span> <span class="path">/etc/shadow</span>                  <span class="comment"># Encrypted passwords (root only)</span></pre></div>
  <div class="info-box warning"><span class="info-icon">⚠️</span><div><strong>Common Mistake:</strong> Using <code class="code-inline">usermod -G devops john</code> without <code class="code-inline">-a</code> will REMOVE john from all other groups! Always use <code class="code-inline">-aG</code> (append to groups).</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔐</span> Understanding Permission Symbols</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="cmd">ls</span> <span class="flag">-l</span> <span class="path">/etc/passwd</span>
<span class="output">-rw-r--r--. 1 root root 2388 Apr 10 09:30 /etc/passwd</span>

<span class="comment"># Breaking it down:</span>
<span class="comment"># -   rw-   r--   r--</span>
<span class="comment"># |   |     |     |</span>
<span class="comment"># |   |     |     └── Others (everyone else): read only</span>
<span class="comment"># |   |     └──────── Group (root group): read only</span>
<span class="comment"># |   └────────────── Owner (root user): read + write</span>
<span class="comment"># └────────────────── File type (- = file, d = directory, l = link)</span>

<span class="comment"># Permission values:</span>
<span class="comment"># r (read)    = 4</span>
<span class="comment"># w (write)   = 2</span>
<span class="comment"># x (execute) = 1</span>
<span class="comment"># - (none)    = 0</span></pre></div>

  <table class="styled-table">
    <thead><tr><th>Numeric</th><th>Symbolic</th><th>Meaning</th><th>Use Case</th></tr></thead>
    <tbody>
      <tr><td>755</td><td>rwxr-xr-x</td><td>Owner: all, Group/Others: read+execute</td><td>Scripts, directories</td></tr>
      <tr><td>644</td><td>rw-r--r--</td><td>Owner: read+write, Others: read only</td><td>Config files</td></tr>
      <tr><td>700</td><td>rwx------</td><td>Owner only, full access</td><td>Private scripts, .ssh/</td></tr>
      <tr><td>600</td><td>rw-------</td><td>Owner only, read+write</td><td>SSH keys, secrets</td></tr>
      <tr><td>777</td><td>rwxrwxrwx</td><td>Everyone: full access</td><td>⚠️ NEVER use in production!</td></tr>
    </tbody>
  </table>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🛠️</span> Changing Permissions & Ownership</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># chmod — Change permissions</span>
<span class="cmd">chmod</span> <span class="num">755</span> <span class="path">script.sh</span>           <span class="comment"># Numeric method</span>
<span class="cmd">chmod</span> <span class="flag">u+x</span> <span class="path">script.sh</span>          <span class="comment"># Symbolic: add execute for user(owner)</span>
<span class="cmd">chmod</span> <span class="flag">g+w</span> <span class="path">file.txt</span>           <span class="comment"># Add write for group</span>
<span class="cmd">chmod</span> <span class="flag">o-r</span> <span class="path">secret.txt</span>         <span class="comment"># Remove read for others</span>
<span class="cmd">chmod</span> <span class="flag">a+r</span> <span class="path">public.txt</span>         <span class="comment"># Add read for all (a = all)</span>
<span class="cmd">chmod</span> <span class="flag">-R</span> <span class="num">755</span> <span class="path">directory/</span>      <span class="comment"># Recursive — apply to all files inside</span>

<span class="comment"># chown — Change ownership</span>
<span class="cmd">chown</span> <span class="path">john file.txt</span>           <span class="comment"># Change owner to john</span>
<span class="cmd">chown</span> <span class="path">john:devops file.txt</span>    <span class="comment"># Change owner AND group</span>
<span class="cmd">chown</span> <span class="flag">-R</span> <span class="path">john:devops dir/</span>    <span class="comment"># Recursive ownership change</span>

<span class="comment"># chgrp — Change group only</span>
<span class="cmd">chgrp</span> <span class="path">devops project/</span>        <span class="comment"># Change group of directory</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">⭐</span> Special Permissions: SUID, SGID, Sticky Bit</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># SUID (Set User ID) — File runs as the FILE OWNER, not the user running it</span>
<span class="comment"># Example: /usr/bin/passwd has SUID so normal users can change their password</span>
<span class="cmd">chmod</span> <span class="flag">u+s</span> <span class="path">program</span>       <span class="comment"># Set SUID</span>
<span class="cmd">chmod</span> <span class="num">4755</span> <span class="path">program</span>      <span class="comment"># Set SUID (numeric: 4 prefix)</span>
<span class="cmd">ls</span> <span class="flag">-l</span> <span class="path">/usr/bin/passwd</span>
<span class="output">-rwsr-xr-x   ← notice the 's' in owner execute position</span>

<span class="comment"># SGID (Set Group ID) — New files in directory inherit the directory's group</span>
<span class="cmd">chmod</span> <span class="flag">g+s</span> <span class="path">shared_dir/</span>   <span class="comment"># Set SGID on directory</span>
<span class="cmd">chmod</span> <span class="num">2775</span> <span class="path">shared_dir/</span>  <span class="comment"># Numeric: 2 prefix</span>

<span class="comment"># Sticky Bit — Only file OWNER can delete their files (used on /tmp)</span>
<span class="cmd">chmod</span> <span class="flag">+t</span> <span class="path">/shared</span>        <span class="comment"># Set sticky bit</span>
<span class="cmd">chmod</span> <span class="num">1777</span> <span class="path">/tmp</span>         <span class="comment"># Numeric: 1 prefix</span>
<span class="cmd">ls</span> <span class="flag">-ld</span> <span class="path">/tmp</span>
<span class="output">drwxrwxrwt   ← notice the 't' at the end</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📋</span> Access Control Lists (ACLs)</h2>
  <p>Standard permissions (owner/group/others) are limited. <strong>ACLs</strong> let you give permissions to <em>specific</em> users or groups without changing ownership.</p>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    Standard permissions = a room has ONE key for the owner and ONE key for the department. <strong>ACL</strong> = you can make extra keys for specific people without changing the locks.
  </div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View ACLs</span>
<span class="cmd">getfacl</span> <span class="path">file.txt</span>

<span class="comment"># Give specific user read+write access</span>
<span class="cmd">setfacl</span> <span class="flag">-m</span> <span class="path">u:john:rw</span> <span class="path">file.txt</span>

<span class="comment"># Give specific group read access</span>
<span class="cmd">setfacl</span> <span class="flag">-m</span> <span class="path">g:devops:r</span> <span class="path">file.txt</span>

<span class="comment"># Remove ACL for a user</span>
<span class="cmd">setfacl</span> <span class="flag">-x</span> <span class="path">u:john</span> <span class="path">file.txt</span>

<span class="comment"># Remove ALL ACLs</span>
<span class="cmd">setfacl</span> <span class="flag">-b</span> <span class="path">file.txt</span>

<span class="comment"># Set default ACL on directory (new files inherit it)</span>
<span class="cmd">setfacl</span> <span class="flag">-m</span> <span class="path">d:u:john:rw</span> <span class="path">project/</span>

<span class="comment"># Files with ACLs show a + in ls -l output:</span>
<span class="output">-rw-rw-r--+ 1 root root 0 Apr 10 file.txt</span>
<span class="comment">#          ^ this + means ACL is set</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🛡️</span> Implementing Least Privilege</h2>
  <p><strong>Principle:</strong> Give users the <em>minimum</em> permissions needed to do their job — nothing more.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash — real-world example</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Scenario: Web developer needs to edit website files, not system configs</span>

<span class="comment"># 1. Create a web group</span>
<span class="cmd">groupadd</span> <span class="path">webdev</span>

<span class="comment"># 2. Add developer to the group</span>
<span class="cmd">usermod</span> <span class="flag">-aG</span> <span class="path">webdev sarah</span>

<span class="comment"># 3. Set ownership on web directory</span>
<span class="cmd">chown</span> <span class="flag">-R</span> <span class="path">root:webdev /var/www/html</span>

<span class="comment"># 4. Set permissions: owner=full, group=read+write, others=read</span>
<span class="cmd">chmod</span> <span class="flag">-R</span> <span class="num">775</span> <span class="path">/var/www/html</span>

<span class="comment"># 5. Set SGID so new files inherit webdev group</span>
<span class="cmd">chmod</span> <span class="flag">g+s</span> <span class="path">/var/www/html</span>

<span class="comment"># Now sarah can edit web files but NOT system configs ✅</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔧</span> Troubleshooting Permission Issues</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># "Permission denied" — Check these in order:</span>

<span class="comment"># 1. Who am I and what groups am I in?</span>
<span class="cmd">whoami</span>
<span class="cmd">id</span>
<span class="cmd">groups</span>

<span class="comment"># 2. What are the file permissions?</span>
<span class="cmd">ls</span> <span class="flag">-la</span> <span class="path">filename</span>
<span class="cmd">getfacl</span> <span class="path">filename</span>

<span class="comment"># 3. Check parent directory permissions (need x to traverse)</span>
<span class="cmd">namei</span> <span class="flag">-l</span> <span class="path">/full/path/to/file</span>

<span class="comment"># 4. Check if SELinux is blocking</span>
<span class="cmd">getenforce</span>              <span class="comment"># Is SELinux enabled?</span>
<span class="cmd">ls</span> <span class="flag">-Z</span> <span class="path">filename</span>          <span class="comment"># Check SELinux context</span>
<span class="cmd">ausearch</span> <span class="flag">-m avc</span>         <span class="comment"># Check SELinux denials</span>

<span class="comment"># 5. Check if filesystem is mounted read-only</span>
<span class="cmd">mount</span> | <span class="cmd">grep</span> <span class="path">' / '</span></pre></div>
  <div class="info-box danger"><span class="info-icon">🚫</span><div><strong>Never do this:</strong> <code class="code-inline">chmod -R 777 /</code> — this gives everyone full access to your ENTIRE system. It will break SSH, sudo, and most services.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧪</span> Hands-on Lab</h2>
  <ol class="lab-steps">
    <li>Create two users: <code class="code-inline">sudo useradd -m alice && sudo useradd -m bob</code></li>
    <li>Create a group: <code class="code-inline">sudo groupadd project</code></li>
    <li>Add alice to the group: <code class="code-inline">sudo usermod -aG project alice</code></li>
    <li>Create a shared folder: <code class="code-inline">sudo mkdir /opt/shared</code></li>
    <li>Set ownership: <code class="code-inline">sudo chown root:project /opt/shared</code></li>
    <li>Set permissions with SGID: <code class="code-inline">sudo chmod 2775 /opt/shared</code></li>
    <li>Switch to alice: <code class="code-inline">su - alice</code>, create a file in <code class="code-inline">/opt/shared</code></li>
    <li>Check the file's group (should be "project" due to SGID)</li>
    <li>Try accessing as bob (should fail — bob isn't in the group)</li>
    <li>Give bob ACL access: <code class="code-inline">sudo setfacl -m u:bob:rx /opt/shared</code></li>
    <li>Verify: <code class="code-inline">getfacl /opt/shared</code></li>
  </ol>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🎯</span> Interview Questions</h2>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is the difference between chmod 755 and chmod 644?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">755</code> = owner can read/write/execute, group and others can read/execute. Used for scripts and directories. <code class="code-inline">644</code> = owner can read/write, group and others can only read. Used for regular config files.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is the sticky bit and where is it used?<span class="arrow-acc">▼</span></button><div class="accordion-body">The sticky bit (<code class="code-inline">chmod +t</code>) on a directory means only the file owner can delete their own files, even if others have write access. Classic example: <code class="code-inline">/tmp</code> has sticky bit so users can create files but can't delete others' files.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is the difference between standard permissions and ACLs?<span class="arrow-acc">▼</span></button><div class="accordion-body">Standard permissions only support one owner, one group, and others. ACLs allow fine-grained control — you can grant specific permissions to multiple individual users and groups on the same file.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How to find all SUID files on a system?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">find / -perm -4000 -type f 2>/dev/null</code> — This is a common security audit command. SUID files run as root, so unauthorized SUID files can be security risks.</div></div>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  {title:'Linux Permissions chmod chown', section:'Linux Basics'},
  {title:'User Management useradd usermod', section:'Linux Basics'},
  {title:'Group Management groupadd', section:'Linux Basics'},
  {title:'SUID SGID Sticky Bit', section:'Linux Basics'},
  {title:'ACL setfacl getfacl', section:'Linux Basics'},
  {title:'Least Privilege Principle', section:'Linux Basics'},
  {title:'Troubleshooting Permission Denied', section:'Linux Basics'}
]);

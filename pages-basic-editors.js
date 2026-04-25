window.LM = window.LM || { pages: {}, searchIndex: [] };
window.LM.registerPage('editors', `
<h1 class="page-title">Vi/Vim & Nano Editors</h1>
<p class="page-subtitle">Master Linux text editors — the essential skill every admin needs</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📝</span> Nano Editor (Beginner Friendly)</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    <strong>Nano</strong> is like <strong>Notepad on Windows</strong> — simple, open it, type, save, done. No modes, no learning curve. Great for quick edits.
  </div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="cmd">nano</span> <span class="path">filename.txt</span>         <span class="comment"># Open file in nano</span>
<span class="cmd">nano</span> <span class="flag">+15</span> <span class="path">filename.txt</span>      <span class="comment"># Open at line 15</span>
<span class="cmd">nano</span> <span class="flag">-B</span> <span class="path">filename.txt</span>       <span class="comment"># Create backup before editing</span>

<span class="comment"># Key shortcuts inside nano (^ = Ctrl):</span>
<span class="keyword">Ctrl+O</span>    <span class="comment"># Save file (Write Out)</span>
<span class="keyword">Ctrl+X</span>    <span class="comment"># Exit nano</span>
<span class="keyword">Ctrl+K</span>    <span class="comment"># Cut entire line</span>
<span class="keyword">Ctrl+U</span>    <span class="comment"># Paste line</span>
<span class="keyword">Ctrl+W</span>    <span class="comment"># Search for text</span>
<span class="keyword">Ctrl+\\</span>   <span class="comment"># Search and Replace</span>
<span class="keyword">Ctrl+G</span>    <span class="comment"># Help menu</span>
<span class="keyword">Ctrl+_</span>    <span class="comment"># Go to specific line number</span>
<span class="keyword">Alt+U</span>     <span class="comment"># Undo last action</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">⌨️</span> Vi/Vim Editor — The Power Tool</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    <strong>Vim</strong> is like a <strong>professional power drill</strong> — has a learning curve, but once you master it, you're 10x faster than anyone using a screwdriver (nano). It has different "modes" like a drill has different speeds and bits.
  </div>
  <p><strong>3 Main Modes:</strong></p>
  <table class="styled-table">
    <thead><tr><th>Mode</th><th>Purpose</th><th>How to Enter</th><th>How to Exit</th></tr></thead>
    <tbody>
      <tr><td><strong>Normal (Command)</strong></td><td>Navigate, delete, copy, paste</td><td>Press <code class="code-inline">Esc</code></td><td>—</td></tr>
      <tr><td><strong>Insert</strong></td><td>Type/edit text</td><td>Press <code class="code-inline">i</code>, <code class="code-inline">a</code>, <code class="code-inline">o</code></td><td>Press <code class="code-inline">Esc</code></td></tr>
      <tr><td><strong>Visual</strong></td><td>Select text blocks</td><td>Press <code class="code-inline">v</code>, <code class="code-inline">V</code>, <code class="code-inline">Ctrl+v</code></td><td>Press <code class="code-inline">Esc</code></td></tr>
    </tbody>
  </table>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">✏️</span> Insert Mode — Editing Files</h2>
  <div class="code-block"><div class="code-header"><span class="lang">vim commands</span><button class="copy-btn">📋 Copy</button></div><pre><span class="keyword">i</span>     <span class="comment"># Insert BEFORE cursor (most common)</span>
<span class="keyword">I</span>     <span class="comment"># Insert at BEGINNING of line</span>
<span class="keyword">a</span>     <span class="comment"># Append AFTER cursor</span>
<span class="keyword">A</span>     <span class="comment"># Append at END of line</span>
<span class="keyword">o</span>     <span class="comment"># Open new line BELOW and start inserting</span>
<span class="keyword">O</span>     <span class="comment"># Open new line ABOVE and start inserting</span>
<span class="keyword">Esc</span>   <span class="comment"># Exit insert mode → back to Normal mode</span></pre></div>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Pro Tip:</strong> When you're lost in vim, press <code class="code-inline">Esc</code> multiple times to get back to Normal mode. Then type <code class="code-inline">:q!</code> to quit without saving.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">👁️</span> Visual Mode — Selecting Text</h2>
  <div class="code-block"><div class="code-header"><span class="lang">vim commands</span><button class="copy-btn">📋 Copy</button></div><pre><span class="keyword">v</span>       <span class="comment"># Character-wise selection (select individual characters)</span>
<span class="keyword">V</span>       <span class="comment"># Line-wise selection (select entire lines)</span>
<span class="keyword">Ctrl+v</span>  <span class="comment"># Block/column selection (select rectangle of text)</span>

<span class="comment"># After selecting:</span>
<span class="keyword">y</span>       <span class="comment"># Yank (copy) selected text</span>
<span class="keyword">d</span>       <span class="comment"># Delete selected text</span>
<span class="keyword">></span>       <span class="comment"># Indent selected text right</span>
<span class="keyword"><</span>       <span class="comment"># Indent selected text left</span></pre></div>
  <p><strong>Practical Example:</strong> To comment out 5 lines in a config file:</p>
  <div class="code-block"><div class="code-header"><span class="lang">steps</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># 1. Position cursor at first line</span>
<span class="comment"># 2. Press Ctrl+v (block select)</span>
<span class="comment"># 3. Press j four times (select 5 lines)</span>
<span class="comment"># 4. Press Shift+I (insert at beginning)</span>
<span class="comment"># 5. Type # (the comment character)</span>
<span class="comment"># 6. Press Esc — all 5 lines are now commented!</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧭</span> Navigation in Vim</h2>
  <div class="code-block"><div class="code-header"><span class="lang">vim navigation</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Basic movement (Normal mode)</span>
<span class="keyword">h</span>        <span class="comment"># Move left</span>
<span class="keyword">j</span>        <span class="comment"># Move down</span>
<span class="keyword">k</span>        <span class="comment"># Move up</span>
<span class="keyword">l</span>        <span class="comment"># Move right</span>

<span class="comment"># Word movement</span>
<span class="keyword">w</span>        <span class="comment"># Jump to next word</span>
<span class="keyword">b</span>        <span class="comment"># Jump to previous word</span>
<span class="keyword">e</span>        <span class="comment"># Jump to end of word</span>

<span class="comment"># Line movement</span>
<span class="keyword">0</span>        <span class="comment"># Beginning of line</span>
<span class="keyword">$</span>        <span class="comment"># End of line</span>
<span class="keyword">^</span>        <span class="comment"># First non-blank character</span>

<span class="comment"># File movement</span>
<span class="keyword">gg</span>       <span class="comment"># Go to first line of file</span>
<span class="keyword">G</span>        <span class="comment"># Go to last line of file</span>
<span class="keyword">:42</span>      <span class="comment"># Go to line 42</span>
<span class="keyword">Ctrl+f</span>   <span class="comment"># Page down</span>
<span class="keyword">Ctrl+b</span>   <span class="comment"># Page up</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">⚡</span> Command Abbreviations & Power Commands</h2>
  <div class="code-block"><div class="code-header"><span class="lang">vim commands</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Save & Quit</span>
<span class="keyword">:w</span>              <span class="comment"># Save (write)</span>
<span class="keyword">:q</span>              <span class="comment"># Quit</span>
<span class="keyword">:wq</span>             <span class="comment"># Save and quit</span>
<span class="keyword">:q!</span>             <span class="comment"># Quit WITHOUT saving (force)</span>
<span class="keyword">:wq!</span>            <span class="comment"># Force save and quit</span>
<span class="keyword">ZZ</span>              <span class="comment"># Save and quit (shortcut)</span>

<span class="comment"># Search & Replace</span>
<span class="keyword">/pattern</span>        <span class="comment"># Search forward for "pattern"</span>
<span class="keyword">?pattern</span>        <span class="comment"># Search backward</span>
<span class="keyword">n</span>               <span class="comment"># Next match</span>
<span class="keyword">N</span>               <span class="comment"># Previous match</span>
<span class="keyword">:%s/old/new/g</span>   <span class="comment"># Replace ALL "old" with "new" in entire file</span>
<span class="keyword">:5,10s/old/new/g</span> <span class="comment"># Replace only in lines 5 to 10</span>

<span class="comment"># Editing shortcuts</span>
<span class="keyword">dd</span>       <span class="comment"># Delete entire line</span>
<span class="keyword">5dd</span>      <span class="comment"># Delete 5 lines</span>
<span class="keyword">yy</span>       <span class="comment"># Copy (yank) current line</span>
<span class="keyword">p</span>        <span class="comment"># Paste below</span>
<span class="keyword">P</span>        <span class="comment"># Paste above</span>
<span class="keyword">u</span>        <span class="comment"># Undo</span>
<span class="keyword">Ctrl+r</span>   <span class="comment"># Redo</span>
<span class="keyword">.</span>        <span class="comment"># Repeat last command</span>

<span class="comment"># Useful settings</span>
<span class="keyword">:set number</span>     <span class="comment"># Show line numbers</span>
<span class="keyword">:set nonumber</span>   <span class="comment"># Hide line numbers</span>
<span class="keyword">:set paste</span>      <span class="comment"># Paste mode (prevents auto-indent mess)</span>
<span class="keyword">:syntax on</span>      <span class="comment"># Enable syntax highlighting</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">💾</span> Backup & Recovery</h2>
  <p>Vim automatically creates <strong>swap files</strong> (e.g., <code class="code-inline">.filename.swp</code>) while you edit. If your SSH session crashes, you can recover:</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># If you see "Swap file already exists" message:</span>
<span class="keyword">R</span>    <span class="comment"># Press R to Recover the file</span>

<span class="comment"># After recovery, delete the old swap file:</span>
<span class="cmd">rm</span> <span class="path">.filename.swp</span>

<span class="comment"># Manual backup before editing:</span>
<span class="cmd">cp</span> <span class="path">/etc/ssh/sshd_config</span> <span class="path">/etc/ssh/sshd_config.bak</span>
<span class="cmd">vim</span> <span class="path">/etc/ssh/sshd_config</span></pre></div>
  <div class="info-box warning"><span class="info-icon">⚠️</span><div><strong>Production Rule:</strong> ALWAYS backup config files before editing! Use <code class="code-inline">cp file file.bak.$(date +%F)</code> to include date in backup name.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📑</span> Multiple File Tabs in Vim</h2>
  <div class="code-block"><div class="code-header"><span class="lang">vim commands</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Open multiple files in tabs</span>
<span class="cmd">vim</span> <span class="flag">-p</span> <span class="path">file1.conf</span> <span class="path">file2.conf</span> <span class="path">file3.conf</span>

<span class="comment"># Tab commands (inside vim)</span>
<span class="keyword">:tabnew</span> <span class="path">filename</span>   <span class="comment"># Open file in new tab</span>
<span class="keyword">:tabn</span>              <span class="comment"># Next tab (or gt)</span>
<span class="keyword">:tabp</span>              <span class="comment"># Previous tab (or gT)</span>
<span class="keyword">:tabclose</span>          <span class="comment"># Close current tab</span>
<span class="keyword">:tabs</span>              <span class="comment"># List all tabs</span>

<span class="comment"># Split windows (same screen, multiple files)</span>
<span class="keyword">:split</span> <span class="path">file2</span>       <span class="comment"># Horizontal split</span>
<span class="keyword">:vsplit</span> <span class="path">file2</span>      <span class="comment"># Vertical split</span>
<span class="keyword">Ctrl+w w</span>           <span class="comment"># Switch between splits</span>
<span class="keyword">Ctrl+w q</span>           <span class="comment"># Close current split</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔀</span> Vi vs Vim — Key Differences</h2>
  <table class="styled-table">
    <thead><tr><th>Feature</th><th>vi</th><th>vim (Vi IMproved)</th></tr></thead>
    <tbody>
      <tr><td>Undo</td><td>Only 1 level</td><td>Unlimited undo/redo</td></tr>
      <tr><td>Syntax Highlighting</td><td>❌ No</td><td>✅ Yes</td></tr>
      <tr><td>Multi-file tabs</td><td>❌ No</td><td>✅ Yes</td></tr>
      <tr><td>Visual mode</td><td>❌ No</td><td>✅ Yes</td></tr>
      <tr><td>Plugins</td><td>❌ No</td><td>✅ Extensive plugin system</td></tr>
      <tr><td>Split windows</td><td>❌ No</td><td>✅ Yes</td></tr>
      <tr><td>Auto-completion</td><td>❌ No</td><td>✅ Ctrl+n / Ctrl+p</td></tr>
      <tr><td>Available on</td><td>All UNIX systems</td><td>Must be installed (yum install vim)</td></tr>
    </tbody>
  </table>
  <div class="info-box note"><span class="info-icon">📌</span><div>On most modern RHEL systems, <code class="code-inline">vi</code> is actually aliased to <code class="code-inline">vim</code>. Check with: <code class="code-inline">alias vi</code> or <code class="code-inline">which vi</code></div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧪</span> Hands-on Lab</h2>
  <ol class="lab-steps">
    <li>Create a test file: <code class="code-inline">vim /tmp/practice.txt</code></li>
    <li>Press <code class="code-inline">i</code> to enter insert mode, type 10 lines of text</li>
    <li>Press <code class="code-inline">Esc</code>, then <code class="code-inline">:set number</code> to show line numbers</li>
    <li>Navigate: <code class="code-inline">gg</code> (top), <code class="code-inline">G</code> (bottom), <code class="code-inline">:5</code> (line 5)</li>
    <li>Delete line 3: go to line 3 (<code class="code-inline">:3</code>) then press <code class="code-inline">dd</code></li>
    <li>Copy line 1 and paste at end: <code class="code-inline">gg</code>, <code class="code-inline">yy</code>, <code class="code-inline">G</code>, <code class="code-inline">p</code></li>
    <li>Search: <code class="code-inline">/your-text</code>, press <code class="code-inline">n</code> for next match</li>
    <li>Replace all: <code class="code-inline">:%s/old/new/g</code></li>
    <li>Open a split: <code class="code-inline">:vsplit /etc/hostname</code>, switch with <code class="code-inline">Ctrl+w w</code></li>
    <li>Save and quit: <code class="code-inline">:wq</code></li>
  </ol>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🎯</span> Interview Questions</h2>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How do you exit vim without saving?<span class="arrow-acc">▼</span></button><div class="accordion-body">Press <code class="code-inline">Esc</code> to ensure you're in Normal mode, then type <code class="code-inline">:q!</code> and press Enter. The <code class="code-inline">!</code> forces quit without saving changes.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How to search and replace text in vim?<span class="arrow-acc">▼</span></button><div class="accordion-body"><code class="code-inline">:%s/old_text/new_text/g</code> — <code class="code-inline">%</code> means entire file, <code class="code-inline">s</code> means substitute, <code class="code-inline">g</code> means global (all occurrences). Add <code class="code-inline">c</code> at end for confirmation: <code class="code-inline">:%s/old/new/gc</code></div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is the difference between vi and vim?<span class="arrow-acc">▼</span></button><div class="accordion-body">Vim is "Vi IMproved" — it adds undo/redo, syntax highlighting, visual mode, split windows, tabs, and plugins. Most modern Linux distros ship vim and alias vi to vim.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How do you recover a file after a crash in vim?<span class="arrow-acc">▼</span></button><div class="accordion-body">Vim creates swap files (.swp). When you reopen the file, vim asks to Recover. Press <code class="code-inline">R</code> to recover, save with <code class="code-inline">:w</code>, then delete the swap file: <code class="code-inline">rm .filename.swp</code></div></div>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  {title:'Vi Vim Editor', section:'Linux Basics'},
  {title:'Nano Editor', section:'Linux Basics'},
  {title:'Insert Mode Vim', section:'Linux Basics'},
  {title:'Visual Mode Vim', section:'Linux Basics'},
  {title:'Vim Navigation hjkl', section:'Linux Basics'},
  {title:'Search Replace in Vim', section:'Linux Basics'},
  {title:'Vim Tabs Split Windows', section:'Linux Basics'},
  {title:'Vi vs Vim Difference', section:'Linux Basics'},
  {title:'Vim Backup Recovery Swap', section:'Linux Basics'}
]);

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
`, [{ title: 'Log files /var/log', section: 'Advanced' }, { title: 'journalctl logs', section: 'Advanced' }, { title: 'tail -f monitoring', section: 'Advanced' }]);

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
`, [{ title: 'Performance Tuning Linux', section: 'Advanced' }, { title: 'top mpstat vmstat iostat', section: 'Advanced' }, { title: 'Load Average CPU', section: 'Advanced' }]);

// ===== CPU MONITORING & TUNING =====
window.LM.registerPage('cpu', `
<h1 class="page-title">CPU Monitoring & Tuning</h1>
<p class="page-subtitle">Analyze CPU load, track utilization, and manage process priorities</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧠</span> CPU Monitoring Toolkit</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Think of your CPU cores as <strong>cashiers at a supermarket</strong>, and the "load" as the number of customers waiting in line. If you have 4 cashiers (cores) and a load of 4.0, every cashier is perfectly busy. If the load is 8.0, 4 customers are waiting. High priority processes (nice/renice) are like VIP customers who get to skip the line!</div>
  
  <h3 class="subsection-title">1. Understanding Load vs CPU Cores</h3>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Insight:</strong> A load average of 1.0 means exactly one CPU core is 100% utilized. On a single-core machine, a load of 1.0 is max capacity. On an 8-core machine, a load of 1.0 means the server is mostly idle (only 1/8th utilized). Always run <code>nproc</code> or <code>lscpu</code> to know how many cores you have before judging the load!</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View number of processing cores</span>
<span class="cmd">nproc</span>
<span class="cmd">lscpu</span> | <span class="cmd">grep</span> <span class="string">"^CPU(s):"</span>

<span class="comment"># View load average (1-min, 5-min, 15-min)</span>
<span class="cmd">uptime</span>
<span class="cmd">cat</span> <span class="path">/proc/loadavg</span></pre></div>

  <h3 class="subsection-title">2. CPU Utilization & High CPU Processes</h3>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Check per-core CPU utilization in real-time</span>
<span class="cmd">mpstat</span> <span class="flag">-P ALL</span> <span class="num">1 3</span>          <span class="comment"># Show all cores, every 1s, 3 times</span>

<span class="comment"># Identify processes consuming the most CPU</span>
<span class="cmd">top</span>                        <span class="comment"># Press '1' to see per-core, 'P' to sort by CPU</span>
<span class="cmd">ps</span> <span class="flag">-eo</span> <span class="path">pid,ppid,cmd,%mem,%cpu --sort=-%cpu</span> | <span class="cmd">head</span> <span class="flag">-10</span></pre></div>

  <h3 class="subsection-title">3. Process Priority (nice / renice)</h3>
  <p>In Linux, CPU scheduling priority is determined by a "niceness" value. It ranges from <strong>-20 (highest priority/least nice)</strong> to <strong>19 (lowest priority/most nice)</strong>. Default is 0.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Start a new process with a specific priority (e.g., low priority background backup)</span>
<span class="cmd">nice</span> <span class="flag">-n 15</span> <span class="path">tar -czf backup.tar.gz /var/www/</span>

<span class="comment"># Change the priority of an ALREADY RUNNING process (requires PID)</span>
<span class="comment"># Note: Only root can assign negative (higher) priorities!</span>
<span class="cmd">sudo renice</span> <span class="flag">-n -5 -p</span> <span class="num">1234</span></pre></div>

  <h3 class="subsection-title">4. CPU Affinity (taskset)</h3>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Insight:</strong> By default, the Linux scheduler moves processes between cores to balance load. Sometimes, for high-performance applications (like databases or real-time trading), moving a process causes cache misses. "Affinity" locks a process to specific cores so it never moves, keeping its CPU cache perfectly warm.</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View the current CPU affinity of a process (which cores is it allowed to use?)</span>
<span class="cmd">taskset</span> <span class="flag">-cp</span> <span class="num">1234</span>           <span class="comment"># e.g., returns list: 0-3 (meaning cores 0,1,2,3)</span>

<span class="comment"># Lock an existing process to specifically run ONLY on Core 0 and Core 1</span>
<span class="cmd">taskset</span> <span class="flag">-cp</span> <span class="path">0,1</span> <span class="num">1234</span>

<span class="comment"># Start a new process locked to Core 2</span>
<span class="cmd">taskset</span> <span class="flag">-c</span> <span class="num">2</span> <span class="path">/usr/local/bin/myapp</span></pre></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{ title: 'CPU Monitoring taskset nice', section: 'Advanced' }]);

// ===== MEMORY MANAGEMENT & TUNING =====
window.LM.registerPage('memory', `
<h1 class="page-title">Memory Management & Tuning</h1>
<p class="page-subtitle">Analyze RAM, manage swap space, and tune kernel memory parameters</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">💾</span> Memory Analysis Toolkit</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>RAM is like a <strong>chef's kitchen counter</strong>. The larger the counter, the more ingredients (processes) the chef can work with simultaneously. Swap space is like a <strong>freezer in the basement</strong>: you can store things there when the counter is full, but it takes much longer to fetch them!</div>
  
  <h3 class="subsection-title">1. Analyzing Memory (free & vmstat)</h3>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View memory usage in human-readable format (MB/GB)</span>
<span class="cmd">free</span> <span class="flag">-h</span>
<span class="cmd">free</span> <span class="flag">-m</span>

<span class="comment"># View detailed virtual memory statistics every 2 seconds</span>
<span class="cmd">vmstat</span> <span class="num">2 5</span>

<span class="comment"># Check the top processes consuming memory</span>
<span class="cmd">ps</span> <span class="flag">-eo</span> <span class="path">pid,ppid,cmd,%mem,%cpu --sort=-%mem</span> | <span class="cmd">head</span> <span class="flag">-10</span></pre></div>

  <h3 class="subsection-title">2. Cache vs. Actual Memory Usage</h3>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Insight:</strong> Linux intentionally uses free memory to cache disk operations to speed up the system. If you look at <code>free -m</code> and see very little "free" memory but a lot of "buff/cache", <strong>this is a good thing!</strong> The system will automatically free up cache if applications need actual RAM.</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Safely clear the pagecache, dentries, and inodes manually</span>
<span class="comment"># (Usually unnecessary, but useful for testing disk I/O performance)</span>
<span class="cmd">sync</span>; <span class="cmd">echo</span> <span class="num">3</span> | <span class="cmd">sudo tee</span> <span class="path">/proc/sys/vm/drop_caches</span></pre></div>

  <h3 class="subsection-title">3. Identifying Swap Usage</h3>
  <p>If your system is aggressively reading and writing to swap (thrashing), performance will plummet.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># List active swap partitions/files and their usage</span>
<span class="cmd">swapon</span> <span class="flag">--show</span>

<span class="comment"># In vmstat output, watch the 'si' (swap in) and 'so' (swap out) columns.</span>
<span class="comment"># If these values are consistently high, your server desperately needs more RAM.</span>
<span class="cmd">vmstat</span> <span class="num">1</span></pre></div>

  <h3 class="subsection-title">4. Tuning vm.swappiness</h3>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Insight:</strong> <code>vm.swappiness</code> controls how aggressively the kernel swaps memory pages. It ranges from 0 to 100. A value of 60 (default) is balanced. Lowering it to 10 tells the kernel: <em>"Avoid swapping to disk as much as possible, rely on RAM."</em> This is highly recommended for database servers!</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Check current swappiness value</span>
<span class="cmd">cat</span> <span class="path">/proc/sys/vm/swappiness</span>

<span class="comment"># Temporarily change swappiness to 10 (until next reboot)</span>
<span class="cmd">sudo sysctl</span> <span class="flag">vm.swappiness=10</span>

<span class="comment"># Make the change permanent</span>
<span class="cmd">echo</span> <span class="string">"vm.swappiness=10"</span> | <span class="cmd">sudo tee -a</span> <span class="path">/etc/sysctl.conf</span>
<span class="cmd">sudo sysctl</span> <span class="flag">-p</span></pre></div>

  <h3 class="subsection-title">5. Detecting Memory Leaks (Basic Level)</h3>
  <p>A memory leak happens when an application claims RAM but forgets to release it when done. Over days or weeks, available memory slowly dwindles until the OOM (Out Of Memory) killer strikes.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Watch the memory footprint of a specific process ID over time</span>
<span class="cmd">top</span> <span class="flag">-p</span> <span class="num">1234</span>

<span class="comment"># Look for OOM (Out Of Memory) kills in system logs</span>
<span class="comment"># If you see "Out of memory: Killed process", a leak likely caused RAM exhaustion.</span>
<span class="cmd">grep -i</span> <span class="string">"out of memory"</span> <span class="path">/var/log/messages</span>
<span class="cmd">dmesg</span> | <span class="cmd">grep -i</span> <span class="string">"killed process"</span></pre></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{ title: 'Memory Management RAM free swappiness', section: 'Advanced' }]);

// ===== DISK I/O ANALYSIS & TUNING =====
window.LM.registerPage('disk-io', `
<h1 class="page-title">Disk I/O Analysis</h1>
<p class="page-subtitle">Identify storage bottlenecks, measure disk latency, and understand filesystems</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">💿</span> Disk Analysis Toolkit</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Disk I/O is like a <strong>warehouse with forklifts</strong>. If you have slow forklifts (slow disk drives) but lots of goods coming in, the workers (CPU) just stand around waiting for the forklifts to catch up. This waiting time is exactly what "I/O Wait" measures!</div>
  
  <h3 class="subsection-title">1. Identifying High I/O Wait</h3>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Insight:</strong> In the <code>top</code> command, look closely at the <strong>%wa</strong> (I/O wait) metric. If %wa is consistently above 5-10%, your CPU is spending significant time doing absolutely nothing because it's waiting on the disk to read or write data. This is the #1 indicator of a storage bottleneck.</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Use top to check global I/O Wait (%wa)</span>
<span class="cmd">top</span>

<span class="comment"># Use mpstat to see if specific CPU cores are bottlenecked by I/O Wait</span>
<span class="cmd">mpstat</span> <span class="flag">-P ALL</span> <span class="num">1</span></pre></div>

  <h3 class="subsection-title">2. Monitoring Disk Utilization & Latency (iostat)</h3>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># iostat shows detailed disk metrics (requires 'sysstat' package)</span>
<span class="comment"># -x for extended stats, -m for Megabytes, 2s interval, 5 counts</span>
<span class="cmd">iostat</span> <span class="flag">-x -m</span> <span class="num">2 5</span>

<span class="comment"># Key columns to watch in iostat -x:</span>
<span class="comment"># r/s & w/s : Read/Write operations per second (IOPS)</span>
<span class="comment"># await     : Average latency/wait time for requests (in milliseconds) - should be &lt; 5-10ms!</span>
<span class="comment"># %util     : Disk utilization percentage. If near 100%, the disk is saturated.</span></pre></div>

  <h3 class="subsection-title">3. Identifying Heavy I/O Processes (iotop)</h3>
  <p>Once you know the disk is the bottleneck, you need to find out <em>who</em> is causing it.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># iotop works like 'top', but for disk activity</span>
<span class="comment"># Use -o to only show processes currently doing I/O</span>
<span class="cmd">sudo iotop</span> <span class="flag">-o</span>

<span class="comment"># You can also use pidstat for a historical summary per process</span>
<span class="cmd">pidstat</span> <span class="flag">-d</span> <span class="num">2</span></pre></div>

  <h3 class="subsection-title">4. Basic Filesystem Understanding (EXT4 vs XFS)</h3>
  <div class="info-box note"><span class="info-icon">🧠</span><div><strong>Deep Insight:</strong> The underlying filesystem dictates how data is organized on the disk, directly impacting performance.
  <br><br>• <strong>EXT4:</strong> The traditional, rock-solid Linux standard. Great for general-purpose servers and small files.
  <br>• <strong>XFS:</strong> The default in modern RHEL/CentOS. Designed for high-performance, massive files, and parallel I/O. Excels in database and big data environments. Note: XFS partitions can be grown, but <strong>cannot be shrunk!</strong></div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View which filesystems your mounts are using</span>
<span class="cmd">df</span> <span class="flag">-Th</span>

<span class="comment"># Check mount options (some options like 'noatime' improve performance)</span>
<span class="cmd">mount</span> | <span class="cmd">grep</span> <span class="string">"^/dev"</span></pre></div>

</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{ title: 'Disk IO Analysis iostat iotop', section: 'Advanced' }]);

// ===== NETWORK PERFORMANCE BASICS =====
window.LM.registerPage('network-perf', `
<h1 class="page-title">Network Performance Basics</h1>
<p class="page-subtitle">Monitor bandwidth, track open connections, and apply basic network tuning</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🌐</span> Network Analysis Toolkit</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Think of your server's network interface as a <strong>multi-lane highway toll booth</strong>. Connections (<code>ss</code> / <code>netstat</code>) are the cars passing through, and bandwidth (<code>iftop</code> / <code>nload</code>) is the volume of traffic. If the toll booth (TCP settings) isn't optimized, traffic backs up even if the highway itself is wide open!</div>
  
  <h3 class="subsection-title">1. Checking Active Connections (ss & netstat)</h3>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Insight:</strong> <code>netstat</code> is the older, traditional tool, but <code>ss</code> (Socket Statistics) is its modern replacement. <code>ss</code> is significantly faster because it queries the kernel directly rather than reading through the <code>/proc</code> filesystem.</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View all listening ports and the processes using them (run as root to see PIDs)</span>
<span class="cmd">sudo ss</span> <span class="flag">-tulpn</span>               <span class="comment"># t=TCP, u=UDP, l=listening, p=processes, n=numeric (no DNS resolution)</span>
<span class="cmd">sudo netstat</span> <span class="flag">-tulpn</span>          <span class="comment"># The older alternative</span>

<span class="comment"># View all established connections (who is connected to your server right now?)</span>
<span class="cmd">ss</span> <span class="flag">-ta</span> | <span class="cmd">grep</span> <span class="string">ESTAB</span></pre></div>

  <h3 class="subsection-title">2. Monitoring Live Traffic & Bandwidth (iftop / nload)</h3>
  <p>To identify if your network pipe is full (a bottleneck), you need tools that show real-time bandwidth consumption.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># nload: Visualizes total incoming/outgoing traffic graphs</span>
<span class="cmd">nload</span> <span class="path">eth0</span>                 <span class="comment"># Replace eth0 with your network interface</span>

<span class="comment"># iftop: Shows a list of exact connections consuming the most bandwidth</span>
<span class="comment"># Very useful for finding the specific IP address hogging your network!</span>
<span class="cmd">sudo iftop</span> <span class="flag">-i</span> <span class="path">eth0</span>

<span class="comment"># vnstat: Logs network traffic over days/months (great for billing/quotas)</span>
<span class="cmd">vnstat</span> <span class="flag">-d</span>                  <span class="comment"># Daily summary</span></pre></div>

  <h3 class="subsection-title">3. Identifying Network Bottlenecks</h3>
  <p>If the CPU and Disk look fine but the application is slow, check for network congestion or dropped packets.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Look for dropped packets or errors on the interface</span>
<span class="comment"># If 'dropped' or 'errors' are increasing, you have hardware/congestion issues</span>
<span class="cmd">ip</span> <span class="flag">-s</span> <span class="cmd">link</span> <span class="flag">show</span> <span class="path">eth0</span>

<span class="comment"># Check for high latency between your server and a client</span>
<span class="cmd">ping</span> <span class="path">8.8.8.8</span>
<span class="cmd">mtr</span> <span class="path">8.8.8.8</span>                <span class="comment"># Combines ping + traceroute to find exactly where the delay is</span></pre></div>

  <h3 class="subsection-title">4. Basic TCP Tuning (sysctl)</h3>
  <div class="info-box note"><span class="info-icon">🧠</span><div><strong>Deep Insight:</strong> By default, Linux TCP settings are tuned for general use, not for high-traffic web servers or heavily loaded databases. You can adjust the kernel's network buffers to handle thousands of simultaneous connections without choking.</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Open the sysctl configuration file</span>
<span class="cmd">sudo nano</span> <span class="path">/etc/sysctl.conf</span>

<span class="comment"># Add these basic tuning parameters at the bottom:</span>
<span class="comment"># 1. Increase the maximum number of queued connections (helps prevent dropped connections during traffic spikes)</span>
<span class="output">net.core.somaxconn = 4096</span>
<span class="output">net.ipv4.tcp_max_syn_backlog = 4096</span>

<span class="comment"># 2. Allow reusing sockets in TIME_WAIT state (good for high-traffic web servers)</span>
<span class="output">net.ipv4.tcp_tw_reuse = 1</span>

<span class="comment"># 3. Decrease the time the system keeps connections alive when idle</span>
<span class="output">net.ipv4.tcp_keepalive_time = 600</span>

<span class="comment"># Apply the changes immediately</span>
<span class="cmd">sudo sysctl</span> <span class="flag">-p</span></pre></div>

</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{ title: 'Network Performance Tuning iftop ss tcp', section: 'Advanced' }]);

// ===== SECURITY & SSH =====
window.LM.registerPage('security', `
<h1 class="page-title">Security & SSH</h1>
<p class="page-subtitle">Secure your Linux servers with SSH hardening, firewalls, and best practices</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🌐</span> 1. Installing and Configuring SSH</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Think of SSH (Secure Shell) as a <strong>secure armored tunnel</strong> between your computer and a remote server. While older protocols like Telnet sent data in plain text (like writing on a postcard), SSH encrypts everything, making it unreadable to anyone trying to intercept the communication.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Install SSH server (usually pre-installed on most servers)</span>
<span class="cmd">sudo dnf install</span> <span class="path">openssh-server</span>     <span class="comment"># RHEL/CentOS/Fedora</span>
<span class="cmd">sudo apt install</span> <span class="path">openssh-server</span>     <span class="comment"># Ubuntu/Debian</span>

<span class="comment"># Start and enable SSH service to run on boot</span>
<span class="cmd">sudo systemctl</span> <span class="flag">enable --now</span> <span class="path">sshd</span>

<span class="comment"># Check the status of the SSH daemon</span>
<span class="cmd">sudo systemctl</span> <span class="flag">status</span> <span class="path">sshd</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔌</span> 2. Connecting to Remote Systems</h2>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Insight:</strong> The default port for SSH is 22. When you connect, the server presents its "fingerprint" to verify its identity. The first time you connect, you must accept this fingerprint, which is then saved in your <code>~/.ssh/known_hosts</code> file.</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Basic connection (uses your current local username)</span>
<span class="cmd">ssh</span> <span class="path">192.168.1.50</span>

<span class="comment"># Connect as a specific user</span>
<span class="cmd">ssh</span> <span class="path">admin@192.168.1.50</span>

<span class="comment"># Connect using a custom port (if SSH is configured on a non-default port)</span>
<span class="cmd">ssh</span> <span class="flag">-p</span> <span class="num">2222</span> <span class="path">admin@192.168.1.50</span>

<span class="comment"># Execute a single command remotely without opening an interactive shell</span>
<span class="cmd">ssh</span> <span class="path">admin@192.168.1.50</span> <span class="string">"df -h"</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔑</span> 3. SSH Key Management</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Using passwords for SSH is like locking your door with a <strong>PIN pad</strong>—it can be brute-forced or guessed. SSH keys are like an intricate <strong>two-part physical lock and key</strong>. The "Public Key" is the lock installed on the server. The "Private Key" is the unique physical key you keep safe on your laptop. Without the exact matching Private Key, the door won't open.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># 1. Generate SSH Keys: ssh-keygen</span>
<span class="comment"># We use ed25519 as it's currently the most secure and efficient algorithm</span>
<span class="cmd">ssh-keygen</span> <span class="flag">-t ed25519 -C</span> <span class="string">"your_email@example.com"</span>

<span class="comment"># 2. Copying Public Keys to Remote Systems</span>
<span class="comment"># This securely adds your public key to the server's ~/.ssh/authorized_keys file</span>
<span class="cmd">ssh-copy-id</span> <span class="path">admin@192.168.1.50</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🛡️</span> 4. Enhancing SSH Security</h2>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Insight:</strong> The main configuration file for the SSH daemon is <code>/etc/ssh/sshd_config</code>. Always back up this file before making changes! If you mess up the configuration and restart SSH, you could lock yourself out of a remote server.</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Edit the SSH daemon configuration</span>
<span class="cmd">sudo nano</span> <span class="path">/etc/ssh/sshd_config</span>

<span class="comment"># --- Key Security Settings to Change ---</span>

<span class="comment"># 1. Disabling Root Login</span>
<span class="comment"># Hackers always try to brute-force the 'root' user. Disable direct root access.</span>
<span class="keyword">PermitRootLogin</span> no

<span class="comment"># 2. Disable Password Authentication (Force Key-Based Auth)</span>
<span class="comment"># Ensure you have successfully set up SSH keys before doing this!</span>
<span class="keyword">PasswordAuthentication</span> no

<span class="comment"># 3. Configuring AllowUsers and DenyUsers</span>
<span class="comment"># Restrict exactly who is allowed to use SSH.</span>
<span class="keyword">AllowUsers</span> admin deployer      <span class="comment"># Only these users can log in via SSH</span>
<span class="comment"># OR</span>
<span class="keyword">DenyUsers</span> guest testuser       <span class="comment"># These users are explicitly blocked</span>

<span class="comment"># 4. Change default port (Reduces automated bot attacks)</span>
<span class="keyword">Port</span> 2222

<span class="comment"># Restart SSH to apply changes</span>
<span class="cmd">sudo systemctl</span> <span class="flag">restart</span> <span class="path">sshd</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔥</span> 5. Firewall Basics (firewalld)</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Firewall basics (firewalld)</span>
<span class="cmd">sudo firewall-cmd</span> <span class="flag">--state</span>                               <span class="comment"># Check status</span>
<span class="cmd">sudo firewall-cmd</span> <span class="flag">--list-all</span>                            <span class="comment"># List all rules</span>
<span class="cmd">sudo firewall-cmd</span> <span class="flag">--add-service=http --permanent</span>        <span class="comment"># Allow HTTP</span>
<span class="cmd">sudo firewall-cmd</span> <span class="flag">--add-port=2222/tcp --permanent</span>       <span class="comment"># Allow custom SSH port</span>
<span class="cmd">sudo firewall-cmd</span> <span class="flag">--remove-service=ftp --permanent</span>      <span class="comment"># Remove FTP</span>
<span class="cmd">sudo firewall-cmd</span> <span class="flag">--reload</span>                              <span class="comment"># Apply changes</span></pre></div>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{ title: 'Installing & Connecting SSH', section: 'Advanced' }, { title: 'SSH Key Management', section: 'Advanced' }, { title: 'SSH Security & Hardening', section: 'Advanced' }, { title: 'firewalld firewall-cmd', section: 'Advanced' }]);

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
`, [{ title: 'Shell Scripting Bash', section: 'Advanced' }, { title: 'Bash Variables Loops If', section: 'Advanced' }, { title: 'Server Health Script', section: 'Advanced' }]);

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
`, [{ title: 'Kernel Tuning sysctl', section: 'Advanced' }, { title: 'ulimit resource limits', section: 'Advanced' }, { title: 'lsmod kernel modules', section: 'Advanced' }, { title: 'vm.swappiness', section: 'Advanced' }]);

// ===== SELINUX =====
window.LM.registerPage('selinux', `
<h1 class="page-title">SELinux (Security-Enhanced Linux)</h1>
<p class="page-subtitle">Mandatory Access Control, Policies, and Troubleshooting</p>
<div class="content-section">
  <h2 class="section-title"><span class="icon">🔒</span> Understanding SELinux</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Standard Linux permissions (rwx) are like a <strong>building's main security guard</strong> checking if you have an ID card. SELinux is like <strong>internal security cameras and biometric scanners</strong> on every door inside the building. Even if you have the ID card (rwx), SELinux restricts what specific rooms you can enter and what you can touch based on strict company policy (Targeted Policy).</div>

  <h3 class="subsection-title">1. SELinux Modes</h3>
  <div class="info-box tip"><span class="info-icon">🎯</span><div>
    <strong>Enforcing:</strong> SELinux security policy is enforced. Access is actively blocked if it violates policy.<br>
    <strong>Permissive:</strong> SELinux prints warnings instead of enforcing. Use this for troubleshooting.<br>
    <strong>Disabled:</strong> SELinux is completely turned off (Requires reboot, generally not recommended).
  </div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Check current SELinux status and mode</span>
<span class="cmd">sestatus</span>
<span class="cmd">getenforce</span>

<span class="comment"># Temporarily change mode (until reboot)</span>
<span class="cmd">setenforce</span> <span class="num">0</span>    <span class="comment"># Switch to Permissive</span>
<span class="cmd">setenforce</span> <span class="num">1</span>    <span class="comment"># Switch to Enforcing</span></pre></div>

  <h3 class="subsection-title">2. SELinux Policies</h3>
  <p>SELinux policies define the rules for what processes can access what files.</p>
  <ul>
    <li><strong>Targeted:</strong> The default. Only specific network-facing services (like httpd, sshd) are restricted. Everything else falls back to standard permissions.</li>
    <li><strong>Minimum:</strong> A stripped-down version of targeted, only protecting a few selected services.</li>
    <li><strong>MLS (Multi-Level Security):</strong> Extremely strict. Used in highly classified government/military environments where data is labeled with clearance levels (e.g., Top Secret, Confidential).</li>
  </ul>

  <h3 class="subsection-title">3. Configuration & Key Files</h3>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Main Configuration File</span>
<span class="cmd">cat</span> <span class="path">/etc/selinux/config</span>

<span class="comment"># Example /etc/selinux/config contents:</span>
<span class="output">SELINUX=enforcing</span>     <span class="comment"># Set default mode (enforcing, permissive, disabled)</span>
<span class="output">SELINUXTYPE=targeted</span>  <span class="comment"># Set policy type</span></pre></div>
  <div class="info-box warning"><span class="info-icon">⚠️</span><div><strong>Warning:</strong> Changing SELINUX=disabled requires a system reboot. If you change from disabled back to enforcing, the system will need to relabel the entire filesystem on boot, which can take a long time!</div></div>

  <h3 class="subsection-title">4. Contexts & File Permissions</h3>
  <div class="analogy-box"><div class="analogy-label">💡 Contexts Explained</div>Every file, process, and port in SELinux has a "label" or "context". It's a string consisting of <code>user:role:type:level</code>. The most important part for administrators is the <strong>type</strong> (usually ends in <code>_t</code>). For Apache to read a file, the file's type must be <code>httpd_sys_content_t</code>.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View SELinux context of files (use -Z flag)</span>
<span class="cmd">ls</span> <span class="flag">-lZ</span> <span class="path">/var/www/html/</span>

<span class="comment"># View context of running processes</span>
<span class="cmd">ps</span> <span class="flag">-eZ</span> | <span class="cmd">grep</span> <span class="string">httpd</span>

<span class="comment"># Temporarily change file context (survives until relabel)</span>
<span class="cmd">chcon</span> <span class="flag">-t</span> <span class="path">httpd_sys_content_t</span> <span class="path">/var/www/html/index.html</span>

<span class="comment"># Permanently change file context (survives relabel)</span>
<span class="cmd">semanage</span> <span class="flag">fcontext -a -t</span> <span class="path">httpd_sys_content_t</span> <span class="string">"/custom_web(/.*)?"</span>
<span class="cmd">restorecon</span> <span class="flag">-Rv</span> <span class="path">/custom_web/</span>  <span class="comment"># Apply the permanent rules</span></pre></div>

  <h3 class="subsection-title">5. Troubleshooting SELinux</h3>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>The Golden Troubleshooting Rule:</strong> If a service (like a web server) gets a "Permission Denied" error, but the standard file permissions (rwx) look completely fine, <strong>it is almost certainly SELinux blocking it!</strong></div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># 1. Look for SELinux Denials in Audit Logs</span>
<span class="cmd">grep</span> <span class="string">"denied"</span> <span class="path">/var/log/audit/audit.log</span>

<span class="comment"># 2. Use sealert for human-readable explanations (requires setroubleshoot-server package)</span>
<span class="cmd">sealert</span> <span class="flag">-a</span> <span class="path">/var/log/audit/audit.log</span>

<span class="comment"># 3. Allow Apache to connect to the network (SELinux Booleans)</span>
<span class="comment"># Booleans are on/off switches to easily change policy rules</span>
<span class="cmd">getsebool</span> <span class="flag">-a</span> | <span class="cmd">grep</span> <span class="string">httpd</span>
<span class="cmd">setsebool</span> <span class="flag">-P</span> <span class="path">httpd_can_network_connect</span> <span class="num">1</span>   <span class="comment"># -P makes it permanent</span></pre></div>
</div>
<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [{ title: 'SELinux Modes sestatus', section: 'Advanced' }, { title: 'SELinux Contexts chcon', section: 'Advanced' }, { title: 'Troubleshoot SELinux sealert', section: 'Advanced' }, { title: 'SELinux Booleans getsebool', section: 'Advanced' }]);

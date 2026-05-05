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
`, [{ title: 'Process Management ps top kill', section: 'Intermediate' }, { title: 'Background Jobs nohup fg bg', section: 'Intermediate' }, { title: 'Zombie Process', section: 'Intermediate' }, { title: 'nice renice priority', section: 'Intermediate' }]);

// ===== NETWORKING =====
window.LM.registerPage('networking', `
<h1 class="page-title">Advanced Networking & Troubleshooting</h1>
<p class="page-subtitle">Master network interfaces, routing, DNS, and deep troubleshooting on Linux</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧠</span> Core Networking Concepts</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    Think of a network like a city's road system. <strong>Subnets</strong> are neighborhoods. The <strong>Gateway</strong> is the highway on-ramp to leave your neighborhood. <strong>Routes</strong> are the GPS directions to reach specific destinations. <strong>NAT (Network Address Translation)</strong> is like an apartment building's receptionist who takes packages for the whole building (one public IP) and distributes them to individual apartments (private IPs).
  </div>
  <p>Understanding these concepts is crucial before running any commands:</p>
  <ul class="styled-list">
    <li><strong>Subnet:</strong> A logical subdivision of an IP network. It determines which IP addresses are on your local network versus which need to go through a router.</li>
    <li><strong>Gateway (Default Route):</strong> The router that forwards traffic from your local subnet to other networks (like the Internet).</li>
    <li><strong>Routes:</strong> Rules that tell the system where to send packets for specific destination networks.</li>
    <li><strong>NAT:</strong> Allows multiple devices on a private network to share a single public IP address. It modifies the source or destination IP addresses in packet headers.</li>
  </ul>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔌</span> Configuring Network Interfaces</h2>
  <p>The <code>ip</code> command from the <code>iproute2</code> package has replaced the legacy <code>ifconfig</code>. While <code>ifconfig</code> is still found on older systems, <code>ip</code> is the modern standard.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash — ip & ifconfig</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View interfaces (Modern vs Legacy)</span>
<span class="cmd">ip</span> <span class="flag">addr show</span>                        <span class="comment"># Modern standard</span>
<span class="cmd">ifconfig</span> <span class="flag">-a</span>                         <span class="comment"># Legacy</span>

<span class="comment"># Interface status</span>
<span class="cmd">ip</span> <span class="flag">link set</span> <span class="path">eth0</span> <span class="flag">up</span>                 <span class="comment"># Enable interface</span>
<span class="cmd">ip</span> <span class="flag">link set</span> <span class="path">eth0</span> <span class="flag">down</span>               <span class="comment"># Disable interface</span>

<span class="comment"># Assigning IP addresses temporarily</span>
<span class="cmd">ip</span> <span class="flag">addr add</span> <span class="path">192.168.1.50/24</span> <span class="flag">dev</span> <span class="path">eth0</span>  <span class="comment"># Add IP</span>
<span class="cmd">ip</span> <span class="flag">addr del</span> <span class="path">192.168.1.50/24</span> <span class="flag">dev</span> <span class="path">eth0</span>  <span class="comment"># Remove IP</span>

<span class="comment"># IP Aliasing (Multiple IPs on one interface)</span>
<span class="cmd">ip</span> <span class="flag">addr add</span> <span class="path">10.0.0.5/24</span> <span class="flag">dev</span> <span class="path">eth0</span> <span class="flag">label</span> <span class="path">eth0:1</span>  <span class="comment"># Create alias</span>
</pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📝</span> Network Settings in Linux Files & Automation</h2>
  <p>Linux distributions traditionally use configuration files to persist network settings across reboots. Modern systems often automate this using <strong>NetworkManager</strong>.</p>
  
  <h3 style="margin-top:1.5rem;color:var(--accent);">Configuration Files</h3>
  <ul class="styled-list">
    <li><strong>Debian/Ubuntu (Legacy):</strong> <code>/etc/network/interfaces</code></li>
    <li><strong>RHEL/CentOS (Legacy):</strong> <code>/etc/sysconfig/network-scripts/ifcfg-eth0</code></li>
    <li><strong>Ubuntu (Modern):</strong> Netplan configs in <code>/etc/netplan/*.yaml</code></li>
  </ul>

  <h3 style="margin-top:1.5rem;color:var(--accent);">Automating Connections (NetworkManager)</h3>
  <div class="code-block"><div class="code-header"><span class="lang">bash — nmcli</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># NetworkManager Command Line (nmcli) is standard on modern distros</span>
<span class="cmd">nmcli</span> <span class="flag">con show</span>                      <span class="comment"># List all connections</span>
<span class="cmd">nmcli</span> <span class="flag">dev status</span>                    <span class="comment"># Show device status</span>

<span class="comment"># Create a static IP connection persistently</span>
<span class="cmd">nmcli</span> <span class="flag">con add</span> <span class="flag">con-name</span> <span class="string">"static-eth0"</span> <span class="flag">ifname</span> <span class="path">eth0</span> <span class="flag">type</span> <span class="path">ethernet</span> <span class="flag">ip4</span> <span class="path">192.168.1.100/24</span> <span class="flag">gw4</span> <span class="path">192.168.1.1</span>
<span class="cmd">nmcli</span> <span class="flag">con mod</span> <span class="string">"static-eth0"</span> <span class="flag">ipv4.dns</span> <span class="path">"8.8.8.8 8.8.4.4"</span>
<span class="cmd">nmcli</span> <span class="flag">con up</span> <span class="string">"static-eth0"</span>          <span class="comment"># Activate it</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔍</span> Hostname Resolution & DNS Servers</h2>
  <p>When you ping "google.com", Linux needs to find its IP address. This is called hostname resolution. It follows a specific order defined in <code>/etc/nsswitch.conf</code> (usually checking the hosts file first, then DNS).</p>

  <ul class="styled-list">
    <li><strong>/etc/hosts:</strong> The local override file. Useful for aliases or blocking domains. Format: <code>IP_Address Hostname Alias</code></li>
    <li><strong>/etc/resolv.conf:</strong> Tells the system which DNS servers to query. Format: <code>nameserver 8.8.8.8</code></li>
    <li><strong>/etc/hostname:</strong> Contains the system's own hostname.</li>
  </ul>

  <div class="code-block"><div class="code-header"><span class="lang">bash — DNS & Hostname</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Hostname management</span>
<span class="cmd">hostname</span>                            <span class="comment"># View current hostname</span>
<span class="cmd">hostnamectl</span> <span class="flag">set-hostname</span> <span class="string">"webserver-01"</span>  <span class="comment"># Change permanently</span>

<span class="comment"># Testing resolution</span>
<span class="cmd">ping</span> <span class="path">localhost</span>                      <span class="comment"># Resolves via /etc/hosts</span>
<span class="cmd">dig</span> <span class="path">example.com</span>                     <span class="comment"># Comprehensive DNS query</span>
<span class="cmd">nslookup</span> <span class="path">example.com</span>                <span class="comment"># Simple DNS query</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧭</span> Network Routing Concepts</h2>
  <p>Routing determines the path packets take to reach their destination.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash — Routing</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View routing table</span>
<span class="cmd">ip</span> <span class="flag">route show</span>                       <span class="comment"># Modern</span>
<span class="cmd">route</span> <span class="flag">-n</span>                            <span class="comment"># Legacy</span>

<span class="comment"># Adding routes temporarily</span>
<span class="cmd">ip</span> <span class="flag">route add</span> <span class="path">10.0.0.0/8</span> <span class="flag">via</span> <span class="path">192.168.1.254</span>  <span class="comment"># Route specific subnet through a different gateway</span>
<span class="cmd">ip</span> <span class="flag">route add default</span> <span class="flag">via</span> <span class="path">192.168.1.1</span>       <span class="comment"># Set default gateway</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🩺</span> Network Monitoring & Troubleshooting</h2>
  <p>When the network is down, systematic troubleshooting is required.</p>
  
  <div class="code-block"><div class="code-header"><span class="lang">bash — Troubleshooting Flow</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># 1. Is the interface UP?</span>
<span class="cmd">ip</span> <span class="flag">link show</span>
<span class="comment"># 2. Do I have an IP?</span>
<span class="cmd">ip</span> <span class="flag">addr show</span>
<span class="comment"># 3. Can I ping my gateway?</span>
<span class="cmd">ping</span> <span class="path">192.168.1.1</span>
<span class="comment"># 4. Can I ping the internet? (e.g. Google DNS)</span>
<span class="cmd">ping</span> <span class="path">8.8.8.8</span>
<span class="comment"># 5. Is DNS working?</span>
<span class="cmd">ping</span> <span class="path">google.com</span>                     <span class="comment"># If this fails but 8.8.8.8 works -> DNS Issue! Check /etc/resolv.conf</span>

<span class="comment"># Advanced Monitoring Tools</span>
<span class="cmd">ss</span> <span class="flag">-tulnp</span>                          <span class="comment"># Show listening ports and their processes (replaces netstat)</span>
<span class="cmd">traceroute</span> <span class="path">google.com</span>              <span class="comment"># See where packets drop across routers</span>
<span class="cmd">tcpdump</span> <span class="flag">-i</span> <span class="path">eth0</span> <span class="flag">port 80</span>           <span class="comment"># Packet sniffer - watch traffic in real time</span>
<span class="cmd">mtr</span> <span class="path">google.com</span>                     <span class="comment"># Continuous traceroute (great for finding packet loss)</span></pre></div>
  
  <div class="info-box warning"><span class="info-icon">⚠️</span><div><strong>Common Pitfall: /etc/resolv.conf Overwrites</strong><br>If you manually edit <code>/etc/resolv.conf</code>, NetworkManager or systemd-resolved might overwrite it on reboot. To make permanent DNS changes, configure it via <code>nmcli</code>, <code>netplan</code>, or edit <code>/etc/systemd/resolved.conf</code>.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🛡️</span> Firewall Basics (firewalld)</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="cmd">firewall-cmd</span> <span class="flag">--list-all</span>            <span class="comment"># Check firewall rules</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--add-port=80/tcp --permanent</span>  <span class="comment"># Open port 80</span>
<span class="cmd">firewall-cmd</span> <span class="flag">--reload</span>              <span class="comment"># Apply firewall changes</span></pre></div>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  { title: 'Core Networking Concepts: Subnet, Gateway, Routes, NAT', section: 'Intermediate' },
  { title: 'Interface Config: ip addr, ifconfig, Aliasing', section: 'Intermediate' },
  { title: 'Network Config Files & nmcli Automation', section: 'Intermediate' },
  { title: 'DNS & Hostname: /etc/hosts, /etc/resolv.conf', section: 'Intermediate' },
  { title: 'Routing: ip route', section: 'Intermediate' },
  { title: 'Network Monitoring & Troubleshooting flow', section: 'Intermediate' },
  { title: 'Firewall-cmd basics', section: 'Intermediate' }
]);

// ===== PORTS & PROTOCOLS =====
window.LM.registerPage('ports-protocols', `
<h1 class="page-title">Ports & Protocols</h1>
<p class="page-subtitle">Understand how services communicate and how to identify, scan, and secure network ports</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔌</span> Understanding Ports and Protocols</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    If an <strong>IP address</strong> is a building's street address, a <strong>Port</strong> is a specific apartment or office number in that building. A <strong>Protocol</strong> is the language spoken by the receptionist at that office. You can't just send mail to the building; you need to specify which office it goes to and speak their language!
  </div>
  <p>Every network service on Linux binds to a port number between <strong>0 and 65535</strong>. Ports 0-1023 are <strong>well-known ports</strong> and usually require root privileges to bind to.</p>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🚦</span> Common Network Protocols</h2>
  <p>Data travels across the network using different transport protocols. The two most common are TCP and UDP, but ICMP is also essential for diagnostics.</p>
  <table class="styled-table">
    <thead><tr><th>Protocol</th><th>Name</th><th>Characteristics</th><th>Real-World Use</th></tr></thead>
    <tbody>
      <tr><td><strong>TCP</strong></td><td>Transmission Control Protocol</td><td>Reliable, connection-oriented. Uses a 3-way handshake (SYN, SYN-ACK, ACK) to guarantee delivery. Slower but safe.</td><td>Web browsing (HTTP/S), SSH, File transfers (FTP)</td></tr>
      <tr><td><strong>UDP</strong></td><td>User Datagram Protocol</td><td>Connectionless, "fire and forget". Faster but does not guarantee delivery. Packets can arrive out of order or get lost.</td><td>DNS queries, Video streaming, VoIP, Gaming</td></tr>
      <tr><td><strong>ICMP</strong></td><td>Internet Control Message Protocol</td><td>Used for network diagnostics and error reporting rather than data transfer. No ports used.</td><td>Ping, Traceroute</td></tr>
    </tbody>
  </table>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🗂️</span> Common Network Services & Default Ports</h2>
  <p>Linux administrators must memorize these common ports. They are standard conventions, but you can configure services to run on non-standard ports for security through obscurity.</p>
  <table class="styled-table">
    <thead><tr><th>Port</th><th>Service</th><th>Protocol</th><th>Purpose</th></tr></thead>
    <tbody>
      <tr><td>21</td><td>FTP</td><td>TCP</td><td>File Transfer Protocol (insecure, sends passwords in plain text)</td></tr>
      <tr><td>22</td><td>SSH</td><td>TCP</td><td>Secure Shell (encrypted remote administration)</td></tr>
      <tr><td>25 / 587</td><td>SMTP</td><td>TCP</td><td>Simple Mail Transfer Protocol (sending emails)</td></tr>
      <tr><td>53</td><td>DNS</td><td>TCP/UDP</td><td>Domain Name System (translates domain names to IPs)</td></tr>
      <tr><td>80</td><td>HTTP</td><td>TCP</td><td>Unencrypted web traffic</td></tr>
      <tr><td>443</td><td>HTTPS</td><td>TCP</td><td>Encrypted web traffic</td></tr>
      <tr><td>3306</td><td>MySQL/MariaDB</td><td>TCP</td><td>Database connections</td></tr>
    </tbody>
  </table>
  <div class="info-box"><span class="info-icon">💡</span><div><strong>Look up ports:</strong> The file <code class="code-inline">/etc/services</code> contains a list of all recognized services and their default ports. Try <code class="code-inline">cat /etc/services | grep -w 22</code>.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📡</span> Port Scanning & Services Identification</h2>
  <p>To secure a server, you must know what ports are open. An open port means a service is listening and potentially vulnerable.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash — Local Port Identification</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Find out what is listening on the current machine</span>
<span class="cmd">ss</span> <span class="flag">-tulnp</span>                           <span class="comment"># Modern standard (replaces netstat)</span>
<span class="comment"># Flags: t=TCP, u=UDP, l=listening, n=numeric (no DNS resolution), p=show process</span>

<span class="cmd">lsof</span> <span class="flag">-i</span> <span class="path">:22</span>                         <span class="comment"># Find what process is using port 22</span>
<span class="cmd">lsof</span> <span class="flag">-iTCP -sTCP:LISTEN</span>             <span class="comment"># Show all listening TCP ports</span>
</pre></div>

  <div class="code-block"><div class="code-header"><span class="lang">bash — Remote Port Scanning (Nmap)</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Scan an external server to see its open ports</span>
<span class="cmd">nmap</span> <span class="path">192.168.1.50</span>                   <span class="comment"># Basic scan of top 1000 ports</span>
<span class="cmd">nmap</span> <span class="flag">-p-</span> <span class="path">192.168.1.50</span>               <span class="comment"># Scan ALL 65535 ports</span>
<span class="cmd">nmap</span> <span class="flag">-sV</span> <span class="path">192.168.1.50</span>               <span class="comment"># Version detection (what app is running?)</span>
<span class="cmd">nc</span> <span class="flag">-zv</span> <span class="path">192.168.1.50</span> <span class="num">22</span>              <span class="comment"># Netcat: Check if port 22 is open quickly</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🩺</span> Network Troubleshooting & Diagnostics</h2>
  <p>When a service isn't reachable, follow these steps to isolate the issue.</p>
  <ul class="styled-list">
    <li><strong>Is the service running?</strong> Check with <code class="code-inline">systemctl status sshd</code></li>
    <li><strong>Is it listening?</strong> Run <code class="code-inline">ss -tulnp | grep :22</code>. If it binds to <code class="code-inline">127.0.0.1</code>, it's only accessible locally. It needs to bind to <code class="code-inline">0.0.0.0</code> (all IPv4) or the specific public IP.</li>
    <li><strong>Is the firewall blocking it?</strong> Even if it's listening, a firewall might drop external traffic. Check <code class="code-inline">firewall-cmd --list-all</code> or <code class="code-inline">iptables -L</code>.</li>
    <li><strong>Is there a routing issue?</strong> Use <code class="code-inline">ping</code> or <code class="code-inline">traceroute</code> from the client to see if the server is reachable.</li>
    <li><strong>Is the port open from the outside?</strong> Run <code class="code-inline">nc -zv server_ip port</code> from a different machine.</li>
  </ul>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🛡️</span> Security Considerations When Opening Ports</h2>
  <div class="info-box danger"><span class="info-icon">🚫</span><div><strong>Golden Rule:</strong> Only open ports that are absolutely necessary. The concept of <strong>Least Privilege</strong> applies to networks too!</div></div>
  <ul class="styled-list">
    <li><strong>Change Default Ports:</strong> Moving SSH from 22 to a random high port (e.g., 2222) stops automated bot attacks, though it won't stop a targeted scan.</li>
    <li><strong>Bind to Localhost:</strong> If a database (like MySQL) only needs to communicate with a web server on the same machine, configure it to listen on <code class="code-inline">127.0.0.1</code> (localhost) rather than <code class="code-inline">0.0.0.0</code>. It won't be exposed to the internet, bypassing the need for a firewall rule.</li>
    <li><strong>Restrict by IP:</strong> Don't just open a port to the world. If only the office IP needs access to a management port, restrict the firewall rule to that specific source IP.</li>
    <li><strong>Keep Services Updated:</strong> An open port is a doorway. If the software listening behind the door has a vulnerability, attackers can get in. Always patch internet-facing services!</li>
  </ul>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  { title: 'Ports and Protocols TCP UDP ICMP', section: 'Intermediate' },
  { title: 'Common Ports SSH HTTP FTP', section: 'Intermediate' },
  { title: 'Port Scanning nmap ss lsof', section: 'Intermediate' },
  { title: 'Port Security localhost binding', section: 'Intermediate' },
  { title: 'Network troubleshooting ports diagnostics', section: 'Intermediate' }
]);

window.LM.registerPage('storage', `
<h1 class="page-title">Disk Management & Advanced LVM</h1>
<p class="page-subtitle">Master partitions, Logical Volume Management (LVM), and filesystem operations for production storage</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">💽</span> Understanding Disk Devices & Partitions</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Think of a raw hard disk as an <strong>empty plot of land</strong>. Partitioning is drawing boundary lines to divide it into smaller plots. A filesystem (EXT4, XFS) is like building houses on each plot. Mounting is adding a front door (access point) so people can enter the house.</div>
  
  <div class="code-block"><div class="code-header"><span class="lang">bash — Device Identification</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View disks, partitions, and block devices</span>
<span class="cmd">lsblk</span> <span class="flag">-f</span>                           <span class="comment"># Tree view with filesystem types and UUIDs</span>
<span class="cmd">fdisk</span> <span class="flag">-l</span>                           <span class="comment"># Detailed list of all partitions and disk geometry</span>
<span class="cmd">df</span> <span class="flag">-h</span>                              <span class="comment"># View mounted filesystem usage</span>
<span class="cmd">blkid</span>                              <span class="comment"># Print UUIDs and filesystem formats</span></pre></div>

  <div class="code-block"><div class="code-header"><span class="lang">bash — Partitioning Disks</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Interactive partitioning with fdisk (MBR/GPT)</span>
<span class="cmd">fdisk</span> <span class="path">/dev/sdb</span>                     <span class="comment"># Open interactive shell for /dev/sdb</span>
<span class="comment"># Keys: n (new), p (print), d (delete), t (change type e.g., to LVM 8e), w (write/save)</span>

<span class="comment"># Converting partition tables</span>
<span class="cmd">parted</span> <span class="path">/dev/sdb</span> <span class="flag">mklabel gpt</span>        <span class="comment"># Use GPT for disks > 2TB</span>
<span class="cmd">parted</span> <span class="path">/dev/sdb</span> <span class="flag">mklabel msdos</span>      <span class="comment"># Legacy MBR format</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧱</span> LVM Architecture & Components</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    Traditional partitions are rigid—like <strong>concrete walls</strong>. Once built, you can't easily move them. LVM is like a <strong>flexible modular office space</strong>.<br><br>
    • <strong>Physical Volumes (PV):</strong> The raw physical hard drives (the raw building materials).<br>
    • <strong>Volume Groups (VG):</strong> A massive pool of storage created by combining PVs (merging materials into one giant warehouse).<br>
    • <strong>Logical Volumes (LV):</strong> The actual usable "partitions" carved out of the VG (the individual office rooms). These walls are <em>elastic</em>—you can shrink or expand them anytime across multiple physical disks!
  </div>
  <div class="code-block"><div class="code-header"><span class="lang">bash — Status Commands</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># High-level overview</span>
<span class="cmd">pvs</span>                                <span class="comment"># List Physical Volumes</span>
<span class="cmd">vgs</span>                                <span class="comment"># List Volume Groups</span>
<span class="cmd">lvs</span>                                <span class="comment"># List Logical Volumes</span>

<span class="comment"># Detailed properties</span>
<span class="cmd">pvdisplay</span>                          <span class="comment"># Detailed PV properties</span>
<span class="cmd">vgdisplay</span>                          <span class="comment"># Detailed VG properties</span>
<span class="cmd">lvdisplay</span>                          <span class="comment"># Detailed LV properties</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">⚙️</span> Configuring PVs and VGs</h2>
  <p>Before creating usable elastic storage, you initialize raw disks and pool them.</p>
  
  <h3 style="margin-top:1.5rem;color:var(--accent);">1. Physical Volumes (PV)</h3>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Initialize raw disks for LVM use</span>
<span class="cmd">pvcreate</span> <span class="path">/dev/sdb1</span> <span class="path">/dev/sdc1</span>
<span class="comment"># Wipe LVM metadata from a disk</span>
<span class="cmd">pvremove</span> <span class="path">/dev/sdc1</span></pre></div>

  <h3 style="margin-top:1.5rem;color:var(--accent);">2. Volume Groups (VG)</h3>
  <p>The VG is your central storage pool. As your server grows, dynamically add disks here.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Create a new VG named 'datavg' pooling two PVs</span>
<span class="cmd">vgcreate</span> <span class="path">datavg</span> <span class="path">/dev/sdb1</span> <span class="path">/dev/sdc1</span>

<span class="comment"># Adding Disks with VolumeGroup (Modifying/Extending VG)</span>
<span class="comment"># Scenario: Out of space! Plug in a new disk (/dev/sdd).</span>
<span class="cmd">pvcreate</span> <span class="path">/dev/sdd</span>                  <span class="comment"># 1. Initialize new disk</span>
<span class="cmd">vgextend</span> <span class="path">datavg</span> <span class="path">/dev/sdd</span>          <span class="comment"># 2. Add it to the existing pool</span>

<span class="comment"># Reducing a VG (Removing a disk)</span>
<span class="comment"># Note: Disk must be completely empty of LV data first!</span>
<span class="cmd">vgreduce</span> <span class="path">datavg</span> <span class="path">/dev/sdc1</span>         <span class="comment"># Remove the disk from the pool</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📏</span> Creating & Resizing Logical Volumes</h2>
  <p>LVs host your filesystems. Unlike traditional partitions, LVs can span multiple disks and be expanded online.</p>
  
  <h3 style="margin-top:1.5rem;color:var(--accent);">Creating Logical Volumes</h3>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Create a 50GB LV named 'datalv' from 'datavg'</span>
<span class="cmd">lvcreate</span> <span class="flag">-L 50G</span> <span class="flag">-n</span> <span class="path">datalv datavg</span>

<span class="comment"># Use 100% of the remaining FREE space in the VG</span>
<span class="cmd">lvcreate</span> <span class="flag">-l 100%FREE</span> <span class="flag">-n</span> <span class="path">datalv datavg</span>

<span class="comment"># Format and Mount</span>
<span class="cmd">mkfs.xfs</span> <span class="path">/dev/datavg/datalv</span>       <span class="comment"># Format as XFS</span>
<span class="cmd">mount</span> <span class="path">/dev/datavg/datalv</span> <span class="path">/mnt/data</span> <span class="comment"># Mount to access it</span></pre></div>

  <h3 style="margin-top:1.5rem;color:var(--accent);">Extending Logical Volumes</h3>
  <div class="info-box"><span class="info-icon">💡</span><div><strong>Insight:</strong> Extension is a two-step dance: 1) Stretch the logical container (<code class="code-inline">lvextend</code>). 2) Stretch the filesystem inside it to recognize the new space (<code class="code-inline">xfs_growfs</code> or <code class="code-inline">resize2fs</code>). The <code class="code-inline">-r</code> flag in lvextend beautifully does both at once!</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># The modern way: Add 10GB and resize filesystem automatically</span>
<span class="cmd">lvextend</span> <span class="flag">-r</span> <span class="flag">-L +10G</span> <span class="path">/dev/datavg/datalv</span>

<span class="comment"># The manual 2-step method:</span>
<span class="cmd">lvextend</span> <span class="flag">-L +10G</span> <span class="path">/dev/datavg/datalv</span>
<span class="cmd">xfs_growfs</span> <span class="path">/mnt/data</span>               <span class="comment"># If using XFS</span>
<span class="cmd">resize2fs</span> <span class="path">/dev/datavg/datalv</span>       <span class="comment"># If using EXT4</span></pre></div>

  <h3 style="margin-top:1.5rem;color:var(--accent);">Reducing Logical Volumes</h3>
  <div class="info-box danger"><span class="info-icon">🚫</span><div><strong>CRITICAL WARNING:</strong> Data loss risk! You <strong>cannot</strong> reduce XFS filesystems. If you must reduce an EXT4 filesystem, you MUST unmount it first, shrink the filesystem, and THEN shrink the LV. Doing this out of order destroys your data.</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Reducing an EXT4 LV safely to exactly 20GB</span>
<span class="cmd">umount</span> <span class="path">/mnt/data</span>                   <span class="comment"># 1. Unmount (requires downtime!)</span>
<span class="cmd">e2fsck</span> <span class="flag">-f</span> <span class="path">/dev/datavg/datalv</span>      <span class="comment"># 2. Force check filesystem</span>
<span class="cmd">resize2fs</span> <span class="path">/dev/datavg/datalv</span> <span class="path">20G</span>   <span class="comment"># 3. Shrink FILESYSTEM first!</span>
<span class="cmd">lvreduce</span> <span class="flag">-L 20G</span> <span class="path">/dev/datavg/datalv</span> <span class="comment"># 4. Shrink LOGICAL VOLUME</span>
<span class="cmd">mount</span> <span class="path">/dev/datavg/datalv</span> <span class="path">/mnt/data</span> <span class="comment"># 5. Remount</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔀</span> Advanced LVM & Disk Management</h2>
  <p>LVM allows for complex storage migrations across physical devices without destroying data.</p>
  
  <h3 style="margin-top:1.5rem;color:var(--accent);">1. Evacuating Data (pvmove)</h3>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>If a hard drive (<code class="code-inline">/dev/sdb</code>) in your pool is failing, you don't need downtime! <code class="code-inline">pvmove</code> smoothly slides all live data onto another disk while the server is running, like migrating tenants to a new building before demolishing the old one.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Move all data off the failing /dev/sdb onto other PVs in the VG</span>
<span class="cmd">pvmove</span> <span class="path">/dev/sdb</span>
<span class="comment"># Safely remove the empty disk from the pool</span>
<span class="cmd">vgreduce</span> <span class="path">datavg</span> <span class="path">/dev/sdb</span>
<span class="cmd">pvremove</span> <span class="path">/dev/sdb</span></pre></div>

  <h3 style="margin-top:1.5rem;color:var(--accent);">2. Moving LVs, Splitting & Merging VGs</h3>
  <p>You cannot directly "move" an LV from one Volume Group to another with a single command. Instead, you merge the VGs, or split an existing VG.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Merging: Combine 'vg_old' into 'vg_new'</span>
<span class="comment"># This effectively moves all LVs in vg_old into vg_new.</span>
<span class="cmd">vgchange</span> <span class="flag">-an</span> <span class="path">vg_old</span>                <span class="comment"># Deactivate the old VG first</span>
<span class="cmd">vgmerge</span> <span class="path">vg_new</span> <span class="path">vg_old</span>

<span class="comment"># Splitting: Move a Physical Volume (/dev/sdb) from 'datavg' to a new VG 'backupvg'</span>
<span class="comment"># Note: /dev/sdb must only contain the LVs you want to split off!</span>
<span class="cmd">vgchange</span> <span class="flag">-an</span> <span class="path">datavg</span>
<span class="cmd">vgsplit</span> <span class="path">datavg backupvg</span> <span class="path">/dev/sdb</span>
<span class="cmd">vgchange</span> <span class="flag">-ay</span> <span class="path">datavg backupvg</span>       <span class="comment"># Reactivate both</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">💾</span> Persistent Mounting (fstab)</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Add entry to /etc/fstab to mount on boot</span>
<span class="comment"># Format: Device/UUID  MountPoint  Filesystem  Options  Dump  Pass</span>
<span class="output">/dev/datavg/datalv  /mnt/data  xfs   defaults   0 0</span>
<span class="output">UUID=1234-5678      /backup    ext4  defaults   0 2</span>

<span class="comment"># Always verify fstab syntax before rebooting!</span>
<span class="cmd">mount</span> <span class="flag">-a</span>                           <span class="comment"># Mounts everything in fstab</span></pre></div>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  { title: 'Disk Partitions fdisk lsblk', section: 'Intermediate' },
  { title: 'LVM Components PV VG LV', section: 'Intermediate' },
  { title: 'Configuring PV pvcreate pvremove', section: 'Intermediate' },
  { title: 'Creating VG vgcreate Adding Disks', section: 'Intermediate' },
  { title: 'Resizing LV lvextend lvreduce', section: 'Intermediate' },
  { title: 'Advanced LVM pvmove vgmerge vgsplit', section: 'Intermediate' },
  { title: 'Persistent Mount fstab', section: 'Intermediate' }
]);

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
`, [{ title: 'systemctl start stop restart enable', section: 'Intermediate' }, { title: 'journalctl service logs', section: 'Intermediate' }, { title: 'systemd service management', section: 'Intermediate' }]);

// ===== UMASK & PATH =====
window.LM.registerPage('umask-path', `
<h1 class="page-title">Umask & Path</h1>
<p class="page-subtitle">Understand how default file permissions and command resolution work behind the scenes in Linux</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🎭</span> Understanding Umask</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    Think of umask like a <strong>permission filter at a factory gate</strong>. Every new product (file) comes off the line with maximum features. The umask is a checkpoint that <strong>strips away</strong> certain features before the product reaches the shelf. A umask of 022 says: "remove write permission from group and others on every new file."
  </div>
  <p>When you create a file or directory, Linux starts with a <strong>base permission</strong> and then <strong>subtracts</strong> the umask to get the <strong>effective permission</strong>.</p>
  <table class="styled-table">
    <thead><tr><th>Item</th><th>Base Permission</th><th>Why?</th></tr></thead>
    <tbody>
      <tr><td>Files</td><td>666 (rw-rw-rw-)</td><td>Files are NOT executable by default for security</td></tr>
      <tr><td>Directories</td><td>777 (rwxrwxrwx)</td><td>Directories need execute (x) to be traversable</td></tr>
    </tbody>
  </table>

  <h3 style="margin-top:1.5rem;color:var(--accent);">Octal vs Symbolic Notation</h3>
  <p><strong>Octal notation</strong> uses numbers (e.g., <code class="code-inline">0022</code>). Each digit maps to owner, group, others. <strong>Symbolic notation</strong> uses letters (e.g., <code class="code-inline">u=rwx,g=rx,o=rx</code>).</p>
  <table class="styled-table">
    <thead><tr><th>Umask</th><th>Symbolic</th><th>Files Get</th><th>Dirs Get</th><th>Use Case</th></tr></thead>
    <tbody>
      <tr><td>0022</td><td>u=rwx,g=rx,o=rx</td><td>644 (rw-r--r--)</td><td>755 (rwxr-xr-x)</td><td>Default — secure for servers</td></tr>
      <tr><td>0077</td><td>u=rwx,g=,o=</td><td>600 (rw-------)</td><td>700 (rwx------)</td><td>Strict — only owner access</td></tr>
      <tr><td>0002</td><td>u=rwx,g=rwx,o=rx</td><td>664 (rw-rw-r--)</td><td>775 (rwxrwxr-x)</td><td>Collaborative — group can write</td></tr>
      <tr><td>0027</td><td>u=rwx,g=rx,o=</td><td>640 (rw-r-----)</td><td>750 (rwxr-x---)</td><td>Group reads, others blocked</td></tr>
    </tbody>
  </table>

  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View your current umask</span>
<span class="cmd">umask</span>                              <span class="comment"># Shows octal (e.g., 0022)</span>
<span class="cmd">umask</span> <span class="flag">-S</span>                           <span class="comment"># Shows symbolic (e.g., u=rwx,g=rx,o=rx)</span>

<span class="comment"># How to calculate effective permissions:</span>
<span class="comment"># Formula:  Effective = Base - Umask</span>
<span class="comment">#</span>
<span class="comment"># Example with umask 0022:</span>
<span class="comment">#   File:  666 - 022 = 644  →  rw-r--r--</span>
<span class="comment">#   Dir:   777 - 022 = 755  →  rwxr-xr-x</span>
<span class="comment">#</span>
<span class="comment"># Example with umask 0077:</span>
<span class="comment">#   File:  666 - 077 = 600  →  rw-------</span>
<span class="comment">#   Dir:   777 - 077 = 700  →  rwx------</span>

<span class="comment"># Verify by creating test files</span>
<span class="cmd">umask</span> <span class="num">0022</span>
<span class="cmd">touch</span> <span class="path">testfile</span> && <span class="cmd">mkdir</span> <span class="path">testdir</span>
<span class="cmd">ls</span> <span class="flag">-l</span> <span class="path">testfile</span>                    <span class="comment"># -rw-r--r--  (644)</span>
<span class="cmd">ls</span> <span class="flag">-ld</span> <span class="path">testdir</span>                    <span class="comment"># drwxr-xr-x  (755)</span></pre></div>
  <div class="info-box warning"><span class="info-icon">⚠️</span><div><strong>Technically it's a bitwise AND-NOT:</strong> The subtraction is actually <code class="code-inline">base AND (NOT umask)</code>. For most cases subtraction works, but edge cases like umask 033 on files: <code class="code-inline">666 AND ~033 = 644</code>, NOT 633. The umask can only <em>remove</em> permissions, never add ones the base doesn't have.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔧</span> Setting & Modifying Umask</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># ── TEMPORARY (current shell session only) ──</span>
<span class="cmd">umask</span> <span class="num">0077</span>                         <span class="comment"># Set strict umask for this session</span>
<span class="cmd">touch</span> <span class="path">secret.txt</span>                   <span class="comment"># Created with 600 permissions</span>
<span class="comment"># This resets when you close the terminal!</span>

<span class="comment"># ── PERMANENT for a single user ──</span>
<span class="cmd">echo</span> <span class="string">"umask 0027"</span> >> <span class="path">~/.bashrc</span>    <span class="comment"># For bash users</span>
<span class="cmd">echo</span> <span class="string">"umask 0027"</span> >> <span class="path">~/.profile</span>   <span class="comment"># For login shells</span>
<span class="cmd">source</span> <span class="path">~/.bashrc</span>                   <span class="comment"># Apply immediately without logout</span>

<span class="comment"># ── PERMANENT for ALL users (system-wide) ──</span>
<span class="cmd">sudo</span> <span class="cmd">vi</span> <span class="path">/etc/profile</span>              <span class="comment"># Add: umask 0027</span>
<span class="cmd">grep</span> <span class="string">"UMASK"</span> <span class="path">/etc/login.defs</span>     <span class="comment"># System default umask setting</span>

<span class="comment"># ── PAM-based umask (most modern distros) ──</span>
<span class="cmd">cat</span> <span class="path">/etc/pam.d/common-session</span>     <span class="comment"># Look for: session optional pam_umask.so</span>
<span class="comment"># PAM overrides shell profile umask if configured</span></pre></div>
  <div class="info-box"><span class="info-icon">💡</span><div><strong>Load Order Matters:</strong> Umask can be set in multiple places. The <strong>last one loaded wins</strong>: <code class="code-inline">/etc/profile</code> → <code class="code-inline">/etc/bashrc</code> → <code class="code-inline">~/.bash_profile</code> → <code class="code-inline">~/.bashrc</code>. If your umask isn't sticking, check if a later file overrides it.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🛤️</span> Understanding the PATH Variable</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    PATH is like a <strong>contact list on your phone</strong>. When you type a command like <code class="code-inline">ls</code>, Linux doesn't search the entire filesystem. It only looks in PATH directories — just like you search contacts by name instead of scrolling through every phone number in the world. If it's not saved, you dial the full number (absolute path).
  </div>
  <p>The shell searches each directory in <code class="code-inline">\$PATH</code> <strong>left to right</strong> and runs the <strong>first match</strong>. If no match is found you get <code class="code-inline">command not found</code>.</p>

  <h3 style="margin-top:1.5rem;color:var(--accent);">Absolute vs Relative Paths</h3>
  <table class="styled-table">
    <thead><tr><th>Type</th><th>Example</th><th>How It Works</th><th>When to Use</th></tr></thead>
    <tbody>
      <tr><td>Absolute</td><td>/usr/bin/python3</td><td>Full path from root (/). Always works</td><td>Scripts, cron jobs, systemd</td></tr>
      <tr><td>Relative</td><td>./script.sh</td><td>Relative to current working directory</td><td>Running local scripts</td></tr>
      <tr><td>PATH-based</td><td>python3</td><td>Shell searches \$PATH left-to-right</td><td>Installed system commands</td></tr>
    </tbody>
  </table>

  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># View your current PATH</span>
<span class="cmd">echo</span> <span class="path">\$PATH</span>
<span class="output">/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin</span>

<span class="comment"># See it as a readable list</span>
<span class="cmd">echo</span> <span class="path">\$PATH</span> | <span class="cmd">tr</span> <span class="string">':'</span> <span class="string">'\\n'</span>

<span class="comment"># Find WHERE a command lives</span>
<span class="cmd">which</span> <span class="path">python3</span>                      <span class="comment"># /usr/bin/python3</span>
<span class="cmd">whereis</span> <span class="path">python3</span>                    <span class="comment"># Shows binary, source, and man pages</span>
<span class="cmd">type</span> <span class="path">python3</span>                       <span class="comment"># Shows if alias, builtin, or file</span>

<span class="comment"># Why ./script.sh is needed for local scripts:</span>
<span class="comment"># Current directory (.) is NOT in PATH by default (security!)</span>
<span class="comment"># If . were in PATH, a malicious "ls" in /tmp could run instead of /usr/bin/ls</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">⚙️</span> Managing the PATH Variable</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># ── ADD a directory to PATH ──</span>

<span class="comment"># Temporary (current session only)</span>
<span class="cmd">export</span> <span class="path">PATH</span>=<span class="string">"\$PATH:/opt/myapp/bin"</span>       <span class="comment"># Append (searched LAST)</span>
<span class="cmd">export</span> <span class="path">PATH</span>=<span class="string">"/opt/myapp/bin:\$PATH"</span>       <span class="comment"># Prepend (searched FIRST)</span>

<span class="comment"># Permanent for current user</span>
<span class="cmd">echo</span> <span class="string">'export PATH="\$PATH:/opt/myapp/bin"'</span> >> <span class="path">~/.bashrc</span>
<span class="cmd">source</span> <span class="path">~/.bashrc</span>

<span class="comment"># Permanent for ALL users</span>
<span class="comment"># Option 1: Drop a script in /etc/profile.d/</span>
<span class="cmd">sudo</span> <span class="cmd">bash</span> <span class="flag">-c</span> <span class="string">'echo "export PATH=\\$PATH:/opt/myapp/bin" > /etc/profile.d/myapp.sh'</span>
<span class="cmd">sudo</span> <span class="cmd">chmod</span> <span class="num">644</span> <span class="path">/etc/profile.d/myapp.sh</span>

<span class="comment"># Option 2: Edit /etc/environment (non-shell programs also read it)</span>
<span class="cmd">sudo</span> <span class="cmd">vi</span> <span class="path">/etc/environment</span>

<span class="comment"># ── REMOVE a directory from PATH ──</span>
<span class="cmd">export</span> <span class="path">PATH</span>=$(<span class="cmd">echo</span> <span class="path">\$PATH</span> | <span class="cmd">sed</span> <span class="string">'s|:/opt/myapp/bin||g'</span>)

<span class="comment"># Or filter with grep:</span>
<span class="cmd">export</span> <span class="path">PATH</span>=$(<span class="cmd">echo</span> <span class="path">\$PATH</span> | <span class="cmd">tr</span> <span class="string">':'</span> <span class="string">'\\n'</span> | <span class="cmd">grep</span> <span class="flag">-v</span> <span class="string">"/opt/myapp"</span> | <span class="cmd">tr</span> <span class="string">'\\n'</span> <span class="string">':'</span>)

<span class="comment"># For permanent removal, edit the file where it was added</span></pre></div>
  <div class="info-box warning"><span class="info-icon">⚠️</span><div><strong>Never do:</strong> <code class="code-inline">export PATH="/opt/myapp/bin"</code> — This <strong>replaces</strong> your entire PATH! You lose access to basic commands like ls, cat, grep. Always include <code class="code-inline">\$PATH</code> to preserve existing entries.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🐛</span> Troubleshooting & Debugging</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash — Umask Issues</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Problem: Files created with wrong permissions</span>

<span class="comment"># 1. Check current effective umask</span>
<span class="cmd">umask</span>
<span class="cmd">umask</span> <span class="flag">-S</span>

<span class="comment"># 2. Find WHERE umask is being set</span>
<span class="cmd">grep</span> <span class="flag">-rn</span> <span class="string">"umask"</span> <span class="path">/etc/profile /etc/bashrc /etc/profile.d/ ~/.bashrc ~/.bash_profile</span> <span class="num">2>/dev/null</span>

<span class="comment"># 3. Check PAM config (often overrides shell umask)</span>
<span class="cmd">grep</span> <span class="flag">-r</span> <span class="string">"pam_umask"</span> <span class="path">/etc/pam.d/</span>

<span class="comment"># 4. Check /etc/login.defs</span>
<span class="cmd">grep</span> <span class="string">"^UMASK"</span> <span class="path">/etc/login.defs</span>

<span class="comment"># 5. For services, umask is separate per unit file</span>
<span class="cmd">systemctl</span> <span class="flag">show</span> <span class="path">httpd</span> | <span class="cmd">grep</span> <span class="string">UMask</span></pre></div>

  <div class="code-block"><div class="code-header"><span class="lang">bash — PATH Issues</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Problem: "command not found" even though it's installed</span>

<span class="comment"># 1. Find the binary</span>
<span class="cmd">find</span> <span class="path">/</span> <span class="flag">-name</span> <span class="string">"mycommand"</span> <span class="flag">-type f</span> <span class="num">2>/dev/null</span>

<span class="comment"># 2. Is its directory in PATH?</span>
<span class="cmd">echo</span> <span class="path">\$PATH</span> | <span class="cmd">tr</span> <span class="string">':'</span> <span class="string">'\\n'</span>

<span class="comment"># 3. Is the binary executable?</span>
<span class="cmd">ls</span> <span class="flag">-l</span> <span class="path">/opt/myapp/bin/mycommand</span>

<span class="comment"># 4. Stale hash table? Bash caches command locations</span>
<span class="cmd">hash</span> <span class="flag">-r</span>                            <span class="comment"># Clear all cached paths</span>

<span class="comment"># 5. Different PATH for sudo vs regular user</span>
<span class="cmd">echo</span> <span class="path">\$PATH</span>                         <span class="comment"># User's PATH</span>
<span class="cmd">sudo</span> <span class="cmd">env</span> | <span class="cmd">grep</span> <span class="string">PATH</span>              <span class="comment"># Root's PATH (may differ!)</span>
<span class="comment"># Fix: use full path or edit secure_path in /etc/sudoers</span>

<span class="comment"># 6. Login vs non-login shell loads different files</span>
<span class="comment"># Login shell:      /etc/profile → ~/.bash_profile</span>
<span class="comment"># Non-login shell:  /etc/bashrc  → ~/.bashrc</span>
<span class="comment"># Best practice: Set PATH in ~/.bashrc AND source it from ~/.bash_profile</span></pre></div>
  <div class="info-box danger"><span class="info-icon">🚫</span><div><strong>Security Warning:</strong> Never add <code class="code-inline">.</code> (current directory) to PATH. An attacker could place a malicious <code class="code-inline">ls</code> script in <code class="code-inline">/tmp</code> and trick you into running it. This is called a <strong>PATH injection attack</strong>.</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🎯</span> Interview Questions</h2>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> What is the default umask and what permissions does it give?<span class="arrow-acc">▼</span></button><div class="accordion-body">Default umask is <code class="code-inline">0022</code>. Files: 666 - 022 = <strong>644</strong> (rw-r--r--). Directories: 777 - 022 = <strong>755</strong> (rwxr-xr-x). Owner gets full access, group and others get read-only.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> How do you make umask changes permanent for all users?<span class="arrow-acc">▼</span></button><div class="accordion-body">Add umask to <code class="code-inline">/etc/profile</code> or create a script in <code class="code-inline">/etc/profile.d/</code>. On PAM-based systems, configure <code class="code-inline">pam_umask.so</code> and set the value in <code class="code-inline">/etc/login.defs</code>. PAM takes priority over shell profiles.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> Why is . not in PATH by default?<span class="arrow-acc">▼</span></button><div class="accordion-body">Security. An attacker could create a malicious script named <code class="code-inline">ls</code> in <code class="code-inline">/tmp</code>. If <code class="code-inline">.</code> is in PATH, running <code class="code-inline">ls</code> there executes the malicious version. This is a <strong>PATH injection attack</strong>.</div></div>
  <div class="accordion-item"><button class="accordion-header"><span class="q-badge">Q</span> A command works as user but not with sudo. Why?<span class="arrow-acc">▼</span></button><div class="accordion-body">sudo uses <code class="code-inline">secure_path</code> from <code class="code-inline">/etc/sudoers</code> which may not include the command's directory. Fix: add the directory to secure_path, use the full absolute path, or run <code class="code-inline">sudo env "PATH=\$PATH" command</code>.</div></div>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  { title: 'Umask default file permissions', section: 'Intermediate' },
  { title: 'umask octal symbolic notation', section: 'Intermediate' },
  { title: 'Calculating effective permissions umask', section: 'Intermediate' },
  { title: 'PATH variable executable resolution', section: 'Intermediate' },
  { title: 'Absolute relative path Linux', section: 'Intermediate' },
  { title: 'Setting PATH bashrc profile', section: 'Intermediate' },
  { title: 'Debugging umask PATH problems', section: 'Intermediate' },
  { title: 'secure_path sudoers PATH', section: 'Intermediate' }
]);

// ===== RPM PACKAGE MANAGEMENT =====
window.LM.registerPage('rpm', `
<h1 class="page-title">RPM Package Management</h1>
<p class="page-subtitle">Understand the foundational package manager for Red Hat-based systems, package structures, and build environments.</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📦</span> Components of an RPM Package</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    An RPM package is like a <strong>pre-assembled piece of furniture in a box</strong>. The box contains the physical parts (binaries/scripts), an instruction manual on how to assemble it (install scripts), a list of other tools you might need (dependencies), and a label describing what it is (metadata).
  </div>
  <p>An RPM (Red Hat Package Manager) file typically consists of four main components:</p>
  <ul class="styled-list">
    <li><strong>Metadata:</strong> Information about the package, including its name, version, release, architecture, and a brief description.</li>
    <li><strong>Payload:</strong> The actual files (binaries, configuration files, documentation) that will be installed on the system. It's an archive, usually compressed using cpio and gzip/xz.</li>
    <li><strong>Scripts:</strong> Optional shell scripts that run at specific stages (pre-install, post-install, pre-uninstall, post-uninstall) to configure the system environment properly.</li>
    <li><strong>Signatures:</strong> Cryptographic signatures (like GPG) used to verify the integrity and authenticity of the package, ensuring it hasn't been tampered with.</li>
  </ul>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🛠️</span> RPM Package Management</h2>
  <p>While <code>yum</code> or <code>dnf</code> are preferred for high-level management because they handle dependencies, the <code>rpm</code> command remains essential for low-level tasks, querying, and verification.</p>
  
  <div class="code-block"><div class="code-header"><span class="lang">bash — Querying and Verification</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Querying installed packages</span>
<span class="cmd">rpm</span> <span class="flag">-qa</span>                          <span class="comment"># List all installed packages</span>
<span class="cmd">rpm</span> <span class="flag">-qi</span> <span class="path">httpd</span>                      <span class="comment"># Display detailed info about an installed package</span>
<span class="cmd">rpm</span> <span class="flag">-ql</span> <span class="path">httpd</span>                      <span class="comment"># List all files installed by a package</span>
<span class="cmd">rpm</span> <span class="flag">-qf</span> <span class="path">/etc/passwd</span>                <span class="comment"># Find out WHICH package owns a specific file</span>
<span class="cmd">rpm</span> <span class="flag">-qc</span> <span class="path">httpd</span>                      <span class="comment"># List only configuration files for a package</span>

<span class="comment"># Querying uninstalled RPM files (.rpm)</span>
<span class="cmd">rpm</span> <span class="flag">-qpi</span> <span class="path">package.rpm</span>               <span class="comment"># View info of an uninstalled package file</span>
<span class="cmd">rpm</span> <span class="flag">-qpl</span> <span class="path">package.rpm</span>               <span class="comment"># List files inside an uninstalled package</span>

<span class="comment"># Verification (Checks if files were modified since installation)</span>
<span class="cmd">rpm</span> <span class="flag">-V</span> <span class="path">httpd</span>                       <span class="comment"># Verify an installed package</span>
<span class="cmd">rpm</span> <span class="flag">-Va</span>                            <span class="comment"># Verify ALL installed packages</span></pre></div>

  <div class="code-block"><div class="code-header"><span class="lang">bash — Installation and Removal</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Installing and Upgrading</span>
<span class="cmd">rpm</span> <span class="flag">-ivh</span> <span class="path">package.rpm</span>               <span class="comment"># Install (i), verbose (v), hash progress (h)</span>
<span class="cmd">rpm</span> <span class="flag">-Uvh</span> <span class="path">package.rpm</span>               <span class="comment"># Upgrade (or install if not present)</span>
<span class="cmd">rpm</span> <span class="flag">-Fvh</span> <span class="path">package.rpm</span>               <span class="comment"># Freshen (upgrade ONLY if an older version is already installed)</span>

<span class="comment"># Removal</span>
<span class="cmd">rpm</span> <span class="flag">-e</span> <span class="path">httpd</span>                       <span class="comment"># Erase (uninstall) a package</span></pre></div>
  <div class="info-box warning"><span class="info-icon">⚠️</span><div><strong>Dependency Hell:</strong> If you use <code class="code-inline">rpm -i</code> and the package requires other software, RPM will error out and list the missing dependencies. It will <strong>not</strong> download them for you. This is why YUM/DNF were created!</div></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🏗️</span> Setting up an RPM Build Environment</h2>
  <p>To create your own RPMs, you shouldn't build as root to avoid damaging your system. Instead, set up an unprivileged build environment using <code>rpmbuild</code>.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># 1. Install necessary tools</span>
<span class="cmd">sudo yum install</span> <span class="path">rpm-build rpmdevtools</span>

<span class="comment"># 2. Setup the directory structure in your home directory</span>
<span class="cmd">rpmdev-setuptree</span>

<span class="comment"># This creates ~/rpmbuild/ with 5 subdirectories:</span>
<span class="comment"># - BUILD: Where source code is compiled</span>
<span class="comment"># - RPMS: Where the final binary RPMs are saved</span>
<span class="comment"># - SOURCES: Where original source tarballs (.tar.gz) go</span>
<span class="comment"># - SPECS: Where the .spec instructions file goes</span>
<span class="comment"># - SRPMS: Where Source RPMs are saved</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📜</span> RPM Package Scripting (The .spec File)</h2>
  <p>The heart of RPM building is the <code>.spec</code> file. It defines the metadata, build instructions, and the lifecycle scripts. These scripts allow RPMs to do more than just drop files on a disk; they can configure the system.</p>
  <ul class="styled-list">
    <li><strong>%prep:</strong> Prepares the source code (extracts the tarball).</li>
    <li><strong>%build:</strong> Compiles the software (runs <code>make</code>).</li>
    <li><strong>%install:</strong> Copies the built files into a virtual root directory structure.</li>
    <li><strong>%pre & %post:</strong> Scripts that run immediately before or after the package is installed (e.g., creating a system user, reloading systemd daemon).</li>
    <li><strong>%preun & %postun:</strong> Scripts that run before or after a package is uninstalled (e.g., stopping the service before removing binaries).</li>
  </ul>
  <div class="info-box"><span class="info-icon">💡</span><div><strong>Insight:</strong> Badly written %post or %preun scripts can break a system update. You can bypass them during installation/removal using the <code class="code-inline">--noscripts</code> flag with the rpm command if a broken script is preventing package management.</div></div>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  { title: 'RPM Package Components', section: 'Intermediate' },
  { title: 'rpm query verify install remove', section: 'Intermediate' },
  { title: 'RPM Build Environment rpmbuild', section: 'Intermediate' },
  { title: 'RPM Scripting spec files', section: 'Intermediate' }
]);

// ===== YUM & DNF =====
window.LM.registerPage('yum', `
<h1 class="page-title">YUM / DNF Package Management</h1>
<p class="page-subtitle">Master advanced dependency resolution, repository management, and software provisioning</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🌟</span> Features & Advantages over Traditional RPM</h2>
  <div class="analogy-box">
    <div class="analogy-label">💡 Real-World Analogy</div>
    If <code class="code-inline">rpm</code> is like buying car parts and assembling them yourself (realizing halfway you forgot to buy screws), <code class="code-inline">yum</code> is like hiring a mechanic who automatically sources all the necessary parts, screws, and tools to give you a working car.
  </div>
  <p>YUM (Yellowdog Updater, Modified) and its modern successor DNF (Dandified YUM) sit on top of the RPM system to provide critical advantages:</p>
  <ul class="styled-list">
    <li><strong>Automatic Dependency Resolution:</strong> The biggest advantage. If Package A needs Package B, YUM automatically downloads and installs both.</li>
    <li><strong>Repository Management:</strong> YUM can query multiple remote repositories simultaneously to find the best package version.</li>
    <li><strong>Transaction History:</strong> YUM logs all actions, allowing administrators to review, undo, or redo installations using transaction IDs.</li>
  </ul>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📦</span> Installing & Removing Packages</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Basic Operations (Note: on newer systems, 'dnf' can be used instead of 'yum')</span>
<span class="cmd">yum install</span> <span class="path">httpd</span>                  <span class="comment"># Install a package (prompts for confirmation)</span>
<span class="cmd">yum install -y</span> <span class="path">httpd</span>               <span class="comment"># Install without prompting (assumes yes)</span>
<span class="cmd">yum remove</span> <span class="path">httpd</span>                   <span class="comment"># Remove a package (keeps config files!)</span>
<span class="cmd">yum update</span>                         <span class="comment"># Update ALL packages on the system</span>
<span class="cmd">yum update</span> <span class="path">httpd</span>                   <span class="comment"># Update a specific package</span>
<span class="cmd">yum downgrade</span> <span class="path">httpd</span>                <span class="comment"># Roll back to an older version</span>

<span class="comment"># Searching</span>
<span class="cmd">yum search</span> <span class="string">"web server"</span>            <span class="comment"># Search package names and descriptions</span>
<span class="cmd">yum info</span> <span class="path">httpd</span>                     <span class="comment"># Display detailed package info</span>
<span class="cmd">yum provides</span> <span class="path">/usr/bin/htpasswd</span>     <span class="comment"># Find WHICH package provides a specific command or file</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🌐</span> Configuring YUM Repositories</h2>
  <p>A repository is simply a directory (local or remote) containing RPM packages and specialized metadata describing them. YUM looks in <code>/etc/yum.repos.d/</code> for its configuration files.</p>
  
  <h3 style="margin-top:1.5rem;color:var(--accent);">Understanding .repo Files</h3>
  <p>A repository configuration file (e.g., <code>custom.repo</code>) follows a specific INI-style structure:</p>
  <div class="code-block"><div class="code-header"><span class="lang">ini</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment">[my-custom-repo]</span>
<span class="output">name=My Custom Internal Repository</span>
<span class="output">baseurl=http://repo.mycompany.local/rhel/8/os/</span>
<span class="output">enabled=1</span>
<span class="output">gpgcheck=1</span>
<span class="output">gpgkey=http://repo.mycompany.local/RPM-GPG-KEY-mycompany</span></pre></div>
  <ul class="styled-list">
    <li><strong>[repo-id]:</strong> A unique identifier for the repository (must be one word, no spaces).</li>
    <li><strong>name:</strong> A human-readable description.</li>
    <li><strong>baseurl:</strong> The path to the repodata directory. Can be <code>http://</code>, <code>https://</code>, <code>ftp://</code>, or <code>file:///</code> (for local mounts like DVDs).</li>
    <li><strong>enabled:</strong> 1 to use it, 0 to ignore it.</li>
    <li><strong>gpgcheck:</strong> 1 to verify package signatures (security best practice), 0 to disable.</li>
  </ul>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🧩</span> Resolving Dependency Issues</h2>
  <p>Sometimes, package installations fail due to conflicting dependencies, especially when mixing third-party repositories (like EPEL and Remi).</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Check for broken dependencies across the system</span>
<span class="cmd">yum check dependencies</span>

<span class="comment"># Bypass broken packages during an update</span>
<span class="cmd">yum update --skip-broken</span>

<span class="comment"># Identify dependency chains (what requires what?)</span>
<span class="cmd">yum deplist</span> <span class="path">httpd</span>                  <span class="comment"># Lists all dependencies for httpd and who provides them</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🚀</span> Advanced YUM Commands & Troubleshooting</h2>
  <div class="code-block"><div class="code-header"><span class="lang">bash — History and Rollbacks</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># YUM tracks every installation/removal. You can undo mistakes!</span>
<span class="cmd">yum history</span>                        <span class="comment"># View list of recent transactions</span>
<span class="cmd">yum history info</span> <span class="num">15</span>                <span class="comment"># See exactly what happened in transaction 15</span>
<span class="cmd">yum history undo</span> <span class="num">15</span>                <span class="comment"># Reverse transaction 15 (uninstalls what was installed)</span></pre></div>

  <div class="code-block"><div class="code-header"><span class="lang">bash — Caching and Troubleshooting</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># YUM caches repository metadata to speed up operations.</span>
<span class="comment"># If you add a new repo or a repo gets updated remotely, YUM might use stale data.</span>
<span class="cmd">yum clean all</span>                      <span class="comment"># Deletes cached packages and metadata (Fixes 90% of weird YUM errors!)</span>
<span class="cmd">yum makecache</span>                      <span class="comment"># Forces YUM to download fresh metadata</span>

<span class="comment"># List repositories</span>
<span class="cmd">yum repolist</span>                       <span class="comment"># Show enabled repos</span>
<span class="cmd">yum repolist all</span>                   <span class="comment"># Show enabled AND disabled repos</span>

<span class="comment"># Install from a temporarily enabled repo</span>
<span class="cmd">yum --enablerepo=epel-testing install</span> <span class="path">nginx</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">⚙️</span> Understanding YUM Configuration Files</h2>
  <p>The main configuration file is <code>/etc/yum.conf</code> (or <code>/etc/dnf/dnf.conf</code> on modern systems). Key directives administrators adjust here include:</p>
  <ul class="styled-list">
    <li><strong>cachedir:</strong> Where downloaded packages are temporarily stored (usually <code>/var/cache/yum</code>).</li>
    <li><strong>keepcache=0:</strong> By default, packages are deleted after installation to save space. Set to 1 to keep them.</li>
    <li><strong>exclude:</strong> Prevents specific packages from ever being updated. <em>(e.g., <code>exclude=kernel* php*</code> is useful for freezing core application stacks to prevent accidental breakage during a system update.)</em></li>
  </ul>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  { title: 'YUM vs RPM features', section: 'Intermediate' },
  { title: 'yum install remove update search', section: 'Intermediate' },
  { title: 'YUM Repositories repo files', section: 'Intermediate' },
  { title: 'YUM dependency resolution', section: 'Intermediate' },
  { title: 'yum history undo caching', section: 'Intermediate' },
  { title: 'yum conf exclude', section: 'Intermediate' }
]);

// ===== SUDOERS & PRIVILEGE ESCALATION =====
window.LM.registerPage('sudoers', `
<h1 class="page-title">Sudoers & Privilege Escalation</h1>
<p class="page-subtitle">Master the art of granting and restricting root privileges using the sudoers file</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📜</span> 1. Location and Structure of the Sudoers File</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>The <code>/etc/sudoers</code> file is like a <strong>company's master keycard policy</strong>. It dictates exactly which employees (users/groups) are allowed to access restricted areas (root commands), and whether they need to show their ID (enter a password) every time they do.</div>
  <div class="info-box danger"><span class="info-icon">🚫</span><div><strong>CRITICAL WARNING:</strong> Never edit <code>/etc/sudoers</code> directly with <code>vi</code> or <code>nano</code>. Always use the <code>visudo</code> command. <code>visudo</code> checks your syntax before saving. If you introduce a syntax error in the sudoers file, you could permanently lock yourself out of root access!</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Edit the sudoers file safely</span>
<span class="cmd">sudo visudo</span>

<span class="comment"># Basic structure of a sudoers rule:</span>
<span class="comment"># User/Group    Host=(RunAsUser:RunAsGroup)    Commands</span>
<span class="output">root            ALL=(ALL:ALL)                  ALL</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">👤</span> 2. Granting Sudo Access to a User</h2>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Insight:</strong> The safest way to grant a user full root access is not by editing the sudoers file manually, but by adding them to the designated "wheel" (RHEL/CentOS) or "sudo" (Ubuntu/Debian) group, which already has full access configured in the default sudoers file.</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Method 1: The Group Approach (Recommended)</span>
<span class="cmd">usermod</span> <span class="flag">-aG</span> <span class="path">wheel alice</span>            <span class="comment"># On RHEL/CentOS</span>
<span class="cmd">usermod</span> <span class="flag">-aG</span> <span class="path">sudo alice</span>             <span class="comment"># On Ubuntu/Debian</span>

<span class="comment"># Method 2: Manual entry via visudo</span>
<span class="output">alice   ALL=(ALL)       ALL</span>        <span class="comment"># Alice can run anything on any host as anyone</span>

<span class="comment"># Allow execution WITHOUT a password (Use with extreme caution!)</span>
<span class="output">bob     ALL=(ALL)       NOPASSWD: ALL</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">👥</span> 3. Managing Group-Based Permissions</h2>
  <p>Instead of managing users individually, you can define permissions for an entire group. In the sudoers file, group names are prefixed with a <code>%</code> symbol.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Give the 'developers' group full root access</span>
<span class="output">%developers    ALL=(ALL)    ALL</span>

<span class="comment"># Give the 'sysadmins' group access without requiring a password</span>
<span class="output">%sysadmins     ALL=(ALL)    NOPASSWD: ALL</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🏷️</span> 4. Understanding Aliases (User, Host, Runas, Cmnd)</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Aliases are like creating <strong>named distribution lists</strong> or <strong>macro shortcuts</strong>. Instead of typing out 5 user names and 10 command paths repeatedly across multiple rules, you group them under a single variable name like "WEBADMINS" or "NETCOMMANDS".</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># 1. User_Alias: Grouping users together</span>
<span class="output">User_Alias      WEBADMINS = alice, bob, charlie</span>

<span class="comment"># 2. Host_Alias: Grouping servers together (useful in centralized LDAP/IPA environments)</span>
<span class="output">Host_Alias      WEBSERVERS = web01, web02, 192.168.1.100</span>

<span class="comment"># 3. Runas_Alias: Grouping target users they can run commands as</span>
<span class="output">Runas_Alias     DBUSERS = mysql, postgres</span>

<span class="comment"># 4. Cmnd_Alias: Grouping specific commands (MUST use absolute paths!)</span>
<span class="output">Cmnd_Alias      NETCOMMANDS = /usr/sbin/ifconfig, /usr/sbin/ip, /usr/bin/ping</span>
<span class="output">Cmnd_Alias      WEBCOMMANDS = /usr/bin/systemctl restart httpd, /usr/bin/systemctl reload httpd</span>

<span class="comment"># Applying the aliases in a rule:</span>
<span class="comment"># WEBADMINS on WEBSERVERS can run WEBCOMMANDS as root without a password</span>
<span class="output">WEBADMINS       WEBSERVERS=(root) NOPASSWD: WEBCOMMANDS</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🔒</span> 5. Restricting Specific Commands</h2>
  <p>You can grant broad permissions but explicitly restrict certain dangerous commands using the <code>!</code> (NOT) operator.</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Example 1: Allow everything EXCEPT dropping into a root shell</span>
<span class="comment"># This prevents users from running 'sudo su' or 'sudo /bin/bash'</span>
<span class="output">Cmnd_Alias      SHELLS = /bin/sh, /bin/bash, /bin/zsh, /bin/su</span>
<span class="output">alice           ALL=(ALL)    ALL, !SHELLS</span>

<span class="comment"># Example 2: Allow restarting only specific services, nothing else</span>
<span class="output">bob             ALL=(root)   /usr/bin/systemctl restart httpd, /usr/bin/systemctl restart mysql</span>

<span class="comment"># Example 3: Delegate log viewing without allowing file editing</span>
<span class="comment"># Note: Beware of commands that allow shell escapes (like 'less' or 'vi')!</span>
<span class="output">charlie         ALL=(root)   /usr/bin/tail -f /var/log/messages, /usr/bin/cat /var/log/secure</span></pre></div>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  { title: 'Sudoers file location visudo', section: 'Intermediate' },
  { title: 'Grant root sudo access user', section: 'Intermediate' },
  { title: 'Group based sudo permissions', section: 'Intermediate' },
  { title: 'Sudoers Aliases User Host Cmnd', section: 'Intermediate' },
  { title: 'Restricting specific commands sudo', section: 'Intermediate' }
]);

// ===== CRON & SCHEDULING =====
window.LM.registerPage('cron', `
<h1 class="page-title">Cron & Task Scheduling</h1>
<p class="page-subtitle">Automate repetitive tasks, scripts, and backups using the cron daemon</p>

<div class="content-section">
  <h2 class="section-title"><span class="icon">⏰</span> 1. Managing Cron Jobs (crontab)</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Cron is like an <strong>infinitely reliable digital alarm clock</strong> for your server. Instead of just waking you up, it executes commands or scripts at precise intervals (every minute, every Tuesday at 3 AM, or on the first of every month) without any human intervention.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Edit your user's cron jobs (opens in your default text editor, usually vi)</span>
<span class="cmd">crontab</span> <span class="flag">-e</span>

<span class="comment"># List your current cron jobs</span>
<span class="cmd">crontab</span> <span class="flag">-l</span>

<span class="comment"># Remove ALL your cron jobs (Careful: no confirmation prompt!)</span>
<span class="cmd">crontab</span> <span class="flag">-r</span>

<span class="comment"># Edit another user's cron jobs (Requires root/sudo)</span>
<span class="cmd">sudo crontab</span> <span class="flag">-u</span> <span class="path">alice</span> <span class="flag">-e</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">⏳</span> 2. Syntax for Specifying Time Intervals</h2>
  <p>Every cron job consists of 5 time fields followed by the command to execute. The fields are separated by spaces.</p>
  <div class="info-box tip"><span class="info-icon">💡</span><div><strong>Pro Tip:</strong> When writing cron syntax, remember the acronym <strong>Min Hou Dom Mon Dow</strong> (Minute, Hour, Day of Month, Month, Day of Week).</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">text</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># The structure of a crontab entry:</span>
<span class="comment"># *  *  *  *  *  command_to_execute</span>
<span class="comment"># ┬  ┬  ┬  ┬  ┬</span>
<span class="comment"># │  │  │  │  └─ Day of week (0 - 7) (Sunday=0 or 7)</span>
<span class="comment"># │  │  │  └─── Month (1 - 12)</span>
<span class="comment"># │  │  └───── Day of month (1 - 31)</span>
<span class="comment"># │  └─────── Hour (0 - 23)</span>
<span class="comment"># └───────── Minute (0 - 59)</span>

<span class="comment"># Examples:</span>
<span class="output">0 2 * * * /path/to/script.sh</span>       <span class="comment"># Run every day at 2:00 AM</span>
<span class="output">*/15 * * * * /path/to/script.sh</span>    <span class="comment"># Run every 15 minutes</span>
<span class="output">0 22 * * 1-5 /path/to/script.sh</span>    <span class="comment"># Run at 10:00 PM, Monday through Friday</span>
<span class="output">0 0 1,15 * * /path/to/script.sh</span>    <span class="comment"># Run at midnight on the 1st and 15th of every month</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">📜</span> 3. Using Cron to Run Scripts</h2>
  <div class="info-box danger"><span class="info-icon">🚫</span><div><strong>CRITICAL RULE:</strong> Cron runs in a stripped-down environment. It <strong>does not load your PATH</strong> or environment variables (.bashrc/.profile). Always use <strong>absolute paths</strong> for both the scripts you execute and the commands inside those scripts!</div></div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># ❌ WRONG (Cron won't know where python or the script is)</span>
<span class="output">* * * * * python backup.py</span>

<span class="comment"># ✅ RIGHT (Absolute paths)</span>
<span class="output">* * * * * /usr/bin/python3 /home/user/scripts/backup.py</span>

<span class="comment"># Handling output (Cron emails output to the user by default)</span>
<span class="comment"># Redirect stdout and stderr to a log file instead</span>
<span class="output">0 2 * * * /opt/backup.sh > /var/log/backup.log 2>&1</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">💾</span> 4. Backing Up Cron Configurations</h2>
  <div class="analogy-box"><div class="analogy-label">💡 Real-World Analogy</div>Because <code>crontab -r</code> (remove) is right next to <code>crontab -e</code> (edit) on the keyboard, administrators accidentally delete their schedules all the time! Always back up your crontab just like you would save your calendar data.</div>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># Backup your current cron jobs to a text file</span>
<span class="cmd">crontab</span> <span class="flag">-l</span> > <span class="path">~/my_cron_backup.txt</span>

<span class="comment"># Restore cron jobs from a backup file</span>
<span class="cmd">crontab</span> <span class="path">~/my_cron_backup.txt</span>

<span class="comment"># System-wide cron jobs are stored here (back these up via standard file backups):</span>
<span class="cmd">ls</span> <span class="flag">-l</span> <span class="path">/etc/crontab</span>
<span class="cmd">ls</span> <span class="flag">-l</span> <span class="path">/etc/cron.d/</span>
<span class="cmd">ls</span> <span class="flag">-l</span> <span class="path">/etc/cron.daily/</span></pre></div>
</div>

<div class="content-section">
  <h2 class="section-title"><span class="icon">🛠️</span> 5. Troubleshooting Cron Issues</h2>
  <p>If a cron job isn't working as expected, follow these diagnostic steps:</p>
  <div class="code-block"><div class="code-header"><span class="lang">bash</span><button class="copy-btn">📋 Copy</button></div><pre><span class="comment"># 1. Check if the cron daemon is actually running</span>
<span class="cmd">systemctl</span> <span class="flag">status</span> <span class="path">crond</span>             <span class="comment"># RHEL/CentOS</span>
<span class="cmd">systemctl</span> <span class="flag">status</span> <span class="path">cron</span>              <span class="comment"># Ubuntu/Debian</span>

<span class="comment"># 2. Check the system logs to see if cron attempted to run the job</span>
<span class="cmd">grep</span> <span class="path">CRON</span> <span class="path">/var/log/syslog</span>          <span class="comment"># Ubuntu/Debian</span>
<span class="cmd">grep</span> <span class="path">CRON</span> <span class="path">/var/log/cron</span>            <span class="comment"># RHEL/CentOS</span>

<span class="comment"># 3. Check for permission issues</span>
<span class="comment"># Ensure the script is executable!</span>
<span class="cmd">ls</span> <span class="flag">-l</span> <span class="path">/path/to/script.sh</span>           <span class="comment"># Does it have 'x' permissions?</span>

<span class="comment"># 4. Check local mail for errors</span>
<span class="comment"># If cron encounters an error and you didn't redirect output, it sends local mail</span>
<span class="cmd">mail</span></pre></div>
</div>

<button class="mark-complete-btn">☐ Mark as Complete</button>
`, [
  { title: 'Managing Cron Jobs crontab', section: 'Intermediate' },
  { title: 'Cron syntax time intervals', section: 'Intermediate' },
  { title: 'Running scripts with cron absolute paths', section: 'Intermediate' },
  { title: 'Backup restore crontab', section: 'Intermediate' },
  { title: 'Troubleshoot cron logs crond', section: 'Intermediate' }
]);

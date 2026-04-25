# Standard Operating Procedure (SOP)
**Linux Administrator Learning Website Deployment & Management**

This document serves as the complete operational guide for managing, hosting, and deploying the LinuxMastery web application.

---

## Phase 1: Local Development & Usage

The application is built as a pure Vanilla JavaScript Single Page Application (SPA). It requires zero external dependencies, build tools, or frameworks to run.

### Running Locally
To test the website on your local machine before deploying:
1. Open a terminal or command prompt in the project folder.
2. Start a local web server. You can use any of the following methods depending on what is installed on your computer:
   - **Using Python:** `python3 -m http.server 8080`
   - **Using Node.js:** `npx http-server . -p 8080`
3. Open your web browser and navigate to `http://localhost:8080`.

### Modifying Content
If you want to add or modify topics:
1. Open the corresponding `pages-*.js` file (e.g., `pages-intermediate.js`).
2. Add your HTML content within the template literal provided.
3. Update the search index at the bottom of the `registerPage` block to make the new content searchable.
4. Save the file and refresh your browser.

---

## Phase 2: Pushing the Code to GitHub

Version control is crucial for backup and easy deployment to your server.

### Step 1: Create a Repository
1. Go to [GitHub](https://github.com/) and log in.
2. Click the **New** button to create a new repository.
3. Name it (e.g., `linux-admin-website`), make it **Public** or **Private**, and do **NOT** initialize it with a README.

### Step 2: Push Your Local Code
Open your local terminal in the `Linux Administrator Website` directory and run the following Git commands:

```bash
# Initialize a new git repository locally
git init

# Add all files to the staging area
git add .

# Commit the files
git commit -m "Initial commit of LinuxMastery website"

# Rename the default branch to main (if necessary)
git branch -M main

# Link your local repo to the GitHub repository you just created
# Replace the URL with YOUR repository's URL
git remote add origin https://github.com/yourusername/linux-admin-website.git

# Push the code to GitHub
git push -u origin main
```

---

## Phase 3: Buying a Domain Name

To make your website professional (e.g., `linuxmastery.com`), you need a domain name.

### Step 1: Purchase the Domain
1. Go to a domain registrar like **Namecheap**, **GoDaddy**, **Cloudflare Registrar**, or **Hostinger**.
2. Search for your desired domain name to check availability.
3. Add it to your cart and complete the checkout process.

### Step 2: Update DNS Records (Later)
Keep your domain registrar dashboard open. Once your Linux server is deployed (Phase 4), you will take the public IP address of that server and create an **"A Record"** pointing your domain to that IP address.

*Example DNS Configuration:*
- **Type:** A
- **Name/Host:** `@` (represents the root domain)
- **Value/Target:** `<Your-Server-Public-IP>`
- **TTL:** Auto or 3600

---

## Phase 4: Deploying on a Linux Server

For a production deployment, we will use a Linux VPS (Virtual Private Server) running **Ubuntu** or **RHEL/CentOS/AlmaLinux**, and we will serve the site using **Nginx**.

### Step 1: Provision a Server
1. Create a VPS on a cloud provider like **AWS (EC2)**, **DigitalOcean (Droplet)**, or **Linode**.
2. Select **Ubuntu 24.04** or **AlmaLinux 9** as the OS.
3. SSH into your new server using the provided IP address and keys.

### Step 2: Install Nginx & Git
Once logged into your server, update packages and install the required tools:

**For Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install nginx git -y
```

**For RHEL/AlmaLinux/CentOS:**
```bash
sudo dnf install epel-release -y
sudo dnf install nginx git -y
sudo systemctl enable --now nginx
```

### Step 3: Clone the Repository to the Server
We will pull the code from GitHub directly into the web server's root directory.

```bash
# Move to the web root directory
cd /var/www

# Remove default html folder (optional but recommended)
sudo rm -rf html

# Clone your repository (creates a folder named 'linux-admin-website')
sudo git clone https://github.com/yourusername/linux-admin-website.git html

# Set proper ownership so Nginx can read the files
sudo chown -R www-data:www-data /var/www/html   # For Ubuntu
# OR
sudo chown -R nginx:nginx /var/www/html         # For RHEL/CentOS
```

### Step 4: Configure the Firewall
Ensure that HTTP and HTTPS traffic is allowed through the firewall.

**For UFW (Ubuntu):**
```bash
sudo ufw allow 'Nginx Full'
```

**For Firewalld (RHEL/CentOS):**
```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### Step 5: Secure the Site with HTTPS (Let's Encrypt)
Once your domain's DNS A Record (from Phase 3) has propagated to point to your server's IP, you can install a free SSL certificate.

**For Ubuntu:**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**For RHEL/AlmaLinux:**
```bash
sudo dnf install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot will automatically verify your domain, issue an SSL certificate, configure Nginx to use it, and set up a cron job for automatic renewal.

---

## Routine Maintenance

Whenever you make changes to your website locally, follow this workflow to update production:

1. **Local:** `git add .`, `git commit -m "Update"`, `git push`
2. **Server:** SSH into your server, navigate to `/var/www/html`, and run `sudo git pull origin main`. 

Your website will update instantly without needing to restart the server!

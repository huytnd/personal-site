# Deploy to Ubuntu VPS with GitHub Actions

This site is deployed as static files. GitHub Actions builds the Astro site and uploads `dist/` to the VPS over SSH.

## Server prerequisites

Install these packages once on the VPS:

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx rsync
```

Create the deployment directory:

```bash
sudo mkdir -p /var/www/huytnd.io.vn/public
sudo chown -R $USER:$USER /var/www/huytnd.io.vn
```

Point nginx at that folder:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name huytnd.io.vn www.huytnd.io.vn;

    root /var/www/huytnd.io.vn/public;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(css|js|png|jpg|jpeg|gif|svg|webp|ico|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
}
```

Then validate nginx and issue TLS:

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d huytnd.io.vn -d www.huytnd.io.vn
```

## GitHub repository secrets

Add these repository secrets in GitHub:

- `VPS_HOST`: your VPS public IP or hostname
- `VPS_PORT`: SSH port, usually `22`
- `VPS_USER`: deploy user on the VPS
- `VPS_DEPLOY_PATH`: `/var/www/huytnd.io.vn/public`
- `VPS_SSH_KEY`: private SSH key for the deploy user
- `VPS_HOST_KEY`: output of `ssh-keyscan -H huytnd.io.vn`

Example:

```bash
ssh-keyscan -H huytnd.io.vn
```

## Recommended deploy user

Create a dedicated user on the VPS:

```bash
sudo adduser deploy
sudo mkdir -p /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
sudo chown -R deploy:deploy /home/deploy/.ssh
```

Append the GitHub Actions public key to `/home/deploy/.ssh/authorized_keys`, then run:

```bash
sudo chmod 600 /home/deploy/.ssh/authorized_keys
sudo chown deploy:deploy /home/deploy/.ssh/authorized_keys
sudo chown -R deploy:deploy /var/www/huytnd.io.vn
```

## Deployment behavior

On every push to `main`, the workflow:

1. checks out the repository
2. installs dependencies
3. builds Astro
4. uploads `dist/` to the VPS with `rsync --delete`

That means the VPS does not need Node.js for deployment anymore.

#!/bin/sh

cat <<EOF > /usr/share/nginx/html/config.js
window.ENV = {
  VITE_API_URL: "${VITE_API_URL}"
};
EOF

cat <<EOF > /etc/nginx/conf.d/default.conf
server {
    listen ${PORT:-8080};
    server_name localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

exec "$@"

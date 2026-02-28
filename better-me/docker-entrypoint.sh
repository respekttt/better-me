#!/bin/sh

cat <<EOF > /usr/share/nginx/html/config.js
window.ENV = {
  VITE_API_URL: "${VITE_API_URL}"
};
EOF

exec "$@"

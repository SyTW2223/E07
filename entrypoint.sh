#!/bin/sh
# entrypoint.sh
npm i
if [ ! -f /backend/dist/src/api.js ] then
  npm run build:express
fi
npm run prod:express

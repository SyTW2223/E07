#!/bin/sh
# entrypoint.sh
npm i
npm run build:express
npm run prod:express

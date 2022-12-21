#!/usr/bin/env sh
message="deploy"
# # abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd docs

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# # if you are deploying to a custom domain
# # echo 'www.example.com' > CNAME

echo ----Enter commit message-----
read message

git init
git checkout -B gh-pages-staging
git add -A
git commit -m "$message"

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:SyTW2223/E07.git gh-pages-staging:gh-pages

cd -
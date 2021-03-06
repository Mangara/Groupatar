#!/bin/bash

# - Ensure:
#  x We are on master
#  x Branch is clean
#  x dist exists

if [ "master" == $(git rev-parse --abbrev-ref HEAD) ]
then
    echo "On master."
else
    echo "This script should only be run from the master branch. Run  git checkout master  and try again."
    exit
fi

if [[ -z $(git status -s) ]]
then
    echo "Tree is clean."
else
    echo "Tree is dirty, please commit changes before running this."
    exit
fi

if [ -f package.json ]
then
    echo "In directory with package.json."
else
    echo "Not in main directory. Please go to the root directory of the Groupatar project and run this again."
    exit
fi

if [ -d dist ]
then
    echo "In directory with dist."
else
    echo "Not in main directory. Please go to the root directory of the Groupatar project and run this again."
    exit
fi

# - Clear JS files in dist

rm -f dist/*.js dist/*.js.map

# - Build prod (npm run build)
#  x Stop if error

npm install
if [ $? == 0 ]
then
    echo "Npm successful."
else
    echo "Npm error, stopping release."
    exit
fi

npm run build
if [ $? == 0 ]
then
    echo "Build successful."
else
    echo "Build error, stopping release."
    exit
fi

# - Create /tmp/groupatar if it doesn't exist

mkdir -p /tmp/groupatar

# - Clear /tmp/groupatar

rm -f /tmp/groupatar/*

# - Copy contents of dist to /tmp/groupatar

cp dist/* /tmp/groupatar
cp .gitignore /tmp/groupatar

# - Checkout gh-pages
#  x Stop if error

git checkout gh-pages
if [ $? == 0 ]
then
    echo "Branch switch successful."
else
    echo "Error switching branches, stopping release."
    exit
fi

# - Copy /tmp/groupatar to .

cp -rTf /tmp/groupatar .

# - Print instructions

git status
echo "Release prepared. Add and commit changes, then push to complete."
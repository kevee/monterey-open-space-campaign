#!/bin/bash

git config --global user.name "Kevin Miller (via Heroku)"
git config --global user.email "kevin@csumb.edu"
cd /tmp
git clone https://$GITHUB_USER:$GITHUB_TOKEN@github.com/kevee/monterey-open-space-campaign.git
cd monterey-open-space-campaign
git checkout master
npm install
grunt deploy
rm -rf /tmp/monterey-open-space-campaign

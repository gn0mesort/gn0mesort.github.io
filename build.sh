#!/usr/bin/env bash
temp=$(mktemp -d -p /tmp/)
hugo -d $temp
git checkout master
GLOBIGNORE=.git
rm -rfv *
unset GLOBIGNORE
cp -r $temp .
rm -rf $temp

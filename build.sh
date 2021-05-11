#!/usr/bin/env bash
temp=$(mktemp -d -p /tmp/)
dest=$(pwd)
hugo -d $temp
git checkout master
GLOBIGNORE=.git
rm -rfv *
unset GLOBIGNORE
cd $temp
for item in *; do
  cp -rv $item "$dest/$item"
done
rm -rf $temp

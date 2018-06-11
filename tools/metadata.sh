#!/bin/sh
TEMPLATE_DIR=$(dirname $0)/templates
pandoc --template=$TEMPLATE_DIR/template.json $@
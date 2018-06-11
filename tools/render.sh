#!/bin/sh
TEMPLATE_DIR=$(dirname $0)/templates
pandoc --template=$TEMPLATE_DIR/template.html -B html/header.html\
	--highlight=pygments -A html/footer.html $@
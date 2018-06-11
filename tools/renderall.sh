#!/bin/bash
TEMPLATE_DIR=$(dirname $0)/templates
MD=".md"
HTML=".html"
for file in $1/*.md; do
pandoc --template=$TEMPLATE_DIR/template.html -B html/header.html\
	--highlight=pygments -A html/footer.html "$file" -o "${file%$MD}$HTML"
done;
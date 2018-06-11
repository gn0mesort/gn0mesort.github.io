#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');

const blogLocation = process.argv[2],
			indexLocation = path.join(blogLocation, 'index.md'),
			contents = require(path.join(process.cwd(),
																	 blogLocation,
																	'posts/.metadata/contents.json')
												),
			latestEntry = path.join(blogLocation, 'posts', `${contents[0].name}.md`),
			latestText = fs.readFileSync(latestEntry, 'utf-8');


let indexText = `---\ntitle: Blog\nstyle: /css/index.css\n---\n\n` +
								`# Blog { .flex-item .flex-center }\n\n` +
								`## Contents { .flex-item .flex-center }\n\n` +
								`<div class="flex-item flex-center frame">\n`;

for (let entry of contents) {
	let entryLocation = path.join(blogLocation, 'posts', `${entry.name}.html`),
			postDate = new Date(entry.create).toISOString();
	indexText += `[[${postDate}]  ${entry.name}]` +
							 `(/${entryLocation})<br />\n`;
}
indexText += '</div>\n' +
						 `## Latest Entry { .flex-item .flex-center }\n\n` +
						 `<div class="flex-center frame blog">\n` +
						 `${latestText.replace(/^---\n(.*\n)+---$/m, '')}` +
						 `<p class="center">` + 
						 `<a href="/${latestEntry.replace('.md', '.html')}">` +
						 `[permalink]</a></p></div>\n\n`;

fs.writeFileSync(indexLocation, indexText, 'utf-8');

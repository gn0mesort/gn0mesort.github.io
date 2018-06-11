#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const orderLocation = '.metadata/contents.json';
const targetLocation = process.argv[2];
const contents = [];

for (let entry of fs.readdirSync(targetLocation)) {
	if (entry.match(/^.+\.md$/g)) {
		contents.push({
										name: entry.split('.')[0],
										create: new Date(require(path.join(process.cwd(),
																						 targetLocation,
																						 '.metadata',
																						 `${entry}.json`)
																						).create)
									});
	}
}

contents.sort((a, b) => {
	if (a.create > b.create) { return -1; }
	if (a.create < b.create) { return 1; }
	return 0;
});

fs.writeFileSync(path.join(targetLocation, orderLocation),
								 JSON.stringify(contents),
								 'utf-8');

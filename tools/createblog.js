#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const location = process.argv[2];
const parsedLocation = path.parse(location);

fs.writeFileSync(location,
								 `---\ntitle: ${parsedLocation.name}\nstyle: ` +
								 `/css/index.css\n---\n\n`);
fs.writeFileSync(path.join(parsedLocation.dir,
													 '.metadata',
													 `${parsedLocation.base}.json`),
								 JSON.stringify({ create: new Date().toISOString() }),
								 'utf-8'
								);

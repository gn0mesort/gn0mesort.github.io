#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const location = process.argv[2];
const parsedLocation = path.parse(location);

fs.unlinkSync(location);
fs.unlinkSync(path.join(parsedLocation.dir,
												'.metadata',
												`${parsedLocation.base}.json`));

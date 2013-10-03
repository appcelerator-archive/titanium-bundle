#!/usr/bin/env node
/**
* QE-Titanium bundle
*
* This file connects all of the locally installed binaries to be available globally
*
* Copyright (c) 2012 by Appcelerator, Inc. All Rights Reserved.
* See LICENSE for more information on licensing.
*/

var path = require('path'),
	fs = require('fs'),
	npmconf = require('npmconf');

npmconf.load(function (err, conf) {
	if (err) {
		console.error('Could not detect the npm global install directory: ' + err + '\n');
		process.exit(1);
	} else {
		var sourceDirectory = path.resolve(path.join(__dirname, '..', 'node_modules', '.bin')),
			destinationDirectory = path.join(conf.get('prefix'), 'bin'),
			filesToLink = fs.readdirSync(sourceDirectory);
		filesToLink.forEach(function (fileToLink) {
			var sourcePath = path.join(sourceDirectory, fileToLink),
				destinationPath = path.join(destinationDirectory, fileToLink);
			console.log('Linking ' + sourcePath + ' to ' + destinationPath);
			if (fs.existsSync(destinationPath)) {
				fs.unlinkSync(destinationPath);
			}
			try {
				fs.symlinkSync(sourcePath, destinationPath);
			} catch(e) {
				console.error('\nCould not link ' + fileToLink + ': ' + e.message + '\n');
				process.exit(1);
			}
		});
		console.log('\nAll binaries installed successfully\n');
	}
});
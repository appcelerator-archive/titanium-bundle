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
		linkBinaries(conf);
		setPaths();
	}
});

function linkBinaries(conf) {
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
}

function setPaths() {
	var configPath = path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, '.titanium', 'config.json'),
		config = require(configPath),
		hooks = [],
		commands = [],
		sourceDirectory = path.resolve(path.join(__dirname, '..', 'node_modules')),
		directoriesToScan = fs.readdirSync(sourceDirectory);

	// Look for hooks/commands
	console.log('Searching for CLI commands and hooks');
	directoriesToScan.forEach(function (dir) {
		var componentPath;
		if (dir != '.bin' && dir != 'npmconf' && dir != 'titanium') {
			componentPath = path.join(sourceDirectory, dir, 'hooks');
			if (fs.existsSync(componentPath)) {
				hooks.push(componentPath);
			}
			componentPath = path.join(sourceDirectory, dir, 'commands');
			if (fs.existsSync(componentPath)) {
				commands.push(componentPath);
			}
		}
	});

	// Save the old config file
	console.log('Backing up config file to ' + configPath + '.bak');
	fs.writeFileSync(configPath + '.bak', config);

	// Write the new config file
	console.log('Writing new config file to ' + configPath);
	config.paths.hooks = hooks;
	config.paths.commands = commands;
	fs.writeFileSync(configPath, JSON.stringify(config, false, '\t'));
}
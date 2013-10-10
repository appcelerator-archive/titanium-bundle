titanium-bundle
===============

A pseudo npm package that is used to easily install the suite of all community node.js Titanium packages

## Using the bundle

To install the master branch versions of the CLI, Alloy, and the Code Processor, run:

```
npm install git+ssh://git@github.com:appcelerator/titanium-bundle
```

To install, for example, the versions of these packages released with 3.1.2 SDK, run:

```
npm install git+ssh://git@github.com:appcelerator/titanium-bundle#3.1.2
```

Once the package has been installed, run:

```
./node_modules/titanium-bundle/bin/install.js
```

You may need to run the previous command as sudo, depending on your setup. Once done, you should have all three packages installed, available globally, and linked to the CLI (hooks and commands paths set).

## Updating the bundle

To add a new set of versions to the bundle, create a new branch:

```
git checkout -b <version name>
```

Then update the dependencies section of the package.json file. To update to a released version of the dependencies (i.e. has been published to npm):
```
	"dependencies": {
    "titanium": "<version>",
    "alloy": "<version>",
    "titanium-code-processor": "<version>",

    "npmconf": "0.1.x"
}
```
Note: npmconf is used by the bundle's internal install script and should NOT be updated with the others.

To update to an unreleased version of the dependencies, specify the git hash/tag/branch/whatever with a git url:
```
	"dependencies": {
    "titanium": "git://github.com/appcelerator/titanium.git#<git hash/tag/branch/whatever>",
    "alloy": "git://github.com/appcelerator/alloy.git#<git hash/tag/branch/whatever>",
    "titanium-code-processor": "git://github.com/appcelerator/titanium-code-processor.git#<git hash/tag/branch/whatever>",

    "npmconf": "0.1.x"
  }
```

Once your changes have been made, push this branch directly to the appcelerator repo (you will need push permissions)
```
git push appcelerator <version name>
```

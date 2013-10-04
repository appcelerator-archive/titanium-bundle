titanium-bundle
===============

A pseudo npm package that is used to easily install the suite of all community node.js Titanium packages

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

You may need to run the previous command as sudo, depending on your setup. Once done, you should have all three packages installed and available globally.

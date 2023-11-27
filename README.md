![Flight Sim Community NL](https://avatars.githubusercontent.com/u/19762968?v=4)

# Flight Sim Community NL Installer

This repository contains the installer for Flight Sim Community NL projects.

## How to contribute

The installer is built as an [Electron Application](https://www.electronjs.org/) for Windows.

### Requirements

Please make sure you have:

- [git](https://git-scm.com/downloads)
- [NodeJS 21](https://nodejs.org/en/)

### Get started

First fork the project and install the dependencies

```shell script
npm install
```

Then run the development server using

```shell script
npm start
```

To build the package as .exe, run

```shell script
npm run build
```

Packaged applications will automatically update if there is a newer version available (compared to build version in package.json), this does also apply to development versions (ending on -devXX), which are updated via a separate stream. Updates are distributed once the build version is changed and a tag has been added.

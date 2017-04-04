// Constants
import { withJSX, withPkg } from '../constants/env_vars';
import { styleExts, createFile } from '../constants';

// Used for reading and writing component files
import {
	createDirectory,
	getComponentPath,
	getComponentName,
	createFiles,
	writeToFile,
	createPjson } from '../utils/file';

// Loading in appropriate templates
import compTmpl from '../templates/component';
import pjTmpl from '../templates/pjson';

const args = process.argv.slice(2)
// const componentPath = args[1]
const componentPath = getComponentPath(args[1])
const componentName = getComponentName(componentPath)
const extensions = []
let subDir = ''

console.log(componentPath)
console.log(componentName)

/**
  Grabbing style extension from arguments and adding to
  full list of extensions
*/
function addCssExtension(args, styleExts, extensions) {
  for (let x = 0, len = args.length; x < len; x++) {
    if (styleExts.includes(args[x])) {
      extensions.push('.' + args[x].slice(2));
    }
  }
}

// Adding component file extension
withJSX ? extensions.push('.jsx') : extensions.push('.js');

// Adding stylesheet extensions
addCssExtension(args, styleExts, extensions);

// Creating component folder
// if (withFolder) {
createDirectory(componentPath);
// subDir = component + '/';
// }

// Loop through to create necessary files
// createFiles(extensions, createFile, subDir, component, compTmpl, writeToFile);


// Creating package.json pointing to component (via main) if needed
// if (withPkg) {
//   createPjson(createFile, subDir, pjTmpl);
// }
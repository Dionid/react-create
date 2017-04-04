import fs from 'fs';
import { exec } from 'child_process';

function getComponentPath(componentPath) {
    let res = ''

    if (componentPath.indexOf('.') !== 0) {
	    if (componentPath.indexOf('/') !== 0) {
		    res += './'
	    } else {
		    res += '.'
        }
    }

    res += componentPath

    return res
}

function getComponentName(componentPath) {
  const componentPathArr = componentPath.split('/')
  const componentName = componentPathArr[componentPathArr.length - 1]

  return componentName
}

function createDirectory(componentPath) {
  exec('mkdir ' + componentPath, (err, stdout) => {
    if (err) { throw err };
  });
}

function createFiles(extensions, action, subDir, component, template, cb) {
  extensions.forEach((ext) => {
    exec(action + subDir + component + ext, (err, stdout) => {
      if (err) { throw err };
      if (ext === '.js' || ext === '.jsx') {

        // Writing up markup to component (.js or jsx) file
        cb(subDir, component, ext, template);
      }
    });
  })
}

function writeToFile(subDir, component, ext, compTmpl) {
  fs.writeFile(subDir + component + ext, compTmpl, (err) => {
    if (err) { throw err };
  })
}

function createPjson(action, subDir, template) {
  exec(action + subDir + 'package.json', () => { 
    fs.writeFile(subDir + 'package.json', template, (err) => {
      if (err) { throw err };
    })
  });
}

export {
	createDirectory,
	getComponentPath,
    getComponentName,
	createFiles,
	writeToFile,
	createPjson
};
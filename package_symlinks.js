// ***
// NOTE: MUST RUN THIS IN "node_modules", OTHERWISE, SYMLINKS WILL NOT WORK !!!
//
// - "$ yarn" command will run this automatically. (package.json - postinstall)
// - This script creates symlinks (e.g. "src/app" to "node_modules/app")
//   so we can do like this from anywhere:
//                     require("app/utils/Utils") without using "../.." paths.
// ***

/* eslint-disable */
const fs = require('fs');
// const execSync = require('child_process').execSync;

const arr = [
  'app',
  'configuration',
  'log',
]; // symlinks

for (let i = 0; i < arr.length; i += 1) {
  const srcpath = '../src/' + arr[i];
  const dstpath = arr[i];

  if (!fs.existsSync(dstpath)) {
    try {
      fs.symlinkSync(srcpath, dstpath, 'dir');
    } catch (ex) {
      console.error(`Creating symbolic link failed, consider Administrator mode on Windows: `);
      console.error(ex);
      break;
    }
  }
}

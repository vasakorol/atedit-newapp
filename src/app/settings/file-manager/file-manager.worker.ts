// this version of web worker not work because on problem with importing or require of 'fs'
// Right now i'm not sure how to handle that, but will leave that for the future.
// Possible solution is Current Web Worker, but with possibility to use fs, or maybe WebAssembly

// /// <reference lib="webworker" />
//
// import * as path from 'path';
// // import * as fs from 'fs';
// // declare var fs: any;
// // const fs = eval('require("fs")')
//
//
//
// export const metaFileExtension = '.meta';
//
// addEventListener('message', ({data}) => {
//   start(data);
// });
// // let fs = null;
// // let path = null;
// function start(data): void {
//   postMessage({type: 'debug', message: `starting`});
//
//   // const list = fs.readdirSync(data.folder);
//   // console.log('list', list);
//   const extension = path.extname(data.folder + '/Assets/Dragonsan.meta');
//   console.log('extension', extension);
//
//   // var remote = require("electron").remote;
//
//   // console.log('remote', remote);
//   //
//   // fs = remote.require('fs');
//   // path = remote.require('path');
//
//   for (let i = 0; i < 10; i++) {
//     postMessage({type: 'progress', message: `progress message: ${i}`});
//   }
//
//   // const list = readFolder({folder: data.folder, meta: data.meta});
//   //
//   // console.log('list', list);
//   //
//   postMessage({
//     type: 'done',
//     message: `Done message`
//   });
// }
//
// // async function readFolder({folder, meta}) {
// //   let result = [];
// //   const list = fs.readdirSync(folder);
// //   for (let file of list) {
// //     const folderFile = path.resolve(folder, file);
// //     const fileStat = fs.statSync(folderFile);
// //     if (fileStat && fileStat.isDirectory()) {
// //       const files = await this.readFolder(folderFile);
// //       result = [...result, ...files];
// //     } else {
// //       if (checkFile(folderFile, meta)) {
// //         const checkedFile = folderFile.replace(metaFileExtension, '');
// //         const extension = path.extname(checkedFile);
// //         let relativePath = checkedFile.replace(folder, '');
// //         if (relativePath[0] === '/') {
// //           relativePath = relativePath.slice(1);
// //         }
// //         const item = {
// //           path: checkedFile,
// //           relative_path: relativePath,
// //           title: path.basename(checkedFile, extension),
// //           name: path.basename(checkedFile),
// //           ext: extension.replace('.', '').toLowerCase()
// //         };
// //         result.push(item);
// //       }
// //     }
// //   }
// //   return result;
// // }
// //
// // function checkFile(folderFile: string, meta: string): boolean {
// //   if (path.extname(folderFile) !== metaFileExtension) {
// //     return false;
// //   }
// //   const fileContent = fs.readFileSync(folderFile, {encoding: 'utf-8'});
// //   return fileContent.toLowerCase().indexOf(meta.toLowerCase()) !== -1;
// // }

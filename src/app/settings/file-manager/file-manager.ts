// import {Injectable} from '@angular/core';
// import {Profile} from '../profiles/profile';
// // import {FileItem, metaFileExtension} from './file-manager.interfaces';
// declare var remote: any;
//
// @Injectable({providedIn: 'root'})
// export class FileManager {
//   private worker: Worker;
//
//   constructor() {}
//
//   public runCheck(profile: Profile): void {
//     this.reset();
//     this.spawnWorker(profile);
//   }
//
//   public reset(): void {
//     this.destroy();
//   }
//
//   private spawnWorker(profile: Profile): void {
//     const worker = new Worker('./file-manager.worker', {type: 'module'});
//     worker.addEventListener('message', ({data}) => this.onWorkerMessage(data));
//     worker.postMessage({
//       folder: profile.folder,
//       meta: profile.meta
//     });
//     this.worker = worker;
//   }
//
//   private onWorkerMessage(data): void {
//     switch (data.type) {
//       case 'debug':
//         console.log('debug', data);
//         break;
//       case 'progress':
//         console.log('progress', data);
//         break;
//       case 'done':
//         console.log('done', data);
//         this.destroy();
//         break;
//     }
//   }
//
//   private destroy(): void {
//     if (this.worker) {
//       this.worker.terminate();
//       this.worker = null;
//     }
//   }
// }

export const metaFileExtension = '.meta';

export interface FileItem {
  path: string;
  relative_path: string;
  title: string;
  name: string;
  ext: string;
}

export enum FileExtension {
  psd = 'psd',
  png = 'png',
  jpg = 'jpg',
  jpeg = 'jpeg',
  gif = 'gif'
}

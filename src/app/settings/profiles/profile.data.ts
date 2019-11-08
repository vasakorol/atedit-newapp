export const dataBase = [
  "admin",
  "atavism",
  "master",
  "world_content"
] as const;
export type DataBase = (typeof dataBase)[number];

export interface DataBaseProfile {
  type: DataBase;
  host: string;
  port: string;
  database: string;
  user: string;
  password: string;
}
export interface Profile {
  id: string;
  name: string;
  game_folder: string;
  selected: boolean;
  databases: DataBaseProfile[];
  deleted: boolean;
}
export enum FormType {
  edit = "edit",
  new = "new"
}

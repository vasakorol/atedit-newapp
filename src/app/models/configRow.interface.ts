export enum ConfigTypes {
  number = 'number',
  string = 'string',
  dropdown = 'dropdown',
  boolean = 'boolean',
  date = 'date'
}

export interface ConfigRow {
  type: ConfigTypes;
  visible: boolean;
  filterVisible: boolean;
  useAsSearch: boolean;
  data?: {id: number | string; title: string}[];
}

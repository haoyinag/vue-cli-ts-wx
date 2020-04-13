export interface Meta {
  title: string;
  [prop: string]: any;
}

export interface RouteItem {
  path: string;
  name: string;
  meta: Meta;
  component: any;
  [prop: string]: any;
}

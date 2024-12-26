export interface IRoute {
  id: number
  pid: number
  path: string
  name: string
  link?: string
  title: string
  children?: IRoute[]
}

export interface IRouteTree {
  path: string
  name: string
  title: string
  component: Function
  children?: IRouteTree[]
}

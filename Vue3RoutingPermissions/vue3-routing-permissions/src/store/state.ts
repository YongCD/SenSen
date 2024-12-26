import { type IRoute } from '../types'

export interface IState {
  id: number,
  hasAuth: boolean,
  routeTree: IRoute[]
}

export default {
  id: 3,
  hasAuth: false,
  routeTree: []
}

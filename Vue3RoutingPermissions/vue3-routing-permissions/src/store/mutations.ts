import { SET_ROUTE_TREE, SET_AUTH } from './mutationTypes'
import { type IState } from './state'
import { type IRoute } from '../types'

export default {
  [SET_ROUTE_TREE] (state: IState, routeTree: IRoute[]) {
    state.routeTree = routeTree
  },
  [SET_AUTH] (state: IState, auth: boolean) {
    state.hasAuth = auth
  }
}

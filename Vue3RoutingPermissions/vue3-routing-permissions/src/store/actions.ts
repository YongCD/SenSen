import { type Commit } from 'vuex'
import { SET_ROUTE_TREE, SET_AUTH } from './mutationTypes'
import type { IState } from './state'
import type { IRoute } from '@/types'
import { getUserRouteListApi } from '../api'
import { formatRouteTree } from '@/libs'

export default {
  async setRouteTree ({ commit, state }: { commit: Commit, state: IState }) {
    const res = await getUserRouteListApi(state.id)
    const routeList = res.data as unknown as IRoute[]
    console.log('routeList', routeList)
    const routeTree = formatRouteTree(routeList)
    console.log('routeTree', routeTree)
    // commit(SET_ROUTE_TREE, routeTree)
    // commit(SET_AUTH, true)
  },
  setAuth ({ commit }: { commit: Commit }) {
    function test () {}
    test()
  }
}

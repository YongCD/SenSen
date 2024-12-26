import { createStore } from 'vuex'
import state, { type IState } from './state'
import mutations from './mutations'
import actions from './actions'

export default createStore<IState>({
  state,
  mutations,
  actions
})

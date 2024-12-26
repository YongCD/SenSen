import { http } from '@/libs'

function getUserRouteListApi (id: number) {
  return http.post('/api/user_router_list', { id })
}

export { getUserRouteListApi }

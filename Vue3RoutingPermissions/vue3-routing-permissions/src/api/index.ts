import { http } from '@/libs'

function getUserRouteList (id: number) {
  return http.post('/api/user_router_list', { id })
}

export { getUserRouteList }

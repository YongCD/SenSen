import type { IState } from '@/store/state';
import type { IRoute } from '@/types'
import type { Router, RouteRecordRaw } from 'vue-router'
import type { Store } from 'vuex';

function generateRouter (routeTree: IRoute[]): RouteRecordRaw[]  {
  const newRoutes = routeTree.map(item => {
    const route: RouteRecordRaw = {
      path: item.path,
      name: item.name,
      component: () => import(`@/views/${item.name}.vue`),
      meta: {
        title: item.title
      },
      children: []
    }
    if (item.children && item.children.length > 0) {
      route.children = generateRouter(item.children);
    }
    return route
  })
  console.log(newRoutes)
  return newRoutes
}

export default function routerBeforeEach (router: Router, store: Store<IState>) {
  router.beforeEach(async (_to, _from, next) => {
    if (!store.state.hasAuth) {
      await store.dispatch('setRouteTree')
      const newRoutes = generateRouter(store.state.routeTree)
      newRoutes.forEach(route => router.addRoute(route))
      next()
    } else {
      next()
    }
  })
}

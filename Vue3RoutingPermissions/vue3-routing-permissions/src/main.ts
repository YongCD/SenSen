import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import routerBeforeEach from './router/route'
routerBeforeEach(router, store)

createApp(App).use(store).use(router).mount('#app')

import { createSSRApp } from 'vue'
import pinia from './stores'
import share from './shareMixin/share.js'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)

  app.use(pinia)
  // app.mixin(share)
  return {
    app,
  }
}

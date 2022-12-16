/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from './router'
import print from 'vue3-print-nb'

export function registerPlugins (app) {
  loadFonts()
  app.use(vuetify)
  app.use(router)
  app.use(print)
}

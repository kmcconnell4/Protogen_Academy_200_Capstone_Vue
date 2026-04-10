import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// Custom CSS must come AFTER vuetify/styles (imported in plugin) so our variables override Vuetify defaults
import './assets/main.css'

createApp(App).use(router).use(vuetify).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
// import "@/styles/element/index.scss"
// import "element-plus/theme-chalk/src/message.scss"
// import 'uno.css'

import router from './router'

const app = createApp(App)
app.use(router)

app.mount('#app')

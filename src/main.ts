import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from '@/store'
import '@/permission'

import 'nprogress/nprogress.css'
// import 'element-plus/dist/index.css'
// import "@/styles/element/index.scss"
// import "element-plus/theme-chalk/src/message.scss"
// import 'uno.css'


const app = createApp(App)
app.use(router)
app.use(pinia)

app.mount('#app')

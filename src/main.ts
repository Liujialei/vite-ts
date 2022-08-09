import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from '@/store'
import '@/permission'

import '@/assets/style/reset.css'
import 'nprogress/nprogress.css'
import 'element-plus/dist/index.css'
//设置主题切换
// import "@/styles/element/index.scss"
// import 'uno.css'

// import "element-plus/theme-chalk/src/message.scss"

import 'virtual:svg-icons-register' //内引入注册脚本   vite-plugin-svg-icons
import SvgIcon from '@/components/SvnIcon/index.vue'
//引入element-plus图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(pinia)
app.use(router)

//组件化官网svg
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
app.component('SvgIcon', SvgIcon)

const ElIconsData = ElementPlusIconsVue as unknown as Array<() => Promise<typeof import('*.vue')>>
for (const iconName in ElIconsData) {
  app.component(`ElIcon${iconName}`, ElIconsData[iconName])
}

router.isReady().then(() => {
	app.mount('#app')
})


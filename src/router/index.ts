
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { allowRouter } from "./constantRoutes"
import Cancel from "@/utils/cancel";

const router = createRouter({
  history: createWebHashHistory(), 
  routes:allowRouter as unknown as RouteRecordRaw[],
  scrollBehavior () {
    return {
      top:0
    }
  }
})

//路由跳转之前处理
router.beforeEach((to, from, next) => {
  //处理路由跳转前取消所有请求 
	Cancel.clearPendings()
	next()
})

export default router
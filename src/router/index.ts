
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { allowRouter } from "./constantRoutes"

const router = createRouter({
  history: createWebHashHistory(), 
  routes:allowRouter as unknown as RouteRecordRaw[],
  scrollBehavior () {
    return {
      top:0
    }
  }
})

export default router
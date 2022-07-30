
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import { constantRouteList } from "./constantRoutes"

const route =[]

const router = createRouter({
	history: createWebHashHistory(), 
	routes:constantRouteList as unknown as RouteRecordRaw[],
	scrollBehavior () {
		return {
			top:0
		}
	}
})

export default router
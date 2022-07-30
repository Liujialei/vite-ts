import { defaultRule } from 'types/type'

export const constantRouteList = [
	{ 
		path: '/', 
		name:'login',
		component: () => import('@/view/login/index.vue')
	},
	{
		path: '/404',
		name:'/404',
		component: () => import('@/views/404.vue'),
		meta: {
			title: '404',
			hidden: true
		}
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'pathMatch(.*)*',
		redirect: '/404',
		meta: {
			hidden: true,
			title: 'Not Found'
		}
	}
]

function defaultConstant(router:Array<defaultRule>){
	return router
}

export const constantRoute =defaultConstant(constantRouteList)



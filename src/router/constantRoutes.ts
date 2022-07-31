import { IMenubarList } from '@/type/store/layout'
import { components } from './asyncRouter'

const Components:IObject<() => Promise<typeof import('*.vue')>> = Object.assign({}, components, {
    Layout: (() => import('@/layout/index.vue')) as unknown as () => Promise<typeof import('*.vue')>,
    Redirect: (() => import('@/layout/redirect.vue')) as unknown as () => Promise<typeof import('*.vue')>,
    LayoutBlank: (() => import('@/layout/blank.vue')) as unknown as () => Promise<typeof import('*.vue')>
})

export const allowRouter:Array<IMenubarList> = [
	{ 
		path: '/', 
		name:'Dashboard',
		redirect: '/Dashboard/Workplace',
		component: Components['Layout'],
		meta: { title: '仪表盘', icon: 'el-icon-eleme' },
		children: [
			{
				name: 'Workplace',
				path: '/Dashboard/Workplace',
				component: Components['Workplace'],
				meta: { title: '工作台', icon: 'el-icon-tools' }
			}
			// {
			//     name: 'Welcome',
			//     path: '/Dashboard/Welcome',
			//     component: Components['Welcome'],
			//     meta: { title: '欢迎页', icon: 'el-icon-tools' }
			// }
		]
	},
	{ 
		path: '/Login', 
		name:'Login',
		component: Components.Login,
		meta: { title: '登录', icon: 'el-icon-eleme', hidden: true }
	},
]



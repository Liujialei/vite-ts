import router from '@/router'
import { configure, start, done } from 'nprogress'
import { RouteRecordRaw } from 'vue-router'
import { decode, encode } from '@/utils/tools'
import { useLayoutStore } from '@/store/modules/layout'
import Cancel from "@/utils/cancel"

configure({ 
  // easing: 'ease', // 动画方式
  // speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  // trickleSpeed: 200, // 自动递增间隔
  // minimum: 0.3, // 更改启动时使用的最小百分比
  // parent: 'body' //指定进度条的父容器
})

const loginRoutePath = '/Login'
const defaultRoutePath = '/'
const verifyToken = 'token'

//添加一个导航守卫，在任何导航前执行。返回一个删除已注册守卫的函数。
router.beforeEach(async(to,from) => {
  start()
  const { 
		getStatus,
    getMenuRouteList,
		menuList,
    getTags,
    logout,
    GenerateRoutes,
    getUser, 
    concatAllowRoutes, 
    changeTagNavList, 
    addCachedViews, 
    changeNocacheViewStatus
  } = useLayoutStore()
	
  // 修改页面title
  const reg = new RegExp(/^(.+)(\s\|\s.+)$/)
  const appTitle = import.meta.env.VITE_APP_TITLE
  document.title = !to.meta.title
    ? appTitle
    : appTitle.match(reg) 
      ? appTitle.replace(reg, `${to.meta.title}$2`) 
      : `${to.meta.title} | ${appTitle}`

  // 判断当前是否在登陆页面
	 if(to.path.toLocaleLowerCase()===loginRoutePath.toLocaleLowerCase()){
    done()
    if(getStatus) return typeof to.query.from === 'string' ? decode(to.query.from) : defaultRoutePath
    return
  }

	 // 判断是否登录
	 	if(!getStatus) {
    	return loginRoutePath + (to.fullPath ? `?from=${encode(to.fullPath)}` : '')
	 	}

  // 判断是否还没添加过路由
  if(menuList.length === 0) {
    //获取用户信息
    await getUser()
    //获取路由信息
    await GenerateRoutes()
    for(let i = 0;i < menuList.length;i++) {
      router.addRoute(menuList[i] as RouteRecordRaw)
    }
    //合并路由
    concatAllowRoutes()
    return to.fullPath
  }
  // 切换导航，记录打开的导航(标签页)
  changeTagNavList(to) 

  // 离开当前页面时是否需要添加当前页面缓存
  !new RegExp(/^\/redirect\//).test(from.path) 
		&& getTags.tagsList.some(v => v.name === from.name) 
		&& !getTags.cachedViews.some(v => v === from.name)
		&& !getTags.isNocacheView
		&& addCachedViews({ name: from.name as string, noCache: from.meta.noCache as boolean })

  // 缓存重置
  changeNocacheViewStatus(false)
  //处理路由跳转前取消所有请求 
  Cancel.clearPendings()
})

router.afterEach(() => {
  done()
})

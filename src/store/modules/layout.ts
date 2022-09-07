import { defineStore } from 'pinia'
import { ILayout, ITagsList, IMenubarList, ITags, IUserInfo, IMenuRouteList } from '@/type/store/layout'
import { decode } from '@/utils/tools'
import router from '@/router'
import { generatorDynamicRouter } from '@/router/asyncRouter'
import { allowRouter } from "@/router/constantRoutes"
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { login, getRouterList, getUser } from '@/api/layout'
//公共api接口
import { getIdentifyCode } from '@/api'
import { ElMessage, ElNotification } from 'element-plus'
import qs from 'qs'
import encrypt from '@/utils/encrypt'
import { getLocalStorage, getToken, removeToken, setLocalStorage, setToken } from '@/utils/auth'
import { loginParam } from '@/type/utils/tools'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useLayoutStore = defineStore({
  id: 'layout',
  state: ():ILayout => ({
		//验证码
		IdentifyCode:'',
		//请求头部中的id
		headersId:'',
    // 用户信息
    userInfo: {},
		menuList:[],
    // 标签栏
    tags: {
      tagsList: [],
      cachedViews: [],
      isNocacheView: false
    }
  }),
  getters: {
		//验证码
		getterIdentifyCode():string{
			return this.IdentifyCode
		},
		//请求头部中的id
		getHeaderId():string{
			return this.headersId
		},
    getMenubar() {
      return getLocalStorage('menuPerms')
    },
		getMenuRouteList():IMenuRouteList{
			return this.menuList
		},
    getUserInfo():IUserInfo {
      return this.userInfo
    },
    getTags():ITags {
      return this.tags
    },
    //获取token认证信息
    getStatus() {
			return getToken('accessToken') 
    }
  },
  actions:{
		//请求头部中的id
		async getActionHeaderId(parpms:string):Promise<void> {
			this.headersId = parpms
		},
		//获取验证码
		async getIdentifyCode():Promise<void>{
			const res:any = await getIdentifyCode()
			const {success,entity,message} = res
			if(success){
				this.IdentifyCode = entity
			}else{
				 ElMessage({
          message,
          type: 'error'
        })
			} 
		},
		//点击左导航缩放
    changeCollapsed():void {
      
    },
		//浏览器缩放处理
    changeDeviceWidth():void {
			// this.menubar.status = !this.menubar.status
    },
    // 切换导航，记录打开的导航
    changeTagNavList(cRouter:RouteLocationNormalizedLoaded):void {
     
      // if(cRouter.meta.hidden && !cRouter.meta.activeMenu) return // 隐藏的菜单如果不是子菜单则不添加到标签
      if(new RegExp('^\/redirect').test(cRouter.path)) return
      const index = this.tags.tagsList.findIndex(v => v.path === cRouter.path)
      this.tags.tagsList.forEach(v => v.isActive = false)
      // 判断页面是否打开过
      if(index !== -1) {
        this.tags.tagsList[index].isActive = true
        return
      }
      const tagsList:ITagsList = {
        name: cRouter.name as string,
        title: cRouter.meta.title as string,
        path: cRouter.path,
        isActive: true
      }
      this.tags.tagsList.push(tagsList)
    },
		//标签处理
    removeTagNav(obj:{tagsList:ITagsList, cPath: string}):void {
      const index = this.tags.tagsList.findIndex(v => v.path === obj.tagsList.path)
      if(this.tags.tagsList[index].path === obj.cPath) {
        this.tags.tagsList.splice(index, 1)
        const i = index === this.tags.tagsList.length ? index - 1 : index
        this.tags.tagsList[i].isActive = true
        this.removeCachedViews({ name: obj.tagsList.name, index })
        router.push({ path: this.tags.tagsList[i].path })
      }else{
        this.tags.tagsList.splice(index, 1)
        this.removeCachedViews({ name: obj.tagsList.name, index })
      }
    },
    // 添加缓存页面
    addCachedViews(obj: {name: string, noCache: boolean}):void {
      if(obj.noCache || this.tags.cachedViews.includes(obj.name)) return
      this.tags.cachedViews.push(obj.name)
    },
    // 删除缓存页面
    removeCachedViews(obj: { name: string, index: number }):void {
      // 判断标签页是否还有该页面
      if(this.tags.tagsList.map(v => v.name).includes(obj.name)) return
      this.tags.cachedViews.splice(obj.index, 1)
    },
    // 缓存重置
    changeNocacheViewStatus(isNoCache: boolean) {
      this.tags.isNocacheView = isNoCache
    },
    //退出登录
    logout():void {
      removeToken('accessToken')
      history.go(0)
    },
    //登录信息
    async login(param: loginParam):Promise<void> {
			const {
        username,
        password,
        kaptcha,
        id
      } = param
			const nameEncrypt = encrypt(username)
      const passwordEncrypt = encrypt(password)
			const _param = qs.stringify({
        username: nameEncrypt,
        password: passwordEncrypt,
        kaptcha,
        id
      })
      const res = await login(_param)
      const {success,entity,message} = res
			if(success){
        const { access_token } = entity 
        //登录成功得到token
				setToken('accessToken', access_token)
				const { query } = router.currentRoute.value
				router.push(
					typeof query.from === 'string' 
						? decode(query.from) : '/'
				)
      }else{
				ElNotification({
					message,
					type: 'error'
				})
      }
    },
    //获取用户信息
    async getUser():Promise<void> {
      const res = await getUser()
			const {success,entity,message} = res
			if(success){
				setLocalStorage('userInfo', entity)
				this.userInfo = entity
      }else{
				ElNotification({
					message,
					type: 'error'
				})
      }
    },
    //获取路由表信息
    async GenerateRoutes():Promise<void> {
      const res = await getRouterList()
      const { success,entity,message } = res
			if(success){
				setLocalStorage('menuPerms', entity)
				//异步加载的路由表进行权限处理
				generatorDynamicRouter(entity)
			}else{
				ElNotification({
					message,
					type: 'error'
				})
			}
    },
    //获取处理后的路由信息
    setRoutes(data: Array<IMenubarList>):void {
      this.menuList = data
    },
    //合并路由
    concatAllowRoutes():void {
      allowRouter.reverse().forEach(v => this.menuList.unshift(v))
    }
  }
})
import { useLayoutStore } from '@/store/modules/layout'
import axios,{ AxiosResponse } from 'axios'
import qs from 'qs'
import Cancel from './cancel'
import { ElLoading, ElNotification } from 'element-plus'

let loading:{close():void}
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_PUBLIC_PATH as string | undefined,
  timeout: 5000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error:any) => {
	loading.close()
	if(axios.isCancel(error)){
		console.log('这是手动cancel的')
	}else{
		console.log(`err${error}`)
		ElNotification({
			title: '请求失败',
			message: error.message,
			type: 'error'
		})
	}
  return Promise.reject(error)
}

//添加请求拦截器
request.interceptors.request.use(config => {
  const { getStatus } = useLayoutStore()
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.4)'
  })
	//token
  const token = getStatus.ACCESS_TOKEN
  if (token) {
    if(config&&config?.headers){
      config.headers['Access-Token'] = token
    }
  }
	
	Cancel.removePending(config)
  return Cancel.addPending(config)
}, errorHandler)

// 添加响应拦截器 
request.interceptors.response.use((response:AxiosResponse<IResponse>) => {
  Cancel.clearPendings()
	// 对返回数据做点啥 比如状态进行拦截
	const { data } = response
  const { getStatus, logout } = useLayoutStore()
  // loading.close()
  if(data.Code !== 200) {
    let title = '请求失败'
    if(data.Code === 401) {
      if (getStatus.ACCESS_TOKEN) {
        logout()
      }
      title = '身份认证失败'
    }
    ElNotification({
      title,
      message: data.Msg,
      type: 'error'
    })
    // return Promise.reject(new Error(data.Msg || 'Error'))
  }
  return response
}, errorHandler)


export default request
import { useLayoutStore } from '@/store/modules/layout'
import axios,{ AxiosResponse } from 'axios'
import qs from 'qs'
import Cancel from './cancel'
import { ElLoading, ElNotification } from 'element-plus'
import { storeToRefs } from 'pinia'

let loading:{close():void}
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  // baseURL: import.meta.env.VITE_PUBLIC_PATH as string | undefined,
  timeout: 360000 // 请求超时时间
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
  loading = ElLoading.service({
    // lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  //token
	const { getStatus } = useLayoutStore()
  const token = getStatus
  if (token) {
    if(config&&config?.headers) 
		config.headers['Authorization'] = 'Bearer ' + token
  }else{
		if(config&&config?.headers)
		config.headers['Authorization'] = 'Basic ' + btoa("CLIENT:SECRET")
	}
	if(config&&config?.headers)
	config.headers['Sid'] = '63ad4445e1ca4c34ab6e5f1d51d4a179'
  Cancel.removePending(config)
  return Cancel.addPending(config)
	// return config
}, errorHandler)

// 添加响应拦截器 
request.interceptors.response.use((response:AxiosResponse<IResponse>) => {
  
	Cancel.clearPendings()
  // 对返回数据做点啥 比如状态进行拦截
  const { data,status,headers:{id} } = response
  const { getStatus } = storeToRefs(useLayoutStore())
  const { getActionHeaderId } = useLayoutStore()
	//获取headerId信息
	getActionHeaderId(id)
  loading.close()
	
	if(status===200){
		return data
		// if(!data.success) {
		// 	// let title = '请求失败'
		// 	// ElNotification({
		// 	// 	title,
		// 	// 	message: data.Msg,
		// 	// 	type: 'error'
		// 	// })
		// 	const res = {
		// 		data:{
		// 			success:false,
		// 			message:data.Msg,
		// 			entity:null
		// 		}
		// 	}
		// 	return res
 	  // }else{
		// 	return data
		// }
	}else{
		let title = '请求失败'
		ElNotification({
			title,
			message: data.message,
			type: 'error'
		})
	}
  
}, errorHandler)


export default function ajax( base_url:string = '', url:string = '', params: IObject<any> = {}, type:string = 'GET'):any{
  let promise:any
  return new Promise((resolve, reject) => {
    Object.keys(params).forEach((key) => {
      if (params[key] === null || params[key] === 'null' || params[key] === '' || params[key] === undefined)
        delete params[key]
    })
    if (type === 'GET') {
      if (typeof params === 'object') {
        // 组装GET请求中的ual
        url = base_url + url
        // 返回axios返回的promise
        promise = request.get(url, {params})
      } else {
        url = base_url + url
        // 返回axios返回的promise
        promise = request.get(url)
      }
    } else if (type === 'POST') {
      url = base_url + url
      promise = request.post(url, params)
    } else if (type === 'PUT') {
      if (typeof params === 'object') {
        // 组装GET请求中的ual
        url = base_url + url
        // 返回axios返回的promise
        promise = request.put(url, params)
      } else {
        url = base_url + url
        // 返回axios返回的promise
        promise = request.put(url)
      }
    } else if (type === 'PATCH') {
      url = base_url + url
      promise = request.patch(url, params)
    } else if (type === 'DELETE') {
      url = base_url + url
      promise = request.delete(url, {params})
    }
    promise.then((response: unknown) => {
      resolve(response)
    }).catch((error: any) => {
      reject(error)
    })
  })
}
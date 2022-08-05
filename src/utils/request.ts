import { useLayoutStore } from '@/store/modules/layout'
import axios,{ AxiosResponse } from 'axios'
import qs from 'qs'
import { ElLoading, ElNotification } from 'element-plus'

const CancelToken = axios.CancelToken
const pendingRequest = new Map(); // 请求对象
let loading:{close():void}
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_PUBLIC_PATH as string | undefined,
  timeout: 5000 // 请求超时时间
})

// 获取请求key
function getReqKey(config:any) {
  // 请求方式、请求地址、请求参数生成的字符串来作为是否重复请求的依据
  const { method, url, params, data } = config; // 解构出来这些参数
  // GET ---> params  POST ---> data
  const requestKey =  [ method, url, qs.stringify(params), qs.stringify(data)].join('&');
  return requestKey;
}

// 取消重复请求
function removeReqKey(key:any) {
	const cancelToken = pendingRequest.get(key);
  cancelToken(key); // 取消之前发送的请求
  pendingRequest.delete(key); // 请求对象中删除requestKey
}

// 异常拦截处理器
const errorHandler = (error:any) => {
	//异常处理
  let requestKey = getReqKey(error?.config)
  removeReqKey(requestKey)
	loading.close()
  console.log(`err${error}`)
  ElNotification({
    title: '请求失败',
    message: error.message,
    type: 'error'
  })
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
	console.log(config);
  const token = getStatus.ACCESS_TOKEN
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    if(config&&config?.headers){
      config.headers['Access-Token'] = token
    }
  }
	// 获取请求key
  let requestKey = getReqKey(config);
	// 判断是否是重复请求
  if (pendingRequest.has(requestKey)) { // 是重复请求
    removeReqKey(requestKey); // 取消
  }else{
    // 设置cancelToken
    config.cancelToken = new CancelToken(function executor(cancel) {
      pendingRequest.set(requestKey, cancel); // 设置
    })

  }
  return config
}, errorHandler)

// 添加响应拦截器 
request.interceptors.response.use((response:AxiosResponse<IResponse>) => {
	// 请求对象中删除requestKey
  let requestKey = getReqKey(response.config)
	removeReqKey(requestKey)
  // 对返回数据做点啥 比如状态进行拦截
	const { data } = response
  const { getStatus, logout } = useLayoutStore()
  loading.close()
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
    return Promise.reject(new Error(data.Msg || 'Error'))
  }
  return response
}, errorHandler)


export default request
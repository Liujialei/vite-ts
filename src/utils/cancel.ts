import axios from 'axios'
import { ElMessage } from 'element-plus'

let pendings = {} as unknown as any
// 添加请求
const addPending = (config:any) => {
	const {url,methods,data,headers} = config;
	const id = [url,methods,JSON.stringify(data),JSON.stringify(headers)].join('&')
	const cancel = pendings[id]
	config.cancelToken = config.cancelToken || new axios.CancelToken(c => {
		if(!cancel){
				// 不存在，就存进去
				pendings[id] = c
		}
	}) 
	return config
}
// 删除请求
const removePending = (config:any) => {
	const {url,methods,data,headers} = config;
	const id = [url,methods,JSON.stringify(data),JSON.stringify(headers)].join('&')
	const cancel = pendings[id]
	if(cancel && typeof cancel == 'function'){
			// 存在这个请求，删除
			cancel()
			delete pendings[id]
			ElMessage({
				message:'请求频繁,加载中',
				type: 'warning'
			})
	}
}
// 清除所有请求
const clearPendings = () => {
    Object.keys(pendings).forEach(element => {
			element = pendings[element]
			// delete pendings[element]
		})
}
export default{ 
	addPending,
	removePending,
	clearPendings
}
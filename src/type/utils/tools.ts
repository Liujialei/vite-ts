
export interface ILocalStore {
    startTime: number
    expires: number
    [propName: string]: any
}
//登录
export interface loginParam {
	username: string,
	password: string,
	kaptcha: string,
	id: string
}
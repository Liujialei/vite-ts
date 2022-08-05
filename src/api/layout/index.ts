import request from '@/utils/request'
import { AxiosResponse } from 'axios'
import { IMenubarList } from '@/type/store/layout'
import { filterParam } from "@/enums/filterParam"
import { api } from "@/type/mockApi"

export interface loginParam {
	userName: string,
	passWord: string
}

export function login(param: loginParam):Promise<AxiosResponse<IResponse<string>>> {
  return request({
    url: api.login,
    method: 'post',
    data: filterParam(param)
  })
}

export function publickey():Promise<AxiosResponse<IResponse<string>>> {
  return request({
    url: api.publickey,
    method: 'get'
  })
}

interface IGetuserRes {
	name: string
	role: Array<string>
}

export function getUser(): Promise<AxiosResponse<IResponse<IGetuserRes>>> {
  return request({
    url: api.getUser,
    method: 'get'
  })
}
export function getRouterList(): Promise<AxiosResponse<IResponse<Array<IMenubarList>>>> {
  return request({
    url: api.getRouterList,
    method: 'get'
  })
}
import ajax from '@/utils/request'
import { AxiosResponse } from 'axios'
import { IMenubarList } from '@/type/store/layout'
import { filterParam } from "@/enums/filterParam"
import { api } from "@/type/mockApi"

const elephantExt = '/elephantExt'
//登录
export const login = (param:any) => ajax(elephantExt, api.login, param, 'POST')
//用户信息
export const getUser = () => ajax(elephantExt, api.userUrl)
//用户权限
export const getRouterList = () => ajax(elephantExt, api.getRouterList)

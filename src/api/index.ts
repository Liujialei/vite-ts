//公共接口处理
import ajax from '@/utils/request'
import { AxiosResponse } from 'axios'
import { api } from "@/type/mockApi"
import { filterParam } from "@/enums/filterParam"

//登录页面获取验证码
export const getIdentifyCode = () => ajax('/newelephant', '/v1/user/kaptcha/request')
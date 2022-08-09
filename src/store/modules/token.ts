import axios from 'axios'
import { defineStore } from 'pinia'
import {  getLocal, decode } from '@/utils/tools'
import { IStatus } from '@/type/store/layout'
//获取token
const { ACCESS_TOKEN } = getLocal<IStatus>('token')

export const localToken = defineStore({
  id: 'localToken',
  state:()=>({
    //获取token认证信息
    localSstatus: {
      isLoading: false,
      ACCESS_TOKEN: ACCESS_TOKEN || ''
    }
  }),
  getters:{
		//获取token认证信息
    getStatus():IStatus {
      return this.localSstatus
    }
  },
  actions:{

  }

})
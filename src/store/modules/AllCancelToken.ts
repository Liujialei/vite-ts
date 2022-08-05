import axios from 'axios'
import { defineStore } from 'pinia'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

export const allQequestCancel = defineStore({
	id: 'allQequestCancel',
	state:()=>({
		requestCancel:[]
	}),
	getters:{

	},
	actions:{

	}

})
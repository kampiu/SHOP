import ajax from '@/util/http'
import API from '@/util/api'
import { Toast } from 'mint-ui'

const orderStore = {
	namespaced: true,
	state: {
		orderList: [],
		createOrder: {}
	},
	getters: {

	},
	mutations: {
		initOrderList(state, list){
			state.orderList = list
		}
	},
	actions: {
	
	}
}

export default orderStore
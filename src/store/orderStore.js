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
		initOrderList(state, list) {
			state.orderList = list
		},
		initNewOrder(state, data){
			state.createOrder.order = [data.order]
			state.createOrder.code = data.id
		}
	},
	actions: {
		createNewOrder({
			state,
			commit
		}, data) {
			commit("initNewOrder", data)
		}
	}
}

export default orderStore
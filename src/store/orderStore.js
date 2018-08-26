import ajax from '@/util/http'
import API from '@/util/api'
import { Toast } from 'mint-ui'

const orderStore = {
	namespaced: true,
	state: {
		orderList: [],
		createOrder: {},
		cartRefresh:false
	},
	getters: {

	},
	mutations: {
		cartHandleRefresh(state){
			state.cartRefresh = !state.cartRefresh
		},
		initOrderList(state, list) {
			state.orderList = list
		},
		addOrder(state, data){
			state.orderList.push(data)
			state.createOrder = {}
			try{
				localStorage.removeItem("yoho_order_confirm")
			}catch(e){
				
			}
		},
		initNewOrder(state, data){
			localStorage.setItem("yoho_order_confirm", JSON.stringify(data))
			state.createOrder.order = data.order
		},
		getNewOrder(state){
			try{
				state.createOrder = localStorage.getItem("yoho_order_confirm") ? JSON.parse(localStorage.getItem("yoho_order_confirm")) : {}
			}catch(e){
				state.createOrder = {}
			}
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
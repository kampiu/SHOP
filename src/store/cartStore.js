const commonStore = {
	namespaced: true,
	state: {
		cart:[],
		collect:[]
	},
	getters: {

	},
	mutations: {
		initCart(state, list){
			state.cart = list
		},
		initCollect(state, list){
			state.collect = list
		},
		addCart(state, data){
			for(let i = 0,len = state.cart.length;i < len;i++){
				if(state.cart.pro_id === data.id && state.cart.pro_sku === data.pro_sku){
					state.cart[i].pro_num++
					return
				}
			}
			state.cart.push(data)
		},
		remove(state, data){
			for(let i = 0,len = state.cart.length;i < len;i++){
				if(state.cart.pro_id === data.id){
					state.cart.splice(i, 1)
					break
				}
			}
		}
	},
	actions: {
		
	}
}

export default commonStore
import AJAX from '@/util/http'
import API from '@/util/api'

let timeout, target = []
const commonStore = {
	namespaced: true,
	state: {
		cart: [],
		collect: [],
		cartPrice: 0,
		cartCount: 0,
		allCheck: false
	},
	getters: {

	},
	mutations: {
		initCart(state, list) {
			state.cart = []
			for(let i = 0, len = list.length; i < len; i++) {
				list[i].pro_check = false
				state.cart.push(list[i])
			}
			state.cartPrice = 0
		},
		checkedCart(state, index) {
			state.cart[index].pro_check = !state.cart[index].pro_check
			this.commit("cart/cartForm")
		},
		initCollect(state, list) {
			state.collect = list
		},
		//		addCart(state, data) {
		//			for(let i = 0, len = state.cart.length; i < len; i++) {
		//				if(state.cart[i].pro_id === data.id && state.cart[i].pro_sku === data.sku) {
		//					state.cart[i].pro_num++
		//						return
		//				}
		//			}
		//			data.pro_check = false
		//			state.cart.push(data)
		//		},
		//		remove(state, data) {
		//			for(let i = 0, len = state.cart.length; i < len; i++) {
		//				if(state.cart[i].pro_id === data.id && state.cart[i].pro_sku === data.sku) {
		//					state.cart.splice(i, 1)
		//					break
		//				}
		//			}
		//		},
		addCount(state, data) {
			for(let i = 0, len = state.cart.length; i < len; i++) {
				if(state.cart[i].pro_id === data.pro_id && state.cart[i].pro_sku === data.pro_sku) {
					state.cart[i].pro_num++
						this.commit("cart/cartForm")
					return
				}
			}
		},
		removeCount(state, data) {
			for(let i = 0, len = state.cart.length; i < len; i++) {
				if(state.cart[i].pro_id === data.pro_id && state.cart[i].pro_sku === data.pro_sku) {
					if(state.cart[i].pro_num === 1) {
						state.cart.splice(i, 1)
					} else {
						state.cart[i].pro_num--
					}
					this.commit("cart/cartForm")
					return
				}
			}
		},
		allCheck(state) {
			state.cartPrice = 0
			state.cartCount = 0
			state.allCheck = !state.allCheck
			for(let i = 0, len = state.cart.length; i < len; i++) {
				state.cart[i].pro_check = state.allCheck
				if(state.allCheck) {
					state.cartPrice += parseFloat(state.cart[i].pro_price) * parseFloat(state.cart[i].pro_num)
					state.cartCount += parseFloat(state.cart[i].pro_num)
				}
			}
		},
		cartForm(state) {
			state.cartPrice = 0
			state.cartCount = 0
			let count = 0
			for(let i = 0, len = state.cart.length; i < len; i++) {
				if(state.cart[i].pro_check) {
					count++
					state.cartPrice += parseFloat(state.cart[i].pro_price) * parseFloat(state.cart[i].pro_num)
					state.cartCount += parseFloat(state.cart[i].pro_num)
				}
			}
			state.allCheck = count === state.cart.length ? true : false
		},
		deleteCartItem(state, data) {
			console.log("~~~~")
			for(let i = 0, len = state.cart.length; i < len; i++) {
				if(state.cart[i].pro_id === data.pro_id && state.cart[i].pro_sku === data.pro_sku) {
					state.cart.splice(i, 1)
					this.commit("cart/cartForm")
					break
				}
			}
		}
	},
	actions: {
		addCartCount({
			state,
			commit
		}, data) {
			for(let i = 0, len = state.cart.length; i < len; i++) {
				if(state.cart[i].pro_code_bar === data.id && state.cart[i].pro_sku === data.sku) {
					this.commit("cart/addCount", Object.assign({}, state.cart[i]))
					let obj = {
							id: state.cart[i].pro_code_bar,
							attr: state.cart[i].pro_attr,
							num: 1,
							sku: state.cart[i].pro_sku
						},
						flag = true
					if(target.length > 0) {
						for(let j = 0, lens = target.length; j < lens; j++) {
							if(target[j].id === obj.id && target[j].sku === obj.sku) {
								target[j].num += 1
								flag = false
							}
						}
						flag && target.push(obj)
					} else {
						target.push(obj)
					}
					break
				}
			}
			if(timeout) clearTimeout(timeout)
			timeout = setTimeout(() => {
				AJAX.post(API.addCart(), {
					order: target
				}).then(res => {
					console.log(res.msg)
				}).catch(err => {
					console.log("添加购物车失败", err)
				})
				target = []
				clearTimeout(timeout)
			}, 500)
		},
		removeCartCount({
			state,
			commit
		}, data) {
			for(let i = 0, len = state.cart.length; i < len; i++) {
				if(state.cart[i].pro_code_bar === data.id && state.cart[i].pro_sku === data.sku) {
					if(!data.all) {
						this.commit("cart/removeCount", Object.assign({}, state.cart[i]))
					}
					let obj = {
							id: state.cart[i].pro_code_bar,
							attr: state.cart[i].pro_attr,
							num: data.all ? data.num : 1,
							sku: state.cart[i].pro_sku
						},
						flag = true
					if(target.length > 0) {
						for(let j = 0, lens = target.length; j < lens; j++) {
							if(target[j].id === obj.id && target[j].sku === obj.sku) {
								target[j].num += 1
								flag = false
							}
						}
						flag && target.push(obj)
					} else {
						target.push(obj)
					}
					if(data.all) {
						this.commit("cart/deleteCartItem", Object.assign({}, state.cart[i]))
					}
					break
				}
			}
			if(timeout) clearTimeout(timeout)
			timeout = setTimeout(() => {
				AJAX.post(API.removeCart(), {
					order: target
				}).then(res => {
					console.log(res.msg)
				}).catch(err => {
					console.log("添加购物车失败", err)
				})
				target = []
				clearTimeout(timeout)
			}, 500)
		}
	}
}

export default commonStore
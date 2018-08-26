import addressStore from "@/store/addressStore"
import commonStore from '@/store/commonStore'
import goodsStore from "@/store/goodsStore"
import orderStore from "@/store/orderStore"
import cartStore from '@/store/cartStore'
import userStore from "@/store/userStore"
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const Store = new Vuex.Store({
	getters: {
		router: state => state.common.router,
		cate: state => state.common.cate,
		brandList: state => state.common.brandList,
		wechat: state => state.common.wechat,
		coupons: state => state.common.coupons,
		
		cart: state => state.cart.cart,
		collect: state => state.cart.collect,
		cartPrice: state => state.cart.cartPrice,
		cartCount: state => state.cart.cartCount,
		allCheck: state => state.cart.allCheck,
		
		goods: state => state.goods.goods,
		type: state => state.goods.type,
		brand: state => state.goods.brand,
		pages: state => state.goods.pages,
		
		token: state => state.user.token,
		email: state => state.user.email,
		picurl: state => state.user.picurl,
		nickname: state => state.user.nickname,
		sex: state => state.user.sex,
		waller: state => state.user.waller,
		birth: state => state.user.birth,
		acount: state => state.user.acount,
		
		userAddress: state => state.address.userAddress,
		adrSelect: state => state.address.adrSelect,
		
		orderList: state => state.order.orderList,
		createOrder: state => state.order.createOrder,
		cartRefresh: state => state.order.cartRefresh
	},
	mutations: {
		
	},
	modules: {
		address: addressStore,
		common: commonStore,
		goods: goodsStore,
		order: orderStore,
		cart: cartStore,
		user: userStore
	}
})




export default Store
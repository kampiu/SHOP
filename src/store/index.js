import Vue from 'vue'
import Vuex from 'vuex'
import commonStore from '@/store/commonStore'
import cartStore from '@/store/cartStore'
import goodsStore from "@/store/goodsStore"
import userStore from "@/store/userStore"
import addressStore from "@/store/addressStore"

Vue.use(Vuex)

const Store = new Vuex.Store({
	getters: {
		router: state => state.common.router,
		cate: state => state.common.cate,
		brandList: state => state.common.brandList,
		
		cart: state => state.cart.cart,
		collect: state => state.cart.collect,
		
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
		adrSelect: state => state.address.adrSelect
	},
	mutations: {
		
	},
	modules: {
		common: commonStore,
		cart: cartStore,
		goods: goodsStore,
		user: userStore,
		address: addressStore
	}
})




export default Store
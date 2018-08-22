import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//view-box
const YohoView = () =>
	import('@/view/YohoView')
const YohoHome = () =>
	import('@/view/Tabbar/YohoHome')
const YohoClassify = () =>
	import('@/view/Tabbar/YohoClassify')
const YohoCart = () =>
	import('@/view/Tabbar/YohoCart')
const YohoPersonal = () =>
	import('@/view/Tabbar/YohoPersonal')
	
//Goods
const YohoGoodsList = () =>
	import('@/view/Goods/YohoGoodsList')
const YohoGoods = () =>
	import('@/view/Goods/YohoGoods')

//order-box
const YohoOrderList = () =>
	import('@/view/Order/YohoOrderList')
const YohoOrderInfo = () =>
	import('@/view/Order/YohoOrderInfo')

//address-box
const YohoAddress = () =>
	import('@/view/Address/addressList')
const YohoAddressEdit = () =>
	import('@/view/Address/addressEdit')
const YohoAddressMap = () =>
	import('@/view/Address/addressMap')

//common
const YohoCoupon = () =>
	import('@/view/Common/YohoCoupon')
const YohoCollect = () =>
	import('@/view/Common/YohoCollect')
const YohoSetting = () =>
	import('@/view/Common/YohoSetting')
const YohoLogin = () =>
	import('@/view/Common/YohoLogin')
const YohoRegister = () =>
	import('@/view/Common/YohoRegister')


export default new Router({
	mode: 'hash',
	routes: [{
		name: 'index',
		path: '/',
		component: YohoView,
		redirect: '/home',
		children: [{
			name: 'YohoHome',
			path: '/home',
			component: YohoHome
		}, {
			name: 'YohoClassify',
			path: '/cate',
			component: YohoClassify
		}, {
			name: 'YohoCart',
			path: '/cart',
			component: YohoCart
		}, {
			name: 'YohoPersonal',
			path: '/personal',
			component: YohoPersonal
		}]
	}, {
		path: '/goods',
		name: 'YohoGoodsList',
		component: YohoGoodsList
	}, {
		path: '/goods/:id',
		name: 'YohoGoods',
		component: YohoGoods
	}, {
		path: '/coupon',
		name: 'YohoCoupon',
		component: YohoCoupon
	}, {
		path: '/login',
		name: 'YohoLogin',
		component: YohoLogin
	}, {
		path: '/register',
		name: 'YohoRegister',
		component: YohoRegister
	}, { 
		path: '/address',
		name: 'YohoAddress',
		component: YohoAddress
	}, {
		path: '/address/edit/:id',
		name: 'YohoAddressEdit',
		component: YohoAddressEdit
	},  {
		path: '/address/add',
		name: 'YohoAddressAdd',
		component: YohoAddressEdit
	}, {
		path: '/address/map',
		name: 'YohoAddressMap',
		component: YohoAddressMap
	}, {
		path: '/collect',
		name: 'YohoCollect',
		component: YohoCollect
	}, {
		path: '/setting',
		name: 'YohoSetting',
		component: YohoSetting
	}, {
		path: '/order',
		name: 'YohoOrderList',
		component: YohoOrderList
	}, {
		path: '/order/:id',
		name: 'YohoOrderInfo',
		component: YohoOrderInfo
	}, {
		path: '*',
		redirect: '/home'
	}]
})
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

//address-box
const YohoAddress = () =>
	import('@/view/address/addressList')
const YohoAddressEdit = () =>
	import('@/view/address/addressEdit')
const YohoAddressMap = () =>
	import('@/view/address/addressMap')

//common
const YohoCoupon = () =>
	import('@/view/common/YohoCoupon')
const YohoLogin = () =>
	import('@/view/common/YohoLogin')
const YohoRegister = () =>
	import('@/view/common/YohoRegister')


export default new Router({
	mode: 'history',
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
		path: '*',
		redirect: '/home'
	}]
})
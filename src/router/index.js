import store from '@/store/index'
import Router from 'vue-router'
import Vue from 'vue'

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

const router =  new Router({
	mode: 'hash',
	routes: [{
		name: 'index',
		path: '/',
		component: YohoView,
		meta: {
			title: "SHOP",
			description: "SHOP,电商,购物,测试,侵删,Billson"
		},
		redirect: '/home',
		children: [{
			name: 'YohoHome',
			path: '/home',
			component: YohoHome,
			meta: {
				title: "首页",
				description: "SHOP,测试,侵删,Billson - 首页"
			}
		}, {
			name: 'YohoClassify',
			path: '/cate',
			component: YohoClassify,
			meta: {
				title: "分类",
				description: "SHOP,测试,侵删,Billson - 分类"
			}
		}, {
			name: 'YohoCart',
			path: '/cart',
			component: YohoCart,
			meta: {
				title: "购物车",
				description: "SHOP,测试,侵删,Billson - 购物车",
				requireAuth: true
			}
		}, {
			name: 'YohoPersonal',
			path: '/personal',
			component: YohoPersonal,
			meta: {
				title: "个人",
				description: "SHOP,测试,侵删,Billson - 个人"
			}
		}]
	}, {
		path: '/goods',
		name: 'YohoGoodsList',
		component: YohoGoodsList,
		meta: {
			title: "商品列表",
			description: "SHOP,测试,侵删,Billson - 商品列表"
		}
	}, {
		path: '/goods/:id',
		name: 'YohoGoods',
		component: YohoGoods,
		meta: {
			title: "商品详情",
			description: "SHOP,测试,侵删,Billson - 商品详情"
		}
	}, {
		path: '/coupon',
		name: 'YohoCoupon',
		component: YohoCoupon,
		meta: {
			title: "优惠券",
			description: "SHOP,测试,侵删,Billson - 优惠券"
		}
	}, {
		path: '/login',
		name: 'YohoLogin',
		component: YohoLogin,
		meta: {
			title: "登录",
			description: "SHOP,测试,侵删,Billson - 用户登录"
		}
	}, {
		path: '/register',
		name: 'YohoRegister',
		component: YohoRegister,
		meta: {
			title: "注册",
			description: "SHOP,测试,侵删,Billson - 用户注册"
		}
	}, {
		path: '/address',
		name: 'YohoAddress',
		component: YohoAddress,
		meta: {
			title: "收货地址",
			description: "SHOP,测试,侵删,Billson - 收货地址",
			requireAuth: true
		}
	}, {
		path: '/address/edit/:id',
		name: 'YohoAddressEdit',
		component: YohoAddressEdit,
		meta: {
			title: "添加收货地址",
			description: "SHOP,测试,侵删,Billson - 添加收货地址",
			requireAuth: true
		}
	}, {
		path: '/address/add',
		name: 'YohoAddressAdd',
		component: YohoAddressEdit,
		meta: {
			title: "编辑收货地址",
			description: "SHOP,测试,侵删,Billson - 编辑收货地址",
			requireAuth: true
		}
	}, {
		path: '/address/map',
		name: 'YohoAddressMap',
		component: YohoAddressMap,
		meta: {
			title: "地区选择",
			description: "SHOP,测试,侵删,Billson - 地区选择",
			requireAuth: true
		}
	}, {
		path: '/collect',
		name: 'YohoCollect',
		component: YohoCollect,
		meta: {
			title: "收藏",
			description: "SHOP,测试,侵删,Billson - 用户收藏",
			requireAuth: true
		}
	}, {
		path: '/setting',
		name: 'YohoSetting',
		component: YohoSetting,
		meta: {
			title: "设置",
			description: "SHOP,测试,侵删,Billson - 用户设置",
			requireAuth: true
		}
	}, {
		path: '/order',
		name: 'YohoOrderList',
		component: YohoOrderList,
		meta: {
			title: "订单列表",
			description: "SHOP,测试,侵删,Billson - 订单列表",
			requireAuth: true
		}
	}, {
		path: '/order/:id',
		name: 'YohoOrderInfo',
		component: YohoOrderInfo,
		meta: {
			title: "订单详情",
			description: "SHOP,测试,侵删,Billson - 订单详情",
			requireAuth: true
		}
	}, {
		path: '*',
		redirect: '/home'
	}]
})

router.beforeEach((to, from, next) => {
	if(to.meta && to.meta.title) {
		document.title = to.meta.title
	}
	if(to.meta && to.meta.description) {
		document.getElementById("description").setAttribute("content", to.meta.description)
	}
	if(to.meta && to.meta.requireAuth) {
		if(store.getters.token !== "" || localStorage.getItem("eleme_billson_token")) {
			next()
		} else {
			next({
				path: '/login'
			})
		}
	} else {
		next()
	}
})

export default router
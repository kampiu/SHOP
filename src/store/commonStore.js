const commonStore = {
	namespaced: true,
	state: {
		router: "home",
		cate: [],
		brandList: [],
		wechat: false,
		coupons: [{
			id: 1002661514377,
			price: 80,
			condition: "满600可使用",
			brand: "adidas",
			info: "仅购买adidas产品可用",
			time: "2018.05.08 - 2018.08.08",
			tip: "快过期"
		}, {
			id: 1002546814377,
			price: 199,
			condition: "满500可使用",
			brand: "全部",
			info: "所有产品可使用",
			time: "2018.12.12 - 2018.12.12",
			tip: "未开始"
		}, {
			id: 1002015604377,
			price: 288,
			condition: "满1999可使用",
			brand: "全部",
			info: "所有产品可使用",
			time: "2018.09.01 - 2018.10.07",
			tip: "快过期"
		}, {
			id: 1001546877,
			price: 128,
			condition: "满两件可使用",
			brand: "全部",
			info: "所有产品可使用",
			time: "2018.10.01 - 2019.3.01",
			tip: "未开始"
		}]
	},
	getters: {

	},
	mutations: {
		isWeChat(state) {
			state.wechat = true
		},
		initBrand(state, list) {
			for(let i = 0, len = list.length; i < len; i++) {
				state.brandList.push(list[i])
			}
			state.brandList = Array.from(new Set(state.brandList))
		},
		initRouter(state, router) {
			state.router = router
		},
		initCate(state, cate) {
			state.cate = cate
		}
	},
	actions: {

	}
}

export default commonStore
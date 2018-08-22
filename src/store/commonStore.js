const commonStore = {
	namespaced: true,
	state: {
		router: "home",
		cate:[],
		brandList:[],
		wechat:false
	},
	getters: {

	},
	mutations: {
		isWeChat(state){
			state.wechat = true
		},
		initBrand(state, list){
			for(let i = 0,len = list.length;i < len;i++){
				state.brandList.push(list[i])
			}
			state.brandList = Array.from(new Set(state.brandList))
		},
		initRouter(state, router) {
			state.router = router
		},
		initCate(state,cate){
			state.cate = cate
		}
	},
	actions: {
		
	}
}

export default commonStore
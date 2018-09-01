const commonStore = {
	namespaced: true,
	state: {
		goods:[],
		type:"",
		brand:"",
		pages:1,
		limit:20
	},
	getters: {

	},
	mutations: {
		loadMore(state, list){
			for(let i = 0,len = list.length;i < len;i++){
				state.goods.push(list[i])
			}
			state.goods = Array.from(new Set(state.goods))
		},
		setType(state, type){
			state.type = type
		},
		setBrand(state, brand){
			state.brand = brand
		},
		setpages(state, pages){
			console.log(state.pages , pages)
			state.pages = pages
		},
		initGoods(state, list){
			state.goods = Array.isArray(list) ? Array.from(new Set(list)) : list
		}
	},
	actions: {
		
	}
}

export default commonStore
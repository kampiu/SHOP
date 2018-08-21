const commonStore = {
	namespaced: true,
	state: {
		userAddress: [],
		adrSelect: {
			adr: "",
			location: "",
			uid: "",
			point: {
				lat: null,
				lng: null
			},
			city: ""
		}
	},
	getters: {

	},
	mutations: {
		initAdrList(state, list) {
			state.userAddress = list
		},
		pushAddress(state, data){
			state.userAddress.push(data)
		},
		addAdrSelect(state, data) {
			state.adrSelect = data
		},
		removeAddress(state, id){
			for(let i = 0,len = state.userAddress.length;i < len;i++){
				if(parseInt(state.userAddress[i].adr_id) === parseInt(id)){
					state.userAddress.splice(i, 1)
					return
				}
			}
		},
		updateAddress(state, data){
			for(let i = 0,len = state.userAddress.length;i < len;i++){
				if(parseInt(state.userAddress[i].adr_id) === parseInt(data.adr_id)){
					state.userAddress[i] = data
					break
				}
			}
		},
		initaddAdrSelect(state) {
			state.adrSelect = {
				adr: "",
				location: "",
				uid: "",
				point: {
					lat: null,
					lng: null
				},
				city: ""
			}
		}
	},
	actions: {

	}
}

export default commonStore
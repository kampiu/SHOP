import Vue from 'vue'
import App from '@/App'
import router from '@/router/index'
import store from '@/store/index'
import ajax from '@/util/http'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/util/view'

Vue.config.productionTip = false
Vue.prototype.$ajax = ajax
Vue.use(MintUI)

const app = new Vue({
	el: "#app",
	router,
	render: h => h(App),
	store,
	created() {
		this.initApp()
	},
	methods: {
		initApp() {
			console.log("初始化YOHO！")
			this.$store.dispatch("user/initToken")
		}
	},
	watch: {
		$route(to) {
			this.$store.commit("common/initRouter", to.name)
		}
	}
})


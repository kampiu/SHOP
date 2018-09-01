//const _baseUrl = "http://localhost:3002/api/"
const _baseUrl = "https://api.billson.club/api/"

//商品的列表 ->	商品详情
//购物车的增删查
//收藏的增删查
//订单的增差
const API = {
	getHome() {
		return _baseUrl + "yoho/home"
	},
	getBanner() {
		return _baseUrl + "yoho/banner"
	},
	getCate(type) {
		return `${_baseUrl}yoho/cate?type=${type}`
	},
	getGoods(page, limit, type) {
		return `${_baseUrl}yoho/goods/list?page=${page}&limit=${limit}&type=${type}`
	},
	GoodsInfo(id) {
		return `${_baseUrl}yoho/goods?code=${id}`
	},
	addCart() {
		return _baseUrl + "yoho/cart/add"
	},
	removeCart() {
//		17674015550
		return _baseUrl + "yoho/cart/remove"
	},
	getCartList() {
		return _baseUrl + "yoho/cart"
	},
	addCollect() {
		return _baseUrl + "yoho/collect/add"
	},
	removeCollect() {
		return _baseUrl + "yoho/collect/remove"
	},
	getCollect() {
		return _baseUrl + "yoho/collect"
	},
	addOrder() {
		return _baseUrl + "yoho/order/add"
	},
	getOrderList() {
		return _baseUrl + "yoho/order"
	},
	getBrand(page){
		return `${_baseUrl}yoho/brand?page=${page}&limit=20`
	},
	getSearch(word){
		return `${_baseUrl}yoho/search?word=${word}`
	},
	getWxInfo(){
		return _baseUrl + "wechat/token"
	},
	getOrderInfo(){
		return _baseUrl + "yoho/orderinfo"
	},
	//用户的登录注册
	login() {
		return _baseUrl + "user/login"
	},
	getSms() {
		return _baseUrl + "user/code"
	},
	register() {
		return _baseUrl + "user/register"
	},
	//收获的地址的增删改查
	getAddress() {
		return _baseUrl + "user/address"
	},
	addAddress() {
		return _baseUrl + "user/addAddress"
	},
	modifyAddress() {
		return _baseUrl + "user/modifyAddress"
	},
	removeAddress() {
		return _baseUrl + "user/removeAddress"
	},
	modifyIcon() {
		return _baseUrl + "user/modify"
	},
	modifyInfo() {
		return _baseUrl + "user/modify/info"
	},
	getInfo() {
		return _baseUrl + "user/getinfo"
	},
	getPhoneCode(){
		return _baseUrl + "user/code"
	}
}

export default API
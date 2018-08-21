import cryptojs from 'crypto-js'
import axios from 'axios'

const rand = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const crypt = () => {
	let len = 16,
		str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
		result = ""
	while(len--) {
		result += str[rand(0, str.length - 1)]
	}
	return result
}

axios.defaults.timeout = 10000
axios.defaults.retry = 4
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(config => {
	if(config.body && !config.__retryCount) { //判断是否第一次发起请求   与请求的数据是否存在
		let key = cryptojs.enc.Latin1.parse('5AA765D61D8327DE'),
			ivs = crypt(),
			iv = cryptojs.enc.Latin1.parse(ivs)
		for(let k in config.body) {
			config.body[k] = cryptojs.AES.encrypt(config.body[k], key, {
				iv: iv,
				mode: cryptojs.mode.CBC,
				padding: cryptojs.pad.ZeroPadding
			}).toString()
		}
		config.body.iv = ivs
	}
	return config
})

axios.interceptors.response.use(res => {
	if(res.status === 654) {
		window.alert('请求超时！')
	}
	if(res.data.code < 200 || res.data.result > 300) {
		window.alert('数据返回有误')
		return Promise.reject(res)
	}
	if(res.data.token) {
		localStorage.setItem("eleme_billson_token", res.data.token)
		axios.defaults.headers['Authorization'] = res.data.token
	}
	if(res.data.result && res.data.result.iv) { //解密
		let key = cryptojs.enc.Latin1.parse('5AA765D61D8327DE'),
			iv = cryptojs.enc.Latin1.parse(res.data.result.iv)
		let decrypted = cryptojs.AES.decrypt(res.data.result.data, key, {
			iv: iv,
			padding: cryptojs.pad.ZeroPadding
		})
		let data = res.data
		data.result = JSON.parse(decrypted.toString(cryptojs.enc.Utf8))
		return data
	}
	return res.data
}, (error) => {
	let config = error.config
	if(!config || !config.retry) return Promise.reject(error)
	config.__retryCount = config.__retryCount || 0

	if(config.__retryCount >= config.retry) {
		console.log('promise error:' + error)
		return Promise.reject(error)
	}
	config.__retryCount += 1

	let backoff = new Promise(function(resolve) {
		setTimeout(function() {
			resolve()
		}, config.retryDelay || 1)
	})

	return backoff.then(function() {
		return axios(config)
	})
})

export default axios
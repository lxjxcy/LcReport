import axios from 'axios'
import router from '../router/index.js'
import store from '../store/index.js'


import Vue from 'vue'
// import {
// 	Message,
// 	Loading
// } from 'element-ui'

var vueInstance = new Vue()

var instance = axios.create({
	timeout: 600000,
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
		'X-Requested-With': 'XMLHttpRequest'
	}
})

instance.interceptors.request.use(
	config => {
		if (store.state.token) {
			config.headers.accessToken = store.state.token
		}
		return config
	},
	err => {
		return Promise.reject(err)
	}
)

instance.interceptors.response.use(

	response => {
		return response
	},
	error => {
		vueInstance.$Message.destroy()
		console.log(error.message)
		if (error.response.data.code == 1) {
			store.commit('exitUser')
			router.push({
				path: "/"
			});
		}else {
			vueInstance.$Message.error('请求失败')
		}
		
		return Promise.reject(error)
	}
)

function isError(data) {
	let code = data.code
	return code === '500'
}

function isNotLogin(data) {
	let code = data.code
	return code === '401'
}

export default instance
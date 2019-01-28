import axios from 'axios'
import router from '../router/index.js'
import store from '../store/index.js'
// import global from '../global.js'
import iView from 'iview';

import Vue from 'vue'
var vueInstance = new Vue()

var instance = axios.create({
	timeout: 600000,
	// baseURL: "http://101.37.124.231:8081",
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
		'X-Requested-With': 'XMLHttpRequest'
	}
})

instance.interceptors.request.use(
	config => {
			if (store.state.token) {
				//设置请求头token
         config.headers.accessToken = store.state.token
        } else {
          // 重定向到登录页面
          router.push('/login')
        }
		return config
	},
	err => {
		  // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout请求超时')
          // return service.request(originalRequest);//再重复请求一次
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          //error =errorInfo.data  //页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`,
					})
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
		// return Promise.reject(err)
	)
   // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }
        // 根据返回的code值来做不同的处理
        switch (data.code) {
          case 1:
					vueInstance.$Message.error(data.message);
            break;
          case 0:
          default:
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        return response
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break

            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = '请求错误,未找到该资源'
              break

            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              break

            case 501:
              err.message = '服务未实现'
              break

            case 502:
              err.message = '网关错误'
              break

            case 503:
              err.message = '服务不可用'
              break

            case 504:
              err.message = '网关超时'
              break

            case 505:
              err.message = 'HTTP版本不受支持'
              break

            default:
          }
        }
        console.error(err)
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

export function post (url, params) {
 return new Promise((resolve, reject) => {
  axios
   .post(url, params)
   .then(
    res => {
     resolve(res.data)
    },
    err => {
     reject(err.data)
    }
   )
   .catch(err => {
    reject(err.data)
   })
 })
}
export function get (url, params) {
 return new Promise((resolve, reject) => {
  axios
   .get(url, {
    params: params
   })
   .then(res => {
    resolve(res.data)
   })
   .catch(err => {
    reject(err.data)
   })
 })
}
export default instance
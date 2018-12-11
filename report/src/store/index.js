import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	 state: {
		 userInfo:{
			 
		 },
		 isgoback: false,
		 orderSource:null,
		 loadData:[],
		 loading:false,
		 token:null,
		 saveData:{
			 dayDate:"",
			 monthDate:"",
			 otherDate:[],
			 weekDate:" ",
			 showDate:1,
		 }
	 },
	 mutations:{
		 // 存渠道
		 setOrder(state, orderSource) {
		  state.orderSource = orderSource;
		  sessionStorage.setItem('order', orderSource)
		},
		// 存token
		setToken(state, token) {
			state.token = token;
			sessionStorage.setItem('token', token)
		},
		// 存日期
		saveDatainfo(state, data) {
			state.saveData = data;
			sessionStorage.setItem('saveData', JSON.stringify(data))
		},
		//用户信息
		saveUserinfo(state, userInfo) {
		  state.userInfo = userInfo;
		  sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
		},
		//退出
		exitUser(state) {
		  state.token = null;
			state.orderSource=null;
		  state.userInfo={};
			state.saveData={
				dayDate:"",
				monthDate:"",
				weekDate:"",
				otherDate:[],
				showDate:1,
			}
		  sessionStorage.removeItem('order')
			sessionStorage.removeItem('token')
			sessionStorage.removeItem('saveData')
		  sessionStorage.removeItem('userInfo')
         }
		 
	 },
	 actions:{
		 
		 
	 },
	 getters:{
		 
	 }
})
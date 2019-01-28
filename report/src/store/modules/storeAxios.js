
import api from '../../api/index.js'
const house={
	state: {
			 
			  num: 0,
	      add: 0,
				 count:22,
	    // 新增waiting  状态
	    waiting: false,
	    // 额外需要增加的数字
	    anotherIncrement: 5,
			roomList:[],		
		 },
	mutations:{
			 // 存渠道
	    jia: function(state,num) {
	      // 加1
	      state.num=num+2;
	    },
	    INCREMENT: function(state) {
	      state.count=1000;
	    },
	    // // 减1
	    DECREMENT: function(state) {
	      state.count--;
	    },
	    INCREMENT_WITH_VALUE(state, value) {
	      state.count = state.count + value.intValue + value.anotherValue;
	    },
	    // // 显示和隐藏waiting
	    SHOW_WAITING_MESSAGE(state) {
	      state.waiting = true; 
	    },
	    HIDE_WAITING_MESSAGE(state) {
	      state.waiting = false;
	    },
			
			 GET_ROOM_LIST(state, data) {
				 console.log()
	      // state.roomList = data
	    },
			
	},
	  actions: {
		 async LOGIN({ commit }, value) {
			return new Promise((resolve, reject) => {
	        api.login(value).then(res => {
						commit("INCREMENT")
						if(res.code==0){
							resolve()
						}else{
							
							
						}
	          // const data = res.data
	          // commit('setToken', data.token)
	          
	        }).catch(err => {
	          reject(err)
	        })
	      })
			},
	    increment({commit}) {
	      commit("INCREMENT")
	    },
	    decrement({commit}) {
	      commit("DECREMENT")
	    },
			
			
			
			
	    incrementWithValue({
	      commit
	    }, value) {
	      commit("SHOW_WAITING_MESSAGE");
	
	      let intValue = parseInt(value.value)
	      let anotherValue = value.anotherValue
	      setTimeout(function() {
	        if (isNaN(intValue)) {
	          alert("Not an Interger")
	        } else {
	          commit("HIDE_WAITING_MESSAGE");
	          commit("INCREMENT_WITH_VALUE", {
	            intValue,
	            anotherValue
	          })
	        }
	      }, 2000)
	    }
	  },
	getters: {
	    getnum: (state) =>{
	      return state.num += 100
	    },
	    getadd:(state)=> {
	      return state.add += 200
	    },
	    countAnother:(state)=> {
	      return state.anotherIncrement
	    }
	  },
}


export default house 
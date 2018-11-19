export default {
	methods:{
		getnowTime(){
			var now=new Date();
			var year=now.getFullYear();
			var month = now.getMonth()
			var nowmonth=month >= 10 ? '' + month : '0' + month;
			var nowTime=year+"-"+nowmonth;
			var saveData={
				monthDate:nowTime,
				dayDate:"",
				weekDate:[],
				showDate:1,
			}
			this.$store.commit('saveDatainfo',saveData)
		}
	},
}
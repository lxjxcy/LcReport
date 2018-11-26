let moment = require("moment");
export default{
	methods:{
		focusClick(){
			this.open = !this.open;
		},
		removefocus(){
			this.open = false;
		},
		handleClick () { 
			
		},
		weekHandleChange(date) {
			this.$emit("clearPage")
			this.ifrequired=true;
			this.value3 = date;
			var now= new Date(date).getDay();
			var nowDate=new Date(date).getDate();
			let  nowday= new Date(date).setDate(nowDate);
			let oneDay=1000*60*60*24;
			var lDay;
			var nDay;			
			switch(now){
				case  1:
					lDay=3*oneDay;
					nDay=3*oneDay;
				break;
				case  2:
					lDay=4*oneDay;
					nDay=2*oneDay;
				break;
				case  3:
					lDay=5*oneDay;
					nDay=1*oneDay;
				break;
				case  4:
					lDay=6*oneDay;
					nDay=0*oneDay;
				break;
				case  5:
					lDay=0*oneDay;
					nDay=6*oneDay;
				break;
				case  6:
					lDay=1*oneDay;
					nDay=5*oneDay;
				break;
				case  0:
					lDay=2*oneDay;
					nDay=4*oneDay;
				break;
			}
			this.getweek(nowday,lDay,nDay)
		},
		getweek(nowday,lDay,nDay){
			let lastDays = moment(nowday-lDay).format("YYYY-MM-DD");	
			let nextDay = moment(nowday+nDay).format("YYYY-MM-DD");
			this.$store.state.saveData.weekDate=lastDays+"-"+nextDay;
			var title=this.search2.reportType+"     (     "+lastDays+"——"+nextDay+" ) "	
			this.$refs.inputs.blur()
			this.$emit("getTitle",title)
			var Dateparam={
				weekStart:lastDays,
				weekEnd:nextDay
			}
			
			var saveData={
				monthDate:"",
				dayDate:"",
				weekDate:lastDays+"-"+nextDay,
				showDate:this.$store.state.saveData.showDate,
			}
			this.$store.commit('saveDatainfo',saveData)
			this.$emit("getDateparam",Dateparam)
		},
		
		handleClear () {
			this.open = false;
			this.$refs.inputs.blur()
		},
		handleOk () {
			this.open = false;
			this.$refs.inputs.blur()
		},
	}
}
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
		handleChange(date) {	
			this.value3 = date;
			var now= new Date(date).getDay();
			var nowDate=new Date(date).getDate();
			let  nowday= new Date(date).setDate(nowDate);
			let oneDay=1000*60*60*24;
			// let lastDay = moment(nowday-oneDay).format("YYYY-MM-DD");	
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
			this.reportdata=lastDays+"-"+nextDay;
			this.$refs.inputs.blur()
			var date = new Date(nextDay);
			var nowday=date.getDate();
			let monthStart = date.setDate(nowday);
			let oneDay=1000*60*60*24;
			let lastDay = moment(monthStart+oneDay).format("YYYY-MM-DD");	
			this.weekParam.weekStart=lastDays;
			this.weekParam.weekEnd=nextDay;
			this.weekParam.startTime=lastDays+" "+"00:00:00"
			this.weekParam.endTime=lastDay+" "+"00:00:00"
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
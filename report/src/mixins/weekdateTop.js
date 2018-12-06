export default{
	methods:{
		focusClick(){
			this.open = !this.open;
		},
		removefocus(){
			this.open = false;
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
		
		
		//改变单选
		changeModel(value){
			this.$store.commit('setOrder',null)
			var now=new Date()
			var nowday= new Date().getDay();
			var getday=moment(now.getTime()-24*60*60*1000).format("YYYY-MM-DD");	
			const startDate = moment().month(moment().month() - 1).startOf('month').valueOf();
			var getmonth=moment(startDate).format("YYYY-MM");
			var lDay;
			var nDay;
				let oneDay=1000*60*60*24;
				switch(nowday){
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
			var nowDate=new Date().getDate();
		    let  nowdaytime= new Date().setDate(nowDate);
			let lastDay = moment((nowdaytime-lDay)-7*oneDay).format("YYYY-MM-DD");	
			let nextDay = moment((nowdaytime+nDay)-7*oneDay).format("YYYY-MM-DD");
			let week=lastDay+"-"+nextDay
			this.search2.reportType=value;	
			this.search1.data="";
			if(value=="月报"){
				this.showDate=1;
				var saveData={
					monthDate:getmonth,
					weekDate:"",
					dayDate:"",
					otherDate:[],
					showDate:1,
				}
			}	
			if(value=="周报"){
				this.showDate=2;
				var saveData={
					monthDate:"",
					weekDate:week,
					dayDate:"",
					otherDate:[],
					showDate:2,
				}
			}	
			if(value=="日报"){
				this.showDate=3;
				var saveData={
					monthDate:"",
					weekDate:"",
					otherDate:[],
					dayDate:getday,
					showDate:3,
				}
			}	
			if(value=="任意时段报表"){
				this.showDate=4;
				var saveData={
					monthDate:"",
					weekDate:"",
					otherDate:[],
					dayDate:"",
					showDate:4,
				}
			}	
			this.$store.commit('saveDatainfo',saveData)
			this.$emit("clearPage")
			this.$emit("getMonth",value)
		},
			//选择日期		
			onChangeDate(value){
				this.$emit("clearPage")
				this.ifrequired=true;
				if(value==""){
					return;
				}
				if(this.$store.state.saveData.showDate==1){
					var saveData={
						monthDate:value,
						weekDate:"",
						otherDate:[],
						dayDate:"",
						showDate:this.$store.state.saveData.showDate,
					}
					this.$store.commit('saveDatainfo',saveData)
					var title=this.search2.reportType+"("+value+")"
					this.$emit("getTitle",title)
					var Dateparam={
						month:value
					}
					this.$emit("getDateparam",Dateparam)
				}
				else if(this.$store.state.saveData.showDate==4){
					var title="报表    (     "+value[0]+"——"+value[1]+" ) "	
					let date0 = moment(value[0]).format("YYYY-MM-DD");
					let date1 = moment(value[1]).format("YYYY-MM-DD");
					var aDate = new Date(date0);
					var bDate = new Date(date1);
					var aDay = 24 * 60 * 60 * 1000;
					var diffDay = (bDate - aDate) / aDay; 
					// var nowday= new Date(value[0]).getDay()
					if(value[0]==''&&value[1]==''){
						return
					}else if(diffDay>30){	
					this.$Modal.warning({
								title: "提示",
								content: "请选择时间段小于30天",
						});
						let oldDate=this.$store.state.saveData.otherDate
						this.$store.state.saveData.otherDate=oldDate
						this.hackReset = false
							this.$nextTick(() => {
							this.hackReset = true
							})
					return;
				}
					this.$emit("getTitle",title)
					var Dateparam={
						start:value[0],
						end:value[1]
					}
				
					
					var saveData={
						monthDate:"",
						dayDate:"",
						weekDate:"",
						otherDate:[value[0],value[1]],
						showDate:this.$store.state.saveData.showDate,
					}
					this.$store.commit('saveDatainfo',saveData)
					this.$emit("getDateparam",Dateparam)
				}
					else{
					var saveData={
						monthDate:"",
						weekDate:"",
						otherDate:[],
						dayDate:value,
						showDate:this.$store.state.saveData.showDate,
					}
					this.$store.commit('saveDatainfo',saveData)
					
					var title=this.search2.reportType+"("+value+")"
					this.$emit("getTitle",title)
					var Dateparam={
						date:value
					}
					this.$emit("getDateparam",Dateparam)	
				}
		
			},
			//选择渠道更新数据
			ordergetList(){
				if((this.$store.state.saveData.showDate==1 && this.$store.state.saveData.monthDate=="")
				||(this.$store.state.saveData.showDate==2 && this.$store.state.saveData.weekDate=="")
				||(this.$store.state.saveData.showDate==3 && this.$store.state.saveData.dayDate=="")
				||(this.$store.state.saveData.showDate==4 && this.$store.state.saveData.otherDate.length==0)
				){
					return;
				}
				if(this.$store.state.saveData.showDate==1){
					var date={
						month:this.$store.state.saveData.monthDate,
					}			
				}else if(this.$store.state.saveData.showDate==2){
					var date={
						weekStart:this.$store.state.saveData.weekDate.slice(0,10),
						weekEnd:this.$store.state.saveData.weekDate.slice(11),
					}	
				}else if(this.$store.state.saveData.showDate==3){
					var date={
						date:this.$store.state.saveData.dayDate,
					}	
					
				}else if(this.$store.state.saveData.showDate==4){
					var date={
						start:this.$store.state.saveData.otherDate[0],
						end:this.$store.state.saveData.otherDate[1],
					}	
				}
				this.$emit("getDateparam",date)
			},
	}
}
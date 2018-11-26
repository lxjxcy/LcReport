<template>
	<div class="c_day">
		
		 <Form :model="createData" label-position="top">
		 	<FormItem label="日期">
		 		<Row>
		 			<Col span="11">
						<DatePicker  :value="reportdata" @on-change="onChangeDate" type="date" :options="options" placeholder="请选择日期" style="width: 200px"></DatePicker>
		 			</Col>
		 		</Row>
		 	</FormItem>
		 <FormItem>
		 		<Button  type="primary" :loading="this.$store.state.loading" icon="ios-apps-outline" @click="create()" style="margin-top: 22px;">
		 			<span v-if="!this.$store.state.loading">生成</span>
		 			<span v-else>Loading...</span>
		 		</Button>
		 	</FormItem>
		 </Form>
	</div>
	
</template>

<script>
	import createD from "../../mixins/create.js"
	let moment = require("moment");
	export default {
		name:"c_day",
		data(){
			return{
				options: {
					disabledDate (date) {
						return date && date.valueOf() > Date.now() - 8.64e6;		
					}
				},
				reportdata:"",
				dayParam:{
					date:"",
					month:"",
					startTime:"",
					endTime:"",
					
				},
				createData:{
					
				}
			}
		},
		mixins: [createD],
		mounted() {
			this.$store.state.loading=false;
			
		},
		methods:{
			onChangeDate(e){
				// this.reportdata=e;
				this.reportdata="2019-12-12-2020-12-12"
// 				var now=new Date(e)
// 				var nowmonth=now.getMonth()+1;
// 				var nowmonth=nowmonth >= 10 ? '' + nowmonth : '0' + nowmonth;
// 				var nowyear=now.getFullYear();
// 				var nowday=now.getDate();
// 				var date=new Date(e);
// 				//获取当前月的第一天     
//                 let monthStart = date.setDate(nowday);
// 				//获取当前月 
//                let currentMonth=date.getMonth()			   
// 				//获取到下一个月，++currentMonth表示本月+1，一元运算
// 				let nextMonth=++currentMonth; 
// 				//获取到下个月的第一天      
// 				let nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
// 				//一天时间的毫秒数
// 				let oneDay=1000*60*60*24;
// 				let firstDay = moment(monthStart).format("YYYY-MM-DD");
// 				let lastDay = moment(monthStart+oneDay).format("YYYY-MM-DD");
// 				this.dayParam.date=e;
// 				this.dayParam.month=nowyear+"-"+nowmonth;
// 				this.dayParam.startTime=firstDay+" "+"00:00:00"
// 				this.dayParam.endTime=lastDay+" "+"00:00:00"			
			},
			create(){
				var url="/report/shell/runDay";
				var searchurl="/report/channel/queryDay"
				var param=this.dayParam;
				var sreachparam={
					date:this.dayParam.date,
				}
				var day=true;
				this.createReport(url,param,searchurl,sreachparam,day)
			},
			
		}
		
	}
</script>

<style scoped>
	.c_day{
		height:500px;
		width:100%;
		background: #fff;
		padding:20px;
		margin: 0 10px;
	}
	

</style>

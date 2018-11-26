<template>
	<div class="c_week">
		
		 <Form :model="createData" label-position="top">
		 	<FormItem label="日期">
		 		<Row>
		 			<Col span="11">
						<DatePicker  :value="reportdata" @on-change="onChangeDate" type="daterange" :options="options"  placeholder="请选择日期" style="width: 200px"></DatePicker>
		 			</Col>
		 		</Row>
				<span><span style="color:red">*</span>提示：（周五~周四）7天为一周，请选择两个日期，开始日期为周五，结束日期为下周四</span>
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
		name:"c_week",
		data(){
			return{
				options: {
					disabledDate (date) {
						return date && date.valueOf() > Date.now() - 8.64e6;		
					}
				},
				reportdata:"",
				weekParam:{
					weekStart:"",
					weekEnd:"",
					startTime:"",
					endTime:"",	
				},
				createData:{
					
				}
			}
		},
		mixins: [createD],
		methods:{
			onChangeDate(value){
				var date0=value[0].slice(0,4)+"/"+value[0].slice(5,7)+"/"+value[0].slice(8,10)
				var date1=value[1].slice(0,4)+"/"+value[1].slice(5,7)+"/"+value[1].slice(8,10)
				var aDate = new Date(date0);
				var bDate = new Date(date1);
				var aDay = 24 * 60 * 60 * 1000;
				var diffDay = (bDate - aDate) / aDay; 
				var nowday= new Date(value[0]).getDay()
				console.log(nowday)
				if(value[0]==''&&value[1]==''){
					return
				}else if(diffDay!=6||nowday!=5){	
					this.$Modal.warning({
								title: "提示",
								content: "请选择时间为一周时间，开始时间为周五，结束时间为周四"
						});
					this.reportdata=[]	
					return;
				}
				var date = new Date(value[1]);
				var nowday=date.getDate();
				let monthStart = date.setDate(nowday);
				let oneDay=1000*60*60*24;
				let lastDay = moment(monthStart+oneDay).format("YYYY-MM-DD");	
				this.reportdata=value;
				this.weekParam.weekStart=value[0];
				this.weekParam.weekEnd=value[1];
				this.weekParam.startTime=value[0]+" "+"00:00:00"
				this.weekParam.endTime=lastDay+" "+"00:00:00"
			},
			create(){
				var url="/report/shell/runWeek";
				var searchurl="/report/channel/queryWeek"
				var param=this.weekParam;
				var sreachparam={
					weekStart:this.weekParam.weekStart,
					weekEnd:this.weekParam.weekEnd,
				}
				var day=false;
				this.createReport(url,param,searchurl,sreachparam,day)
			}
		}
		
	}
</script>

<style scoped>
	.c_week{
		height:500px;
		width:100%;
		background: #fff;
		padding:20px;
		margin: 0 10px;
	}
	

</style>

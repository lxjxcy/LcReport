<template>
	<div class="c_month">
		
		 <Form :model="createData" label-position="top">
		 	<FormItem label="日期">
		 		<Row>
		 			<Col span="11">
						<DatePicker  :value="reportdata" @on-change="onChangeDate" type="month" :options="options" split-panels placeholder="请选择日期" style="width: 200px"></DatePicker>
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
		name:"c_month",
		data(){
			return{
				options: {
					disabledDate (date) {
						return date && date.valueOf() > Date.now() - 8.64e6;		
					}
				},
				reportdata:"",
				monthParam:{
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
				this.reportdata=e;
				var now=new Date(e)
				var date=new Date(e);
				let monthStart = date.setDate(1);
				let currentMonth=date.getMonth()		
                let nextMonth=++currentMonth; 
				//获取到下个月的第一天      
				let nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
				let firstDay = moment(monthStart).format("YYYY-MM-DD");
				let lastmonth = moment(nextMonthFirstDay).format("YYYY-MM-DD");
				
				this.monthParam.month=e;
				this.monthParam.startTime=firstDay+" "+"00:00:00"
				this.monthParam.endTime=lastmonth+" "+"00:00:00"
			},
			create(){
				var url="/report/shell/runMonth";
				var searchurl="/report/channel/queryMonth";
				
				var sreachparam={
					month:this.monthParam.month
				}
				var param=this.monthParam;
				var day=false;
				
				this.createReport(url,param,searchurl,sreachparam,day)
				
			}
		}
		
	}
</script>

<style scoped>
	.c_month{
		height:500px;
		width:100%;
		background: #fff;
		padding:20px;
		margin: 0 10px;
	}
	

</style>

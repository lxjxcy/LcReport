<template>
	<div class="c_week">
		
		 <Form :model="createData" label-position="top">
		 	<FormItem label="日期">
		 		<Row>
		 			<Col span="11">
						<div  style="position: absolute;">
							<i-input icon="ivu-icon ivu-icon-ios-calendar-outline" ref="inputs" @on-change="InhandleChange" clearable @on-blur="removefocus" :value="reportdata" placeholder="请选择日期" style="width: 200px" @on-focus="focusClick()"></i-input>			
							<div style="position: relative;left:0;top:-13px;">
								<Date-picker
								   show-week-numbers
									:open="open"
									:value="value3"
									:options="options"
									type="date"
									@on-change="handleChange"
									@on-clear="handleClear"
									@on-ok="handleOk">
									<a href="javascript:void(0)">
									</a>
								</Date-picker>
							</div>	
						</div>
						
						<!-- <DatePicker  :value="reportdata" @on-change="onChangeDate" type="daterange" :options="options"  placeholder="请选择日期" style="width: 200px"></DatePicker> -->
		 			</Col>
		 		</Row>
				<!-- <span><span style="color:red">*</span>提示：（周五~周四）7天为一周，请选择两个日期，开始日期为周五，结束日期为下周四</span> -->
		 	</FormItem>
		 <FormItem>
		 		<Button  type="primary" :loading="this.$store.state.loading" icon="ios-apps-outline" @click="create()" style="margin-top: 60px;">
		 			<span v-if="!this.$store.state.loading">生成</span>
		 			<span v-else>Loading...</span>
		 		</Button>
		 	</FormItem>
		 </Form>
	</div>
	
</template>

<script>
	import createD from "../../mixins/create.js"
	import createWeek from "../../mixins/weekdateTop.js"
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
				open: false,
				value3:"",
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
		mixins: [createD,createWeek],
		methods:{
			InhandleChange(){
				this.reportdata="";
			},
		handleChange(date) {	
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
			create(){
				var url=this.$api.runWeek;
				var param=this.weekParam;
				var sreachparam={
					weekStart:this.weekParam.weekStart,
					weekEnd:this.weekParam.weekEnd,
				}
				var day=false;
				this.createReport(url,param,sreachparam,day)
			}
		}
		
	}
</script>

<style scoped>
	.c_week{
		height:500px;
		width:100%;
		background: #fff;
		padding:40px 20px;
	}
	

</style>

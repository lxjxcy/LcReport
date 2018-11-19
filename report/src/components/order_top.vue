<template>
	<div class="order_top">
		<div class="type-report">
			<Form :model="search2" label-position="left">
				<FormItem label="报表类型"
					:rules="{required: true, trigger: 'blur'}">
					<RadioGroup v-model="search2.reportType" @on-change="changeModel">
						<Radio v-for="item in workOrderList" :label="item.label" :key="item.value"></Radio>
					</RadioGroup>
				</FormItem>
			</Form>
		</div>
		<div class="report">
			<Form :model="search1" label-position="top"  inline>
				<FormItem label="日期">
					<Row>
						<Col span="11">
							 <DatePicker v-if="showDate==3" type="date" :options="options" @on-clear="clearData" @on-change="onChangeDate" placeholder="请选择日期" format="yyyy-MM-dd" style="width: 200px" :value="this.$store.state.saveData.dayDate"></DatePicker>
							<DatePicker v-if="showDate==1" @on-clear="clearData" :options="options" style="width: 200px;"  @on-change="onChangeDate"  type="month" format="yyyy-MM" placeholder="请选择日期" :value="this.$store.state.saveData.monthDate"></DatePicker>
							<DatePicker v-if="showDate==2"  @on-clear="clearData" :options="options"  style="width: 200px;" @on-change="onChangeDate" type="daterange" format="yyyy-MM-dd" show-week-numbers  placeholder="请选择日期"  :value="this.$store.state.saveData.weekDate"></DatePicker>
						</Col>
					</Row>
				</FormItem>
			<FormItem>
					<Button 
					  v-if="(this.$store.state.saveData.weekDate.length==0&&this.$store.state.saveData.showDate==2)
						||(this.$store.state.saveData.monthDate==''&&this.$store.state.saveData.showDate==1)
						||(this.$store.state.saveData.dayDate==''&&this.$store.state.saveData.showDate==3)"
						icon="ios-download-outline" disabled type="primary" style="margin-top: 22px;">导出</Button>
					<Button  v-else type="primary" :loading="this.$store.state.loading" icon="ios-download-outline" @click="download()" style="margin-top: 22px;">
						<span v-if="!this.$store.state.loading">导出</span>
						<span v-else>Loading...</span>
				  </Button>
				</FormItem>
			</Form>
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name:"order_top",
		data(){
			return{
				options: {
							disabledDate (date) {
									return date && date.valueOf() > Date.now() - 8.64e6;
							}
					},
					
				// nowdate:new Date(),
				showDate:1,
			
				workOrderList:[
					{
					label:'月报',
					value:'1'
					},{
					label:'周报',
					value:'2'
					},
					{
					label:'日报',
					value:'3'
					}
				],
				search2:{
					reportType:'月报',
				},
				cityList: [
					{
							value: '1',
							label: '幸福绿城app'
					},
					{
							value: '2',
						label: '幸福绿城app'
					},
				
				],
				tableData:[
					{
						ID:"1111",
						imsi:"3222",
						msisdn:"eeee",
					},
					{
						ID:"1111",
						imsi:"3222",
						msisdn:"eeee",
					},
					
				],
				model1: '',
				search1:{
					data:"2018-10-10",
					select:'',
				},
			}
			
		},
		mounted(){
			
			let path = this.$route.matched[1].path  
			if(path.indexOf('/activity_name') == 0){
				debugger
				this.workOrderList=[
					{
					label:'月报',
					value:'1'
					},{
					label:'周报',
					value:'2'
					}
				]
			}
			
			
			
			if(this.$store.state.saveData.showDate==1){
				this.search2.reportType="月报",
				this.showDate=1;
			}
			if(this.$store.state.saveData.showDate==2){
				this.search2.reportType="周报",
				this.showDate=2;
			}
			if(this.$store.state.saveData.showDate==3){
				this.search2.reportType="日报",
				this.showDate=3;
			}
		},

		methods:{
			//导出excle表
			download(){
				this.$store.state.loadData=[];
				this.$store.state.loading=true;
				this.$emit("getExcel")
			},
			//上传文件
			handleBeforeUpload(file){
				console.log(file)
				let fd = new FormData();
				fd.append('file',file);
			axios.post("upload/uploadExcel",fd).then(res=>{
				console.log(res)
			})
				
				
			},
			//清空日期
			clearData(){
				var saveData={
					monthDate:"",
					dayDate:"",
					weekDate:[],	
					showDate:this.$store.state.saveData.showDate,
				}
				this.$store.commit('saveDatainfo',saveData)
				this.$emit("getClear")
				
			},
			//时间格式转换		
			onChangeDate(value){
				if(value==""){
					return;
				}
				console.log(value)
				if(this.$store.state.saveData.showDate==1){
					var saveData={
						monthDate:value,
						weekDate:[],
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
				}else if(this.$store.state.saveData.showDate==2){
					var title=this.search2.reportType+"     (     "+value[0]+"——"+value[1]+" ) "	
					var date0=value[0].slice(0,4)+"/"+value[0].slice(5,7)+"/"+value[0].slice(8,10)
					var date1=value[1].slice(0,4)+"/"+value[1].slice(5,7)+"/"+value[1].slice(8,10)
					var aDate = new Date(date0);
					var bDate = new Date(date1);
					
					var aDay = 24 * 60 * 60 * 1000;
					var diffDay = (bDate - aDate) / aDay; 
					var nowday= new Date(value[0]).getDay()
					// nowday!=1||
					if(diffDay!=6){
						this.$Modal.warning({
									title: "提示",
									content: "请选择时间为一周时间，开始时间为周一，结束时间为周日，"
							});
						this.search1.date="";
						return;
					}
					this.$emit("getTitle",title)
					var Dateparam={
						weekStart:value[0],
						weekEnd:value[1]
					}
					
					var saveData={
						monthDate:"",
						dayDate:"",
						weekDate:[value[0],value[1]],
						showDate:this.$store.state.saveData.showDate,
					}
					this.$store.commit('saveDatainfo',saveData)
					this.$emit("getDateparam",Dateparam)
						
				}else{
					
					var saveData={
						monthDate:"",
						weekDate:[],
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
			changeModel(value){
				var now=new Date()
				var year=now.getFullYear()
				var month = now.getMonth()+1;	
				var nowmonth=month >= 10 ? '' + month : '0' + month;
				var date = now.getDate();
				var nowdate=date >= 10 ? '' + date : '0' + date;
				var getmonth=year+"-"+(nowmonth-1);
				var getday=year+"-"+nowmonth+"-"+(nowdate-1);
			
				this.search2.reportType=value;	
				this.search1.data="";
				if(value=="月报"){
					this.showDate=1;
					var saveData={
						monthDate:getmonth,
						weekDate:[],
						dayDate:"",
						showDate:1,
					}
				}	
				if(value=="周报"){
					this.showDate=2;
					var saveData={
						monthDate:"",
						weekDate:[],
						dayDate:"",
						showDate:2,
					}
				}	
				if(value=="日报"){
					this.showDate=3;
					var saveData={
						monthDate:"",
						weekDate:[],
						dayDate:getday,
						showDate:3,
					}
				}	
				
				this.$store.commit('saveDatainfo',saveData)
				this.$emit("getMonth",value)
		  }
		}

		
	}
</script>

<style>

</style>

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
							<!-- 日报 -->
							<DatePicker v-if="showDate==3" type="date" :options="options" @on-clear="clearData" @on-change="onChangeDate" placeholder="请选择日期" format="yyyy-MM-dd" style="width: 200px" :value="this.$store.state.saveData.dayDate"></DatePicker>
							<!-- 月报 -->
							<DatePicker v-if="showDate==1" @on-clear="clearData" :options="options" style="width: 200px;"  @on-change="onChangeDate"  type="month" format="yyyy-MM" placeholder="请选择日期" :value="this.$store.state.saveData.monthDate"></DatePicker>
							<DatePicker v-if="showDate==4&&hackReset" @on-clear="clearData" :options="options"  style="width: 200px;" @on-change="onChangeDate" type="daterange" format="yyyy-MM-dd" show-week-numbers  placeholder="请选择日期"  :value="this.$store.state.saveData.otherDate"></DatePicker>
							<!-- 周报 -->
							<div v-if="showDate==2">
								<i-input suffix="ivu-icon ivu-icon-ios-calendar-outline" ref="inputs" @on-change="clearData" clearable @on-blur="removefocus"  :value="this.$store.state.saveData.weekDate" placeholder="请选择日期" style="width: 200px" @on-focus="focusClick()"></i-input>			
								<div style="position: relative;left:0;top:-13px;">
									<Date-picker
										:open="open"
										:value="value3"
										:options="options"
										type="date"
										@on-change="weekHandleChange"
										@on-clear="handleClear"
										@on-ok="handleOk">
										<a href="javascript:void(0)">
										</a>
									</Date-picker>
								</div>	
							</div>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="渠道" 
				  v-if="this.$route.matched[1].path.indexOf('/product_name') == 0
				||this.$route.matched[1].path.indexOf('/supplier_name') == 0">
						 <Select v-model="orderSource" style="width:200px" @on-clear="clearOrder" clearable :label-in-value="true" @on-change="changeOrder">
								<Option v-for="item in orderSourceList"  :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
        </FormItem>
				<FormItem>
					<Button 
					  v-if="(this.$store.state.saveData.weekDate.length==0&&this.$store.state.saveData.showDate==2)
						||(this.$store.state.saveData.monthDate==''&&this.$store.state.saveData.showDate==1)
						||(this.$store.state.saveData.otherDate==''&&this.$store.state.saveData.showDate==4)
						||(this.$store.state.saveData.dayDate==''&&this.$store.state.saveData.showDate==3)
						"
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
	import weekD from "../mixins/weekdateTop.js"
	export default {
		name:"order_top",
		data(){
			return{
				options: {
							disabledDate (date) {
									return date && date.valueOf() > Date.now() - 8.64e6;
							}
					},
					orderSource:"",
					hackReset:true,
					dateSeletvalue:"",
					orderSourceList:[
						{
							value: '1',
							label: '幸福绿城app'
						},
						{
							value: '2',
							label: '幸福便利店'
						},
						{
							value: '3',
							label: '幸福便利店（团购）'
						},
					],
					open: false,
					value3:"",
					ifrequired:true,
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
					},
					{
					label:'任意时段报表',
					value:'4'
					}
				],
				search2:{
					reportType:'',
				},
				search1:{
					data:"2018-10-10",
				},
			}
		},
		mixins: [weekD],
		mounted(){
			let path = this.$route.matched[1].path  
			if(path.indexOf('/activity_name') == 0){
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
			if(path.indexOf('/sales_name') == 0){
				this.workOrderList=[
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
					},
				]
			}	
			if(this.$store.state.orderSource=="幸福绿城app"){
				this.orderSource="1"
			}
			if(this.$store.state.orderSource=="幸福便利店"){
				this.orderSource="2"
			}
			if(this.$store.state.orderSource=="幸福便利店（团购）"){
				this.orderSource="3"
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
			if(this.$store.state.saveData.showDate==4){
				this.search2.reportType="任意时段报表",
				this.showDate=4;
			}
		},

		methods:{
			//导出excle表
			download(){
				this.$store.state.loadData=[];
				this.$store.state.loading=true;
				this.$emit("getExcel")
			},
			//清空日期
			clearData(){
				var saveData={
					monthDate:"",
					dayDate:"",
					weekDate:"",	
					otherDate:[],
					showDate:this.$store.state.saveData.showDate,
				}
				this.$store.commit('saveDatainfo',saveData)
				this.$store.commit('setOrder',null)
				this.orderSource=null;
				this.$emit("clearPage")
				this.$emit("getClear")
			},
			//选择渠道
			changeOrder(e){
				this.$store.commit('setOrder',e.label)
				this.$emit("clearPage")
				this.ordergetList()
			},
			//清空渠道
			clearOrder(){
				this.$store.commit('setOrder',null)
				this.$emit("clearPage")
				this.ordergetList()
				
			},

			
			



		}

		
	}
</script>

<style>

</style>

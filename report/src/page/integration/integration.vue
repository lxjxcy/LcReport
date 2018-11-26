<template>
	<div class="integration all">
		<orderTop v-on:clearPage="showPage" v-on:getTitle="showParam" v-on:getClear="clearDate" v-on:getExcel="downExcel" v-on:getMonth="showMonth"  v-on:getDateparam="showSend"></orderTop>
		<Table height="400" v-if="this.$store.state.saveData.showDate!=3" :loading="loading" border :columns="columns" :data="reportData"></Table>
		<Table height="400" v-if="this.$store.state.saveData.showDate==3" :loading="loading" border :columns="columnsday" :data="reportData"></Table>
		<div class="pages"><span class="inpage"><Page v-if="hackReset" :total="total"  show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" /></span></div> 
	</div>
</template>
<script>
	import orderTop from "../../components/order_top.vue"
	import axios from 'axios';
	import goshowPage from "../../mixins/index"
	export default {
		name:"integration",
		components:{
			orderTop
		},
		 data () {
			return {
				month:true,
				total:0,
				loading:false,
				hackReset:true,
				monthParam:{
					month:"2018-10",
				},
				weekParam:{
					weekStart:"",
					weekEnd:"",
				},
				pageParam:{
					pageNum:1,
					pageSize:10,
				},
				tHeader:['整合方名称','订单数量','销售总额(万)','抵扣总额(元)','实付总额(元)','客单价（元/单）'],
				filterVal:['integrationParty','orderNum','salesTotal','deductionTotal','payAmount','perSales'],
				 columns: [
					 {
						 title: '整合方月报表',
						 key: 'month',
						 align: "center",						 
						 children:[
							 {
								title: '序号',
								width: 60,
								align: 'center',
								render: (h, params) => {
									var index=params.index+(this.pageParam.pageNum - 1) * this.pageParam.pageSize + 1
									return h('div',{	
									},index)
								}
               },
							 {
							 	title: '整合方名称',
							 	key: 'integrationParty',
							 	align: "center",
							 },
							 {
							 	title: '订单数',
							 	key: 'orderNum',
							 	align: "center",
							 },
							 {
							 	title: '销量总额(万)',
							 	key: 'salesTotal',
							 	align: "center",
							 },
							 {
							 	title: '抵扣总额(万)',
							 	key: 'deductionTotal',
							 	align: "center",
							 },
							 {
							 	title: '实付总额(万)',
							 	key: 'payAmount',
							 	align: "center",
							 },
							 {
							 	title: '客单价（元/单）',
							 	key: 'perSales',
							 	align: "center",
							},
							 {
							 title: '详情',
							 key: 'action',
							 align: "center",
							render: (h, params) => {
								return h('Dropdown',[
											h('Button','查看'),
											h('DropdownMenu',{
												slot:"list"
											},[
												h('DropdownItem',{
													nativeOn:{
														click:(name)=>{
															this.$router.push({
																 path: '/integration/integration_day',
																 query: {
																	title: params.row.integrationParty
																 }
																})
															
															
														}
													}
												},'日详情'),
												h('DropdownItem',{
													nativeOn:{
														click:(name)=>{
															this.$router.push({
																path: '/integration/integration_sec',
																query: {
																	title: params.row.integrationParty
																}
																})
															
														}
													}
												},'按二级整合方详情')
											])
										])									
							   }						 
							 }
						 ]
					 }           
        ],
				columnsday: [
					 {
						 title: '分公司月报表',
						 key: 'month',
						 align: "center",						 
						 children:[
							{
								title: '序号',
								width: 60,
								align: 'center',
								render: (h, params) => {
									var index=params.index+(this.pageParam.pageNum - 1) * this.pageParam.pageSize + 1
									return h('div',{	
									},index)
								}
							},
							{
								title: '整合方名称',
								key: 'integrationParty',
								align: "center",
							},
							{
								title: '订单数',
								key: 'orderNum',
								align: "center",
							},
							{
								title: '销量总额(万)',
								key: 'salesTotal',
								align: "center",
							},
							{
								title: '抵扣总额(万)',
								key: 'deductionTotal',
								align: "center",
							},
							{
								title: '实付总额(万)',
								key: 'payAmount',
								align: "center",
							},
							{
								title: '客单价（元/单）',
								key: 'perSales',
								align: "center",
							},
						 ]
					 }           
				],
				reportData: []
				
			}
		},
		mixins: [goshowPage],
		mounted(){
			var mianTitle="整合方"
			this.mounthData(mianTitle)
		},
		methods:{
			//获取报表
			showSend(date){
				var queryMonth="/report/integration/queryMonth"
				var queryWeek="/report/integration/queryWeek"
				var queryDay="/report/integration/queryDay"
				this.getTabledata(date,queryMonth,queryWeek,queryDay)				
			},	
			//清空日期
			clearDate(){
				this.reportData=[]
				this.pageParam={
					pageNum:1,
					pageSize:10,
				};
				var mianTitle="整合方"
				this.changtitle(mianTitle)
				
			},
			//刷新分页组件
			showPage(){
				this.reloadcom()
			},
			//获取日期
			showParam(data){
				this.pageParam={
					pageNum:1,
					pageSize:10,
				};
				var mianTitle="整合方"+data;
				this.changetitle(mianTitle)		
			},
			//获取月，周
			showMonth(data){
			var mianTitle="整合方"
				this.getMonthweek(data,mianTitle)
				 
			},
			//选择页数
			changePage(val){
				this.pageParam.pageNum=val;
				this.startPage()
			},
			//每页显示多少条
			changeSize(val){
				this.pageParam.pageSize=val;
				this.startPage()	
			},
				//下载
				downExcel(){
					var queryMonth="/report/integration/queryMonth"
					var queryWeek="/report/integration/queryWeek"
					var queryDay="/report/integration/queryDay"
					this.getdownData(queryMonth,queryWeek,queryDay)
				},
		}				
	}
</script>

<style>

</style>

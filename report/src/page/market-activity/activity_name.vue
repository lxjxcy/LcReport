<template>
	<div class="activity_name all">
		<orderTop v-on:getTitle="showParam" v-on:getClear="clearDate" v-on:getExcel="downExcel" v-on:getMonth="showMonth"  v-on:getDateparam="showSend"></orderTop>
		<Table height="400" v-if="this.$store.state.saveData.showDate!=3" :loading="loading" border :columns="columns" :data="reportData"></Table>
		<Table height="400" v-if="this.$store.state.saveData.showDate==3" :loading="loading" border :columns="columnsday" :data="reportData"></Table>
		<div class="pages"><span class="inpage"><Page :total="total"  show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" /></span></div> 
	</div>
</template>
<script>
	import orderTop from "../../components/order_top.vue"
	import axios from 'axios';
	import goshowPage from "../../mixins/index"
	export default {
		name:"activity_name",
		components:{
			orderTop
		},
		 data () {
			return {
				month:true,
				total:0,
				loading:false,
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
				tHeader:['活动名称','商品名称','单价(元)','订单数量','销售总额(元)','抵扣总额(元)','实付总额(元)'],
				filterVal:['activityName','commodityName','unitPrice','orderNum','salesTotal','deductionTotal','payAmount'],
				 columns: [
					 {
						 title: '营销活动月报表',
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
							 	title: '活动名称',
							 	key: 'activityName',
							 	align: "center",
							 },
							 {
							 	title: '商品名称',
							 	key: 'commodityName',
							 	align: 'center'
							 },
							 {
							 	title: '单价(元)',
							 	key: 'unitPrice',
							 	align: "center",
							 },
							 {
							 	title: '订单数',
							 	key: 'orderNum',
							 	align: "center",
							 },
							 {
							 	title: '销售总额(元)',
							 	key: 'salesTotal',
							 	align: "center",
							 },
							 {
							 title: '抵扣总额(元)',
							 key: 'deductionTotal',
							 align: "center",
							 },
							 {
							 title: '实付总额(元)',
							 key: 'payAmount',
							 align: "center",
							 },
// 							 {
// 							 title: '详情',
// 							 key: 'action',
// 							 align: "center",
// 							render: (h, params) => {
// 								return h('Dropdown',[
// 											h('Button','查看'),
// 											h('DropdownMenu',{
// 												slot:"list"
// 											},[
// 												h('DropdownItem',{
// 													nativeOn:{
// 														click:(name)=>{
// 															this.$router.push('/source/day_report/'+params.row.orderSource);
// 															
// 														}
// 													}
// 												},'日详情'),
// 											])
// 										])									
// 							   }						 
// 							 }
						 ]
					 }           
                ],
				columnsday:[
					 {
						 title: '营销活动月报表',
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
								title: '活动名称',
								key: 'activityName',
								align: "center",
							 },
							 {
								title: '商品名称',
								key: 'commodityName',
								align: 'center'
							 },
							 {
								title: '单价',
								key: 'unitPrice',
								align: "center",
							 },
							 {
								title: '订单数',
								key: 'orderNum',
								align: "center",
							 },
							 {
								title: '销售总额(万)',
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
							 }

						 ]
					 }
					
				],
				reportData: []
			}
		},
		mixins: [goshowPage],
		mounted(){
			var mianTitle="营销活动"
			this.mounthData(mianTitle)
		},
		methods:{
			//获取报表
			showSend(date){
				var queryMonth="/Markething/queryMonth"
				var queryWeek="/Markething/queryWeek"
				this.getTabledata(date,queryMonth,queryWeek)		
			},	
			//清空日期
			clearDate(){
				this.reloadcom()
				this.reportData=[]
				this.pageParam={
					pageNum:1,
					pageSize:10,
				};
				var mianTitle="营销活动"
				this.changtitle(mianTitle)
			},
			//获取日期
			showParam(data){
				this.reloadcom()
				this.pageParam={
					pageNum:1,
					pageSize:10,
				};
				var mianTitle="营销活动"+data;
				this.changetitle(mianTitle)		
			},
			//获取月，周
			showMonth(data){
				this.reloadcom()
			var mianTitle="营销活动"
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
					var queryMonth="/Markething/queryMonth"
					var queryWeek="/Markething/queryWeek"
					this.getdownData(queryMonth,queryWeek)
				},
		}				
	}
</script>

<style>

</style>

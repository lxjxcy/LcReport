<template>
	<div class="use_name all">
		<orderTop v-on:getTitle="showParam" v-on:getExcel="downExcel" v-on:getClear="clearDate" v-on:getMonth="showMonth"  v-on:getDateparam="showSend"></orderTop>
		<Table height="400" :loading="loading"  border :columns="columns" :data="reportData"></Table>
		<div class="pages"><span class="inpage"><Page :total="total" show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" /></span></div> 
	</div>
</template>
<script>
	import orderTop from "../../components/order_top.vue"
	import axios from 'axios';
	import goshowPage from "../../mixins/index"
	export default {
		name:"use_name",
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
				tHeader:['应用名称','订单数量','销售总额(元)','抵扣总额(元)','实付总额(元)'],
				filterVal:['applicationName','orderNum','salesTotal','deductionTotal','payAmount'],
				 columns: [
					 {
						 title: '应用月报表',
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
							 	title: '应用名称',
							 	key: 'applicationName',
							 	align: "center",
							 },
// 							 {
// 							 	title: '下单用户数',
// 							 	key: 'orderUserNum',
// 							 	align: 'center'
// 							 },
							 {
							 	title: '订单数',
							 	key: 'orderNum',
							 	align: "center",
							 },
							 {
							 	title: '销量总额(元)',
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
																path: '/use_name/use_day',
																query: {
																	title: params.row.applicationName
																}
																})
															
															
														}
													}
												},'日详情'),

											])
										])									
							   }						 
							 }
						 ]
					 }           
        ],
				reportData: []
				
			}
		},
		mixins: [goshowPage],
		mounted(){
			var mianTitle="应用"
			this.mounthData(mianTitle)
		},
		methods:{
			//获取报表
			showSend(date){
				var queryMonth="/application/queryMonth"
				var queryWeek="/application/queryWeek"
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
			},
			//获取日期
			showParam(data){
				this.reloadcom()
				this.pageParam={
					pageNum:1,
					pageSize:10,
				};
				this.columns[0].title="应用"+data;
			},
			//获取月，周
			showMonth(data){
				this.reloadcom()
			var mianTitle="应用"
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
					this.export2Excel()
				},
		}

				
	}
</script>

<style>

</style>

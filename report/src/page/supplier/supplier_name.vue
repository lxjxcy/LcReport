<template>
	<div class="supplier_name all">
		<orderTop v-on:clearPage="showPage" v-on:getTitle="showParam" v-on:getClear="clearDate" v-on:getExcel="downExcel" v-on:getMonth="showMonth"  v-on:getDateparam="showSend"></orderTop>
	<Table height="400" v-if="this.$store.state.saveData.showDate!=3" :loading="loading" border :columns="columns" :data="reportData"></Table>
	<Table height="400" v-if="this.$store.state.saveData.showDate==3" :loading="loading" border :columns="columnsday" :data="reportData"></Table>
		<div class="pages"><span class="inpage"><Page v-if="hackReset" :total="total" :page-size="sizecom"  show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" /></span></div> 
	</div>
</template>
<script>
	import orderTop from "../../components/order_top.vue"
	import axios from 'axios';
	import goshowPage from "../../mixins/index"
	export default {
		name:"supplier_name",
		components:{
			orderTop
		},
		 data () {
			return {
				month:true,
				total:0,
				sizecom:10,
				hackReset:true,
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
				tHeader:['供应商名称', '订单数', "销量总额(元)","抵扣总额(元)","实付总额(元)","客单价（元/单）"],
				filterVal:['supplierName', 'orderNum', "salesTotal","deductionTotal","payAmount","perSales"],
				 columns: [
					 {
						 title: '供应商统计月报表',
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
							 	title: '供应商名称',
							 	key: 'supplierName',
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
																path: '/supplier_name/supplier_day',
																query: {
																	title: params.row.supplierName
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
						 columnsday: [
									 {
										 title: '供应商统计月报表',
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
											 	title: '供应商名称',
											 	key: 'supplierName',
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
										 ]
									 }           
				        ],
				reportData: []
				
			}
		},
		mixins: [goshowPage],
		mounted(){
			var mianTitle="供应商统计"
			this.mounthData(mianTitle)
		},
		methods:{
			//获取报表
			showSend(date){
				var queryMonth="/report/supplier/queryMonth"
				var queryWeek="/report/supplier/queryWeek"
				var queryDay="/report/supplier/queryDay"
				this.getTabledata(date,queryMonth,queryWeek,queryDay)		
			},	
			//清空日期
			clearDate(){
				this.reportData=[]
				this.pageParam={
					pageNum:1,
					pageSize:10,
				};
				var mianTitle="供应商统计"
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
				var mianTitle="供应商统计"+data;
				this.changetitle(mianTitle)		
			},
			//获取月，周
			showMonth(data){
			var mianTitle="供应商统计"
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
				var queryMonth="/report/supplier/queryMonth"
				var queryWeek="/report/supplier/queryWeek"
				var queryDay="/report/supplier/queryDay"
				this.getdownData(queryMonth,queryWeek,queryDay)
			},
		}				
	}
</script>

<style>

</style>

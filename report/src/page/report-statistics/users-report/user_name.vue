<template>
	<div class="order_source all">	
		<orderTop v-on:getTitle="showParam" v-on:getClear="clearDate"  v-on:getMonth="showMonth" v-on:getExcel="downExcel"  v-on:getDateparam="showSend" v-on:clearPage="showPage"></orderTop>		
		<Table height="400" @on-sort-change="startSort" v-if="this.$store.state.saveData.showDate!=3" :loading="loading" border :columns="columns" :data="reportData"></Table>
		<Table height="400" @on-sort-change="startSort" v-if="this.$store.state.saveData.showDate==3" :loading="loading" border :columns="columnsday" :data="reportData"></Table>
		<div class="pages"><span class="inpage"><Page v-if="hackReset"  :total="total" show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" /></span></div> 
	</div>
</template>
<script>
	import orderTop from "../../../components/order_top.vue"
	import goshowPage from "../../../mixins/index"
	import axios from 'axios';
	export default {
		name:"order_source",
		components:{
			orderTop
		},
		 data () {
			return {
				month:true,
				hackReset:true,
				loading:false,
				total:0,
				sortParam:{},
				pageParam:{
					pageNum:1,
					pageSize:10,
				},
				columnsday:[
					{
						title: '用户月报表',
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
							title: '用户名称',
							key: 'orderSource',
							align: "center",
							sortable: 'custom'
							},
							{
							title: '下单用户数',
							key: 'orderUserNum',
							align: 'center',
							sortable: 'custom'
							},
							{
							title: '订单数',
							key: 'orderNum',
							align: "center",
							sortable: 'custom'
							},
							{
								title: '商品数量',
								key: 'goodsAmount',
								align: "center",
								sortable: 'custom'
							},
							{
							title: '销量总额(万)',
							key: 'salesTotal',
							align: "center",
							sortable: 'custom'
							},
							{
							title: '抵扣总额(万)',
							key: 'deductionTotal',
							align: "center",
							sortable: 'custom'
							},
							{
							title: '实付总额(万)',
							key: 'payAmount',
							align: "center",
							sortable: 'custom'
							},
							{
							title: '客单价(元/单)',
							key: 'perSales',
							align: "center",
							sortable: 'custom',
							render: (h, params) => {
								var toFix=params.row.perSales.toFixed(2)
								return h('div',{	
								},toFix)
							}
						},
						],
					}
				],
				 columns: [
					 {
						 title: '用户月报表',
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
							 	title: '用户名称',
							 	key: 'orderSource',
							 	align: "center",
							 },
							 {
							 	title: '下单用户数',
							 	key: 'orderUserNum',
							 	align: 'center',
								sortable: 'custom'
							 },
							 {
							 	title: '订单数',
							 	key: 'orderNum',
							 	align: "center",
								sortable: 'custom'
							 },
							 {
							 	title: '销量总额(万)',
							 	key: 'salesTotal',
							 	align: "center",
								sortable: 'custom'
							 },
							 {
							 	title: '抵扣总额(万)',
							 	key: 'deductionTotal',
							 	align: "center",
								sortable: 'custom'
							 },
							 {
							 	title: '实付总额(万)',
							 	key: 'payAmount',
							 	align: "center",
								sortable: 'custom'
							 },
							 {
							 	title: '客单价(元/单)',
							 	key: 'perSales',
							 	align: "center",
								sortable: 'custom'
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
// 												h('DropdownItem',{
// 													nativeOn:{
// 														click:(name)=>{
// 															this.$router.push({
// 																path: '/source/day_report',
// 																query: {
// 																	title: params.row.orderSource
// 																}
// 															})
// 														
// 															
// 														}
// 													}
// 												},'日详情'),
												h('DropdownItem',{
													nativeOn:{
														click:(name)=>{
															this.$router.push({
																path: '/user_name/user_product',
																query: {
																	title: params.row.orderSource
																}
															})
															
															
														}
													}
												},'按商品详情')
											])
										])									
							   }						 
							 }
						 ]
					 }           
        ],
				reportData: [],
				tHeader:['用户名称', '下单用户数', '订单数','商品数量','GMV(元)',"销量总额(万)","抵扣总额(万)","实付总额(万)","客单价（元/单）"],
				filterVal:['orderSource', 'orderUserNum', 'orderNum','goodsAmount',"grossMerchandiseVolume","salesTotal","deductionTotal","payAmount","perSales"],	
			}
		},
		mixins: [goshowPage],
		mounted(){	
			var mianTitle="分渠道统计"
			this.mounthData(mianTitle)
		},
		methods:{
			//获取报表
			showSend(date){
				var queryMonth="/report/channel/queryMonth"
				var queryWeek="/report/channel/queryWeek"
				var queryDay="/report/channel/queryDay"
				this.getTabledata(date,queryMonth,queryWeek,queryDay)		
			},	
			//清空日期
			clearDate(){
				this.reportData=[]
				this.pageParam={
					pageNum:1,
					pageSize:10,
				};
				var mianTitle="用户"
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
				var mianTitle="用户"+data;
				this.changetitle(mianTitle)		
				
			},
			//获取月，周
			showMonth(data){
       var mianTitle="用户";
				this.getMonthweek(data,mianTitle)
			},
			//下载
			downExcel(){
				var queryMonth="/report/channel/queryMonth"
				var queryWeek="/report/channel/queryWeek"
				var queryDay="/report/channel/queryDay"
				this.getdownData(queryMonth,queryWeek,queryDay)
			
			},
	
		}
				
	}
</script>

<style>

</style>

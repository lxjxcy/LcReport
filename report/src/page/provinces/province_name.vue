<template>
	<div class="province_name all">
		<orderTop v-on:getTitle="showParam" v-on:getClear="clearDate" v-on:getExcel="downExcel" v-on:getMonth="showMonth"  v-on:getDateparam="showSend"></orderTop>
		<Table height="400" v-if="this.$store.state.saveData.showDate!=3" :loading="loading" border :columns="columns" :data="reportData"></Table>
		<Table height="400" v-if="this.$store.state.saveData.showDate==3" :loading="loading" border :columns="columnsday" :data="reportData"></Table>
		<div class="pages"><span class="inpage"><Page :total="total"  show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" /></span></div> 
	</div>
</template>
<script>
	import orderTop from "../../components/order_top.vue"
	import axios from 'axios';
	import goshowPage from "../../mixins/index";
	export default {
		name:"province_name",
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
				tHeader:['省份名称', '订单数量','商品数量','订单总价(元)','订单均价(元)'],
				filterVal:['province', 'orderNum','commodityNum','orderTotal','orderAverage'],
				 columns: [
					 {
						 title: '省份月报表',
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
							 	title: '省份名称',
							 	key: 'province',
							 	align: "center",
							 },
							 {
							 	title: '订单数量',
							 	key: 'orderNum',
							 	align: 'center'
							 },
							 {
							 	title: '商品数量',
							 	key: 'commodityNum',
							 	align: "center",
							 },
							 {
							 	title: '订单总价(元)',
							 	key: 'orderTotal',
							 	align: "center",
							 },
							 {
							 	title: '订单均价(元)',
							 	key: 'orderAverage',
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
																path: '/province_name/province_day',
																query: {
																	title: params.row.province
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
						title: '省份月报表',
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
								title: '省份名称',
								key: 'province',
								align: "center",
							},
							{
								title: '订单数量',
								key: 'orderNum',
								align: 'center'
							},
							{
								title: '商品数量',
								key: 'commodityNum',
								align: "center",
							},
							{
								title: '订单总价(元)',
								key: 'orderTotal',
								align: "center",
							},
							{
								title: '订单均价(元)',
								key: 'orderAverage',
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
			var mianTitle="省份"
			this.mounthData(mianTitle)
		},
		methods:{
			//获取报表
			showSend(date){
				var queryMonth="/province/queryMonth"
				var queryWeek="/province/queryWeek"
				var queryDay="/province/queryDay"
				this.getTabledata(date,queryMonth,queryWeek,queryDay)		
			},	
			//清空日期
			clearDate(){
				this.reloadcom()
				this.reportData=[]
				this.pageParam={
					pageNum:1,
					pageSize:10,
				};
				var mianTitle="省份"
				this.changtitle(mianTitle)
			},
			//获取日期
			showParam(data){
				this.reloadcom()
				this.pageParam={
					pageNum:1,
					pageSize:10,
				};
			var mianTitle="省份";
			this.changetitle(mianTitle,data)		
			},
			//获取月，周
			showMonth(data){
				this.reloadcom()
			var mianTitle="省份"
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
				var queryMonth="/province/queryMonth"
				var queryWeek="/province/queryWeek"
				var queryDay="/province/queryDay"
				this.getdownData(queryMonth,queryWeek,queryDay)
			},
		}

	


				
	}
</script>

<style>

</style>

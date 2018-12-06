<template>
	<div class="province_name all">
		<orderTop v-on:clearPage="showPage" v-on:getTitle="showParam" v-on:getClear="clearDate" v-on:getExcel="downExcel" v-on:getMonth="showMonth"  v-on:getDateparam="showSend"></orderTop>
		<Table height="400" @on-sort-change="startSort" v-if="this.$store.state.saveData.showDate!=3" :loading="loading" border :columns="columns" :data="reportData"></Table>
		<Table height="400" @on-sort-change="startSort" v-if="this.$store.state.saveData.showDate==3" :loading="loading" border :columns="columnsday" :data="reportData"></Table>
		<div class="pages"><span class="inpage"><Page :total="total" v-if="hackReset"  show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" /></span></div> 
	</div>
</template>
<script>
	import orderTop from "../../../components/order_top.vue"
	import goshowPage from "../../../mixins/index";
	export default {
		name:"province_name",
		components:{
			orderTop
		},
		 data () {
			return {
				tHeader:['省份名称', '订单数量','商品数量','GMV(万)','订单总价(元)','订单均价(元)'],
				filterVal:['province', 'orderNum','goodsAmount','grossMerchandiseVolume','commodityNum','orderTotal','orderAverage'],
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
								title: 'GMV(万)',
								key: 'grossMerchandiseVolume',
								align: "center",
								render: (h, params) => {
									var toFix=params.row.grossMerchandiseVolume.toFixed(2)
									return h('div',{	
									},toFix)
								}
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
								title: 'GMV(万)',
								key: 'grossMerchandiseVolume',
								align: "center",
								render: (h, params) => {
									var toFix=params.row.grossMerchandiseVolume.toFixed(2)
									return h('div',{	
									},toFix)
								}
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
				var queryMonth="/report/province/queryMonth"
				var queryWeek="/report/province/queryWeek"
				var queryDay="/report/province/queryDay"
				this.getTabledata(date,queryMonth,queryWeek,queryDay)		
			},	
			//清空日期
			clearDate(){
				var mianTitle="省份"
				this.changtitle(mianTitle)
			},
			//获取日期
			showParam(data){
			var mianTitle="省份";
			this.changetitle(mianTitle,data)		
			},
			//获取月，周
			showMonth(data){
			var mianTitle="省份"
				this.getMonthweek(data,mianTitle)
				
			},	
			//下载
			downExcel(){
				var queryMonth="/report/province/queryMonth"
				var queryWeek="/report/province/queryWeek"
				var queryDay="/report/province/queryDay"
				this.getdownData(queryMonth,queryWeek,queryDay)
			},

		}

	


				
	}
</script>

<style>

</style>

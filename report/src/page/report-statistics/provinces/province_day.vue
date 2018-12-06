<template>
	<div class="province_day">
		<div class="goback">
			<goBack gobackUrl="/province_name" nowTitel="按日统计报表"></goBack>
		</div>
		<div class="all">
			<dayTop v-on:getExcel="downExcel"></dayTop>
			<Table height="400" @on-sort-change="startSort" border :columns="columns" :data="data"></Table>
			<div class="pages"><span class="inpage"><Page :total="total" show-sizer show-total @on-page-size-change="changeSize" @on-change="changePage"/></span></div>
		</div>
	</div>
</template>
<script>
	import goBack from "../../../components/goBack.vue"
	import dayTop from "../../../components/day_top.vue"
	import goday from "../../../mixins/goday"
	export default {
		name:"province_day",
		components:{
			goBack,
			dayTop
		},
		 data () {
			 
            return {
				tHeader:['日期', '订单数量','商品数量','GMV(万)','订单总价(元)','订单均价(元)'],
				filterVal:['date', 'orderNum','goodsAmount','grossMerchandiseVolume','commodityNum','orderTotal','orderAverage'],
				 columns: [
					 {
						title: '省份按日报表',
						 key: '222',
						 align: 'center',						 
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
							title: '日期',
							key: 'date',
							align: "center",
// 							render: (h, params) => {
// 								var nowdata=new Date(params.row.date)
// 								var changdate =nowdata.getFullYear() + "-" + (nowdata.getMonth() + 1) + "-" + nowdata.getDate()
// 								return h('div',{	
// 								},changdate)
// 							}
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
		mixins: [goday],
		methods:{
			getlist(){
				var sendTitle={
					province:this.$route.query.title,
				}
				var url="/report/province/queryDay"
				var mianTitle="省份按日报表"
				this.getDayData(url,mianTitle,sendTitle)
			},
			//下载
			downExcel(){
				var sendTitle={
					province:this.$route.query.title,
				}
				var url="/report/province/queryDay"
				var ifdata=true;
				this.getdownData(url,sendTitle,ifdata)
			},

			
		}

				
	}
</script>

<style>

</style>

<template>
	<div class="product_day">
		<div class="goback">
			<goBack gobackUrl="/product_name" nowTitel="按日统计报表"></goBack>
		</div>
		<div class="all">
			<dayTop v-on:getExcel="downExcel"></dayTop>
			<Table height="400" :loading="loading" border :columns="columns" :data="data"></Table>
			<div class="pages"><span class="inpage"><Page :total="total" show-sizer show-total @on-page-size-change="changeSize" @on-change="changePage"/></span></div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import goBack from "../../components/goBack.vue"
	import dayTop from "../../components/day_top.vue"
	import goday from "../../mixins/goday"
	export default {
		name:"product_day",
		components:{
			goBack,
			dayTop
		},
		 data () {
			 
            return {
				total:0,
				loading:false,
				pageParam:{
					pageNum:1,
					pageSize:10,
				},
				tHeader:['日期','订单数量','商品数量','订单总价(元)','订单均价(元)'],
				filterVal:['date','orderNum','goodsNum','totalPrice','averagePrice'],
				 columns: [
					 {
						title: '商品名称按日报表',
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
							key: 'goodsNum',
							align: "center",
							},
							{
							title: '订单总价(元)',
							key: 'totalPrice',
							align: "center",
							},
							{
							title: '订单均价(元)',
							key: 'averagePrice',
							align: "center",
							},
						 ]
					 }            
        ],
				data: []
				
			}
		},
		mixins: [goday],
		mounted(){
			this.getlist()
		},
		methods:{
			getlist(){
				var sendTitle={
					goodsName:this.$route.query.title,
				}
				var url="/goods/queryDay"
				var mianTitle="商品名称按日报表"
				this.getDayData(url,mianTitle,sendTitle)
			},
			//选择页数
			changePage(val){
				this.pageParam.pageNum=val;
				this.getlist()
			},
			//每页显示多少条
			changeSize(val){
				this.pageParam.pageSize=val;
				this.getlist()
			},	
			//下载
			downExcel(){
				var sendTitle={
					goodsName:this.$route.query.title,
				}
				var url="/goods/queryDay"
				var ifdata=true;
				this.getdownData(url,sendTitle,ifdata)
			},
			
		}				
	}
</script>

<style>

</style>

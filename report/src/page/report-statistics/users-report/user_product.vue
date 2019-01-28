<template>
	<div class="second_source">
		<div class="goback">
			<goBack gobackUrl="/user_name" nowTitel="用户商品统计"></goBack>
		</div>
		<div class="all">
			<dayTop v-on:getExcel="downExcel"></dayTop>
			<Table height="400" @on-sort-change="startSort" :loading="loading"  border :columns="columns" :data="data"></Table>
			<div class="pages"><span class="inpage"><Page :total="total" show-sizer show-total @on-page-size-change="changeSize" @on-change="changePage"/></span></div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import goBack from "../../../components/goBack.vue"
	import dayTop from "../../../components/day_top.vue"
	export default {
		name:"second_source",
		components:{
			goBack,
			dayTop
		},
		 data () { 
      return {
				total:0,
				loading:false,
				sortParam:{},
				pageParam:{
					pageNum:1,
					pageSize:10,
				},
				tHeader:['下单时间',  '订单ID','商品名称','供应商名称',"商品数量","商品单价(元)","销售额(元)","支付方式","支付时间","订单状态"],
				filterVal:['orderTime', 'orderId','goodsName', "supplierName","goodsAmount",'goodsPerPrice',"salesTotal","payMode","payTime","status"],
						columns: [
							{
								title: '二级渠道统计报表',
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
										title: '下单时间',
										key: 'orderTime',
										align: 'center',	
										sortable: 'custom'
									},
									{
										title: '订单ID',
										key: 'orderId',
										align: "center",
									},
									{
										title: '商品名称',
										key: 'goodsName',
										align: 'center',	
									},
									{
										title: '供应商名称',
										key: 'supplierName',
										align: 'center',	
									},
									{
										title: '商品数量',
										key: 'goodsAmount',
										align: 'center',	
										sortable: 'custom'
									},
									{
										title: '商品单价(元)',
										key: 'goodsPerPrice',
										align: 'center',	
										sortable: 'custom',
									},
									{
										title: '销售额(元)',
										key: 'salesTotal',
										align: "center",
										sortable: 'custom',
									},
									{
										title: '支付方式',
										key: 'payMode',
										align: "center",
									},
									{
										title: '支付时间',
										key: 'payTime',
										align: "center",
										sortable: 'custom'
									},

									{
										title: '订单状态',
										key: 'status',
										align: "center",
										sortable: 'custom'
									},
									

								]
							}            
				],
				
				data: [],
				downExceldata:[],
				
				
			}
		},
		mounted(){
			this.getlist()
		},
		methods:{
			getlist(){
				var param={
					ownerId:this.$route.query.title,
				}
				var param=Object.assign(param,this.pageParam,this.sortParam)
				this.$api.getOrderDetails(param).then(res=>{
						if(res.code==0){
							this.data=this.filterData(res.data.rows)
							this.total=res.records;
						}
				})			
				this.columns[0].title=this.$route.query.title+"用户订单详情"
			},
			filterData(e){
				var arr=e
				for(var i=0;i<arr.length;i++){
					arr[i]["goodsPerPrice"]=arr[i].goodsPerPrice.toFixed(2);
					arr[i]["payTime"]=moment(arr[i].payTime).format("YYYY-MM-DD HH:mm:ss");
					arr[i]["orderTime"]=moment(arr[i].orderTime).format("YYYY-MM-DD HH:mm:ss");
					arr[i]["salesTotal"]=arr[i].salesTotal.toFixed(2);
				}
				return arr;
			},
			//下载

				downExcel() {
					var param={
						ownerId:this.$route.query.title,
					}
					var param=Object.assign(param,this.sortParam)
					this.$api.getOrderDetails(param).then(res=>{
							if(res.code==0){
								this.downExceldata=this.filterData(res.data.rows)
								this.export2Excel()
							}
					})		
		　　	},
		
					export2Excel() {
			　　　　　　require.ensure([], () => {			
			　　　　　	const { export_json_to_excel } = require('@/vendor/Export2Excel');
								var data = this.formatJson(this.filterVal, this.downExceldata);
								var title=this.$route.query.title;
								export_json_to_excel(this.tHeader, data, title);
									this.$store.state.loading=false;
									this.$store.state.loadData=[];
			　　　　　　})
			　　　　},
			　　　　formatJson(filterVal, jsonData) {
			　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
								
			　　　　},

			
			changePage(val){
				this.pageParam.pageNum=val;
				this.getlist()
			},
			//每页显示多少条
			changeSize(val){
				this.pageParam.pageSize=val;
				this.getlist()
			},
			//排序
			startSort(e){
			if(e.order=="asc"){
				var action=1
			}else{
				var action=0
			}
			this.sortParam={
				action:action,
				sortField:e.key
			}
			
			this.getlist()
			}
			
		}
	}
</script>

<style>

</style>

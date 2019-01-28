<template>
	<div class="user_name all">
		<div class="upload-user">
			<uploadUser v-on:getupdata="getUserdata"></uploadUser>
		</div>
		<div class="all-user">
			<Table :columns="columnsAll" :data="this.$store.state.userCount"  border ></Table>
		</div>
		<div class="user-detail">
			<Table :columns="columns" :loading="loading" :data="this.$store.state.userList" border height="350" ></Table>
		</div>
		<!-- <div class="pages">
			<span class="inpage">
				<Page v-if="hackReset"
					:total="total" 
					show-total
					show-sizer
						@on-page-size-change="changeSize" 
						@on-change="changePage" />
			</span>
		</div> -->
		
		
	</div>
</template>
<script>
	import uploadUser from "./upload_user.vue"
	export default {
		name:"user_name",
		components:{
			uploadUser
		},
		 data () {
			return {
				hackReset:true,
				loading:false,
				total:0,
				sortParam:{},
				pageParam:{
					pageNum:1,
					pageSize:10,
				},
				allUserData:[],
				reportData: [],
				columnsAll: [
							{
								title: '用户数',
								key: 'user_num',
								align: "center",
							},
							{
								title: '订单数',
								key: 'order_num',
								align: "center",
							},
							{
								title: '商品数',
								key: 'goods_amount',
								align: "center",
							} ,
							{
								title: '销量总额(万)',
								key: 'sales_total',
								align: "center",
							},
							        
				],
				
				 columns: [
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
							 	title: '用户ID',
							 	key: 'ownerId',
							 	align: "center",
							 },
							 {
							 	title: '订单数',
							 	key: 'orderNum',
							 	align: "center",
								// sortable: 'custom'
							 },
							 {
							 	title: '商品数',
							 	key: 'goodsAmount',
							 	align: "center",
							 },
							 {
							 title: '初次下单时间',
							 key: 'firstOrderTime',
							 align: "center",
							 },
							 {
							 title: '最近下单时间',
							 key: 'lastOrderTime',
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
																path: '/user_name/user_product',
																query: {
																	title: params.row.ownerId
																}
															})
															
															
														}
													}
												},'用户商品详情')
											])
										])									
							   }						 
							 }          
        ],
				
			}
		},

		mounted(){
			this.getUserdata()
		},
		methods:{
			//获取用户
			getUserdata(){
				

				
			},

		
	
		}
				
	}
</script>

<style scoped>
	.upload-user{
		background: #fff;
		height:50px;
		margin-bottom: 20px;
		line-height: 50px;
	}
	.all-user{
		background: #fff;
	margin-bottom: 20px;
	}

</style>

<template>
	<div class="all">
		<!-- <addUser ref="childAdduser" v-if="hackReset" @getList="getlist" @parReset="resetComp"></addUser> -->
		<updataUser ref="childUpdatauser" v-if="hackReset" @getList="getlist" @parReset="resetComp"></updataUser>
		<div class="operation">
			<div class="search-user">
				<searchUser @userParams="startSearch"  @paramReset="serachReset"></searchUser>
			</div>
			<div class="add-user"></div>
		</div>
		<div class="tablelist">
			 <Table border height="400" :columns="columns" :data="userlist"></Table>
			 <div class="pages">
				<span class="inpage">
					<Page v-if="pageReset" :total="total" show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" />
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	import searchUser from "./searchUser.vue"
	import addUser from "./add_user.vue"
	import updataUser from "./updata_user.vue"
	export default {
		name:"userList",
		components:{
			searchUser,
			addUser,
			updataUser
		},
		data () {
           return {
				total:40,
				stateSwitch:"",
				// loading:false,
				hackReset:true,
				pageReset:true,
				oldparams:{},
				pageParam:{
					pageNum:1,
					pageSize:10,
				},
				ifstartSearch:false,
				search:{},
        columns: [
					{
						title: '序号',
						key: 'index',
						width: 60,
						align: "center",
						render: (h, params) => {
							var index=params.index+(this.pageParam.pageNum - 1) * this.pageParam.pageSize + 1
							return h('div',{	
							},index)
						}
						
					},
					
				{
						title: '用户名',
						key: 'loginName',
						align: "center",
        },
				{
						title: '真实姓名',
						key: 'name',
						align: "center",
        },
			
				{
						title: '角色名称',
						key: 'roleName',
						align: "center",
        },
					{
						title: '状态',
						key: 'state',
						align: "center",
// 						render:(h, params) => {
//             return h('div', [
//               h('i-switch', { 
//                 props: {
//                   size:"large",
//                   value: params.row.state ===0,
// 									// disabled:true,
// 									// loading:params.row.state !=0,
//                 },
// 								 scopedSlots:{
// 										open:()=>h('span','正常'),
// 										close:()=>h('span','暂停'),
// 								 },
// //                 style: {
// //                   marginRight: '5px'
// //                 },
//                 on: {
//                   'on-change': (value) => {
//                                           
//                     this.switch(params.index) 
//                   }
//                 }
//               }, )
//             ]);
//           }
						render: (h, params) => {
							var pp=params.row
								 return h('i-switch',{
									 props:{
										 size:"large",
										 value:params.row.state==0,
										 // loading:this.loading,
									 },
									 scopedSlots:{
											open:()=>h('span','正常'),
											close:()=>h('span','暂停'),
									 },
									 on:{
													'on-change': (value) =>{ //值发生了改变调用方法
													
															if(value){
																var params={
																	state:0,
																	uuid:pp.uuid,
																}
															}else{
																var params={
																	state:2,
																	uuid:pp.uuid,
																}
															}
															 // console.log(params)																
																this.$api.updateUser(params).then(res=>{
																	if(res.code==0){
																		this.$Message.success(res.message)

																	}else{
																		this.$Message.error(res.message)
																			setTimeout(()=>{
																				this.getlist()	
																			},1000)
																	
																	
																		
																		// 
												
																	}
																})		
																
																// this.changeState(params.row.uuid,params.row.state)
													}
// 										 'on-change':(value)=>{
// 											 this.changeState(params.row.uuid,params.row.state)
// 										 }
									 }
								 })
						}
						
					},
					{
							title: '注册时间',
							key: 'createTime',
							align: "center",
					},
					{
					title: '操作',
					key: 'action',
					align: 'center',
					render: (h, params) => {
							return h('div', [
									h('Button', {
													props: {
															type: 'primary',
															size: 'small',
															
															
													},
													style: {
															marginRight: '5px'
													},
													on: {
															click: () => {
																 this.startUpdataUser(params.row)
															}
													}
											}, '修改'),
												 h('Button', {
															props: {type: 'error', size: 'small'},
													},[
															h('Poptip', {
																	props: {
																			confirm: true,
																			transfer: true,
																			placement: 'top',
																			title: '确定要删除吗！',
																			type: 'error',
																			size: 'small',
																			width: '200',

																	},
																	on: {
																			'on-ok':  ()=>{
																					this.delUser(params.row.uuid)
																			},
																			'on-cancel': function(){
																					// this.$Message.info('取消删除')
																			}
																	}
															}, '删除')
														])
																]);
														}
												}
                ],
                userlist: [
                    
                ]
            }
        },
		mounted(){
			
			this.getlist()
		},
		methods:{
			//获取用户列表
			getlist(){
				var param={
					uuid:this.$store.state.userInfo.uuid
				}
				var params=Object.assign(param,this.pageParam)
				this.$api.getUserList(params).then(res=>{
					if(res.code==0){
						this.userlist=res.data.rows
						this.total=res.data.records
					}else{
						this.$Message.error(res.message)
					}
				})
			},
			//查询用户列表
			startSearchlist(params){
					this.$api.searchUserlist(params).then(res=>{
						if(res.code==0){
							this.userlist=res.data.rows
							this.total=res.data.records
						}else{
							this.$Message.error(res.message)
						}
					})
			},
			//查询重置
			serachReset(){
				this.resetParams()
				this.ifstartSearch=false;
				this.getlist()
			},
			//选择页数
			changePage(val){
				this.pageParam.pageNum=val;
				if(this.ifstartSearch){
					this.pageSearch()
				}else{
					this.getlist()
				}
				
			},
			//每页显示多少条
			changeSize(val){
				this.pageParam.pageSize=val;
				if(this.ifstartSearch){
					this.pageSearch()
				}else{
					this.getlist()
				}
			},
			//分页重置
			resetParams(){
				this.pageReset = false
					this.$nextTick(() => {
					this.pageReset = true
				})
				this.pageParam.pageSize=10;
				this.pageParam.pageNum=1;
			},
			startSearch(val){
				this.resetParams()
				this.search=val;
				this.ifstartSearch=true;
				this.oldparams=val;
				var params=Object.assign(this.search,this.pageParam)
				this.startSearchlist(params)
				
			},
			// 分页查询
			pageSearch(){
				var oldparams=this.oldparams
				var params=Object.assign(oldparams,this.pageParam)
			
				this.startSearchlist(params)
				
			},

			//修改用户
			startUpdataUser(param){
				this.$refs.childUpdatauser.updataModel(param);
			},
			//删除用户
			delUser(id){
				var params={
					uuid:id,
					state:1,
				}
				this.updataUser(params)
			},
			// 更新用户
			updataUser(params){
				this.$api.updateUser(params).then(res=>{
					if(res.code==0){
						this.$Message.success(res.message)
						// this.loading=false;
						// this.getlist()	
					}else{
						this.$Message.error(res.message)
						// this.loading=false;
						
						// this.getlist()	

					}
				})
			},
			switch(value){
				console.log(value)
			},
			
			//修改状态
			changeState(id,state){
				// this.loading=true;
				if(state==0){
					var params={
						state:2,
						uuid:id,
					}
				}else{
					var params={
						state:0,
						uuid:id,
					}
				}
			
				this.$api.updateUser(params).then(res=>{
					if(res.code==1){
						this.$Message.success(res.message)
						// this.loading=false;
						// this.getlist()	
					}else{
						this.$Message.error(res.message)
						// this.loading=false;
						setTimeout(()=>{
							this.getlist()	
						},1000)
						
						// 

					}
				})
			},
			resetComp(){
				this.hackReset = false
					this.$nextTick(() => {
					this.hackReset = true
				})
			},
			
		
		}
		
	}
</script>

<style scoped>
	.operation{
		height:80px;
		width:100%;
		background: #fff;
		margin-bottom: 10px;
	}
	.search-user{
		/* height:60px; */
		padding:0 5px;
		padding-top: 5px;
	}

</style>

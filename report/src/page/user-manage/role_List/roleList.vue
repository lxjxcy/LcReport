<template>
	<div class="all">
		<lookAuth ref="childAuth"></lookAuth>
		<updataRole ref="childUpdatarole" v-if="hackReset" @getlist="getlist" @parReset="resetComp"></updataRole>
		<div class="operation">
			<div class="search-user">
				<searchRole  @roleParams="startSearch" @getrole="getlist"  @paramReset="serachReset"></searchRole>
				
			</div>
			<div class="add-user"></div>
		</div>
		<div class="tablelist">
			 <Table border height="400" :columns="columns" :data="rolelist"></Table>
			 <div class="pages">
								 
				<span class="inpage">
					<Page  v-if="pageReset" :total="total" show-total show-sizer @on-page-size-change="changeSize" @on-change="changePage" />
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	import searchRole from "./searchRole.vue";
	import updataRole from "./updata_role.vue"
	import lookAuth from "./look_auth.vue"

	export default {
		name:"roleList",
		components:{
			searchRole,
			updataRole,
			lookAuth
		},
		data () {
            return {
							total:0,
							stateSwitch:"",
							hackReset:true,
							pageReset:true,
							oldparams:{},
							search:{},
							popData:[],
							pageParam:{
								pageNum:1,
								pageSize:10,
							},
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
						title: '角色',
						key: 'roleName',
						align: "center",
            },
			
				    {
						title: '描述',
						key: 'describe',
						align: "center",
						render: (h, params) => {
										return h('Tooltip', {
												props: { placement: 'top' },
												 style: {
														 display: 'inline-block',
														 width: '100%',
														 overflow: 'hidden',
														 textOverflow: 'ellipsis',
														 whiteSpace: 'nowrap'
												 },
										}, [
												params.row.describe,
												h('span', { 
													slot: 'content', 
													style: { 
														whiteSpace: 'normal', 
														wordBreak: 'break-all' ,
														},
													},params.row.describe)
										])
								}

					
             },
			
						{
							title: '创建时间',
							key: 'createTime',
							align: "center",
						},

					{
						title: '权限',
						key: 'authority',
						align: "center",
					render: (h, params) => {
						return h('div', [
							h('a', {
								
								style: {
										marginRight: '5px'
								},
								on: {
										click: () => {
											this.lookAuth(params.row.roleId,params.row.roleName)
										}
									}
								}, '查看权限'),
									]);
								}
						

						
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
										size: 'small'
								},
								style: {
										marginRight: '5px'
								},
								on: {
										click: () => {
											this.updataRole(params.row.roleId,params.row.roleName,params.row.describe)
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
															this.delRole(params.row.roleId)
													},
													'on-cancel': function(){
															this.$Message.info('取消删除')
													}
											}
										}, '删除')
										])
									]);
								}
							}
              ],
                rolelist:[]
            }
        },
		mounted(){
			this.getlist()
		},
		methods:{
			getlist(){
				if(this.$store.state.userInfo.userType==1){
					var param={}
				}else{
					var param={
						action:1
					}
				}
				var params=Object.assign(param,this.pageParam)
				this.$api.getRoleList(params).then(res=>{
						if(res.code==0){
							this.rolelist=res.data.rows;
							this.total=res.data.records;
						}else{
							this.$Message.error(res.message);
						}
				})
			},
			//查询用户列表
			startSearchlist(params){
					this.$api.searchRolelist(params).then(res=>{
						if(res.code==0){
							this.rolelist=res.data.rows
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
			resetComp(){
				console.log("sss")
				this.hackReset = false
					this.$nextTick(() => {
					this.hackReset = true
				})
			},
			// 添加角色
			addRole(){
				this.$refs.childAddrole.addModel();
			},
			//查看权限
			lookAuth(id,roleName){
				var params={
					userType:id,
				}
				this.$api.getPermission(params).then(res=>{
					var permissionList=res.data.permissionList;
					permissionList.forEach((element, index, array)=>{
						array[index]["title"]=array[index].name;
							if(array[index].permissionList!=null){
								array[index].permissionList.forEach((e, i, arr)=>{
									arr[i]["title"]=arr[i].name;
								})
							}
						
					})
							var params={
								roleName:roleName,
								permissionId:permissionList
							}
							this.$refs.childAuth.authModel(params);
					})
				
			},
			//修改角色
			
			updataRole(id,roleName,describe){
			var params={
				userType:id,
			}
			this.$api.getPermission(params).then(res=>{
				var permissionList=res.data.permissionList;
				var params={
					roleName:roleName,
					describe:describe,
					roleId:id,
					permissionId:permissionList
				}
				this.$refs.childUpdatarole.updataModel(params);
				
			})
				
			},
			//查权限
			getAth(id){
				
			},
			
			resetComp(){
				console.log("sss")
				this.hackReset = false
					this.$nextTick(() => {
					this.hackReset = true
				})
			},
			
			
			//删除角色
			delRole(id){
					var that=this;
					var params={
						roleId:id,
						state:1,
					}
					this.$api.updateRole(params).then(res=>{
						if(res.code==0){
							that.$Message.success(res.message);
							that.getlist()
						}else{
							that.$Message.error(res.message);
						}
				})
					
				}
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

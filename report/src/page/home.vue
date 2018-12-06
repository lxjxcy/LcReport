<template>
	<div class="home">
		  <aside>		
			    <Sider>
						<div class="aside-log"></div>
            <Menu :active-name="activemenu" theme="dark" width="auto" :open-names="nameslist" @on-select="routeTo" @on-open-change="showName">
							<!-- <MenuItem name="2"><Icon type="ios-cloud-upload-outline" />文件导入</MenuItem> -->
              
							<Submenu name="1">
									<template slot="title">
											<Icon type="md-book" />
											报表统计
									</template>
									<MenuItem name="1-1"><Icon type="ios-chatbubbles-outline" />渠道维度</MenuItem>
									<MenuItem name="1-2"><Icon type="ios-bug-outline" />分公司维度</MenuItem>
									<!-- <MenuItem name="1-12"><Icon type="md-contacts" />用户维度</MenuItem> -->
									<MenuItem name="1-11"><Icon type="ios-clipboard-outline" />整合方维度</MenuItem>
									<!-- <MenuItem name="1-3"><Icon type="ios-calendar-outline" />应用维度</MenuItem> -->
									<MenuItem name="1-4"><Icon type="ios-calendar-outline" />项目名称维度</MenuItem>
									
									<MenuItem name="1-5"><Icon type="ios-cart-outline" />商品名称维度</MenuItem>
									
									<MenuItem name="1-8"><Icon type="md-closed-captioning" />供应商维度</MenuItem>
									<MenuItem name="1-6"><Icon type="md-cut" />促销商品名称维度</MenuItem>	
									<MenuItem name="1-7"><Icon type="ios-card" />营销活动维度</MenuItem>
									<!-- <MenuItem name="1-9"><Icon type="ios-clipboard-outline" />省份维度</MenuItem> -->
							</Submenu>
							 <Submenu name="2" v-if="this.$store.state.userInfo.userType==1">
               		<template slot="title">
										<Icon type="ios-cloud-upload-outline" />             				
               				文件导入
               		</template>
               		<MenuItem name="2-1"><Icon type="ios-appstore-outline" />幸福绿城app</MenuItem>
									<MenuItem name="2-2"><Icon type="ios-basket" />幸福便利店</MenuItem>
               </Submenu>
							 <Submenu name="3" v-if="this.$store.state.userInfo.userType==1">
							 	<template slot="title">
							 			
										<Icon type="ios-create-outline" />
							 			报表生成
							 	</template>
							 	<MenuItem name="3-1"><Icon type="md-color-filter" />报表生成</MenuItem>
							 </Submenu>
							 <!-- <Submenu name="4" v-if="this.$store.state.userInfo.userType==1">
							 <template slot="title">
									<Icon type="md-people" />
									账户管理
							 </template>
							 <MenuItem name="4-1"><Icon type="ios-people-outline"/>账户列表</MenuItem>
							 </Submenu>	 -->
            </Menu>
        </Sider>
		  </aside>
		  <main>
			  <header>
				  <div>
						<div><Icon type="md-menu" size="20"/></div>
					  <div><span style="padding:0 10px;"><Icon type="md-alarm" size="15"/></span>{{dataTime}}</div>
						<div>
							 <Dropdown>
										<a href="javascript:void(0)">
											<Icon type="md-contact" />
												{{this.$store.state.userInfo.loginName}}
												<Icon type="ios-arrow-down"></Icon>
										</a>
										<DropdownMenu slot="list" style="text-align: center;">
												<DropdownItem ><span @click="back()" style="display: block;">退出</span></DropdownItem>
												<!-- <DropdownItem ><span @click="change()" style="display: block;">修改密码</span></DropdownItem> -->
										</DropdownMenu>
								</Dropdown>
						</div>

				  </div>
			  </header>
				<!-- <changePass ref="mychange" v-if="hackReset" @reload="reloadcom" v-on:backlogin="backLogin"></changePass> -->
				
				
				<div class="content-center">
					<router-view/>
				</div>
		  </main>
	</div>
	
</template>

<script>
	// import changePass from "../components/changePass.vue"
	export default {
		name:"home",
// 		components:{
// 			changePass,
// 		},
		
		data(){
			return{
				nowdate: new Date(),
				hackReset:true,
				activemenu:"1-1",
				value2:0,
				nameslist:["1"]
			
			}
		},
		mounted(){
			var that = this;                    
			that.time = setInterval(function() {
					that.nowdate = new Date();//修改数据date
			}, 1000);
			that.menuList();
			
		},
		computed: {
			 rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
			menuitemClasses () {
					return [
							'menu-item',
							this.isCollapsed ? 'collapsed-menu' : ''
					]
			},
			dataTime() {
			  let nowtime = moment(this.nowdate).format("YYYY-MM-DD HH:mm:ss");
				return nowtime
			},
				
		},
		 methods: {
			 //菜单收起
			 showName(e){
				 
			 },
			 // 修改密码
// 			 change(){
// 				 this.$refs.mychange.changeModel();
// 			 },
			 // 刷新组件
       reloadcom(){
        this.hackReset = false
         this.$nextTick(() => {
            this.hackReset = true
         })
       },
				collapsedSider () {
						this.$refs.side1.toggleCollapse();
				},
				//返回登录
				backLogin(param){
					this.$Modal.success({
						title: '提示',
						content: '密码修改成功，请重新登陆',
						onOk: () => {
							this.$set(this.$store.state,'isgoback',true)
							this.$store.commit('exitUser')
							this.$router.push({name:'login',params:param})
						},
					});
				},
				//退出
				back(){
					this.$Modal.confirm({
						title: ' 提示',
						content: '您确定退出么?',
						onOk: () => {
								this.$set(this.$store.state,'isgoback',true)
								
								var backparam={
									loginForm:this.$store.state.userInfo.loginName,
									newPassword:"",	
								}
								this.$router.push({name:'login',params:backparam}),
								this.$store.commit('exitUser')
						},
						onCancel: () => {
								this.$Message.info('取消退出');
						}
					});
				},
				clearRoutedate(){
					this.$store.state.loadData=[];
					this.$store.state.loading=false;
					//当前时间
					// getnowTime(){
						const startDate = moment().month(moment().month() - 1).startOf('month').valueOf();
						var getmonth=moment(startDate).format("YYYY-MM");
						var saveData={
							monthDate:getmonth,
							dayDate:"",
							weekDate:"",
							otherDate:[],
							showDate:1,
						}
						this.$store.commit('saveDatainfo',saveData)
						this.$store.commit('setOrder',null)
				},
				//点击菜单跳转路由
				routeTo(e){
					let path = this.$route.matched[1].path  
					if(path.indexOf('/source')!=0&&e=="1-1"){
						this.clearRoutedate()
						this.$router.push("/source/source");
					}
					if(path.indexOf('/company_name')!=0&&e=="1-2"){
						this.clearRoutedate()
						this.$router.push("/company_name");
					}
					if(path.indexOf('/use_name')!=0&&e=="1-3"){
						this.clearRoutedate()
						this.$router.push("/use_name");
					}
					if(path.indexOf('/project_name')!=0&&e=="1-4"){
						this.clearRoutedate()
						this.$router.push("/project_name");
					}
					if(path.indexOf('/product_name')!=0&&e=="1-5"){
						this.clearRoutedate()
						this.$router.push("/product_name");
					}
					if(path.indexOf('/sales_name')!=0&&e=="1-6"){
						this.clearRoutedate()
						this.$router.push("/sales_name");
					}
					if(path.indexOf('/activity_name')!=0&&e=="1-7"){
						this.clearRoutedate()
						this.$router.push("/activity_name");
					}
					if(path.indexOf('/supplier_name')!=0&&e=="1-8"){
						this.clearRoutedate()
						this.$router.push("/supplier_name");
					}
					if(path.indexOf('/province_name')!=0&&e=="1-9"){
						this.clearRoutedate()
						this.$router.push("/province_name");
					}
					if(path.indexOf('/daily')!=0&&e=="1-10"){
						this.clearRoutedate()
						this.$router.push("/daily");
					}
					if(path.indexOf('/integration')!=0&&e=="1-11"){
						this.clearRoutedate()
						this.$router.push("/integration");
					}
					if(path.indexOf('/user_name')!=0&&e=="1-12"){
						this.clearRoutedate()
						this.$router.push("/user_name");
					}
					if(path.indexOf('/upload_file/order1')!=0&&e=="2-1"){
						this.clearRoutedate()
						this.$router.push("/upload_file/order1");
					}
					if(path.indexOf('/upload_file/order2')!=0&&e=="2-2"){
						this.clearRoutedate()
						this.$router.push("/upload_file/order2");
					}
					if(path.indexOf('/create-report/create_report')!=0&&e=="3-1"){
						this.clearRoutedate()
						this.$router.push("/create-report/create_report");
					}
					if(path.indexOf('/user-manage/userlist')!=0&&e=="4-1"){
						this.clearRoutedate()
						this.$router.push("/user-manage/userlist");
					}
				},
				//刷新菜单高亮不变
				menuList(){ 
					let path = this.$route.matched[1].path  
					// 获取到地址拦上#号后面的url地址
						if(path.indexOf('/source/source') == 0||path.indexOf('/source/day_report') == 0||path.indexOf('/source/second_source') == 0){
								this.activemenu = "1-1"
							}
							if(path.indexOf('/company_name') == 0){
								this.activemenu = "1-2"
							}
							if(path.indexOf('/use_name') == 0){
								this.activemenu = "1-3"
							}
							if(path.indexOf('/project_name') == 0){
								this.activemenu = "1-4"
							}
							if(path.indexOf('/product_name') == 0){
								this.activemenu = "1-5"
							}
							if(path.indexOf('/sales_name') == 0){
								this.activemenu = "1-6"
							}
							if(path.indexOf('/activity_name') == 0){
								this.activemenu = "1-7"
							}
							if(path.indexOf('/supplier_name') == 0){
								this.activemenu = "1-8"
							}
							if(path.indexOf('/province_name') == 0){
								this.activemenu = "1-9"
							}
							if(path.indexOf('/daily') == 0){
								this.activemenu = "1-10"
							}
							if(path.indexOf('/integration') == 0){
								this.activemenu = "1-11"
							}
							if(path.indexOf('/upload_file/order1') == 0){
								this.activemenu = "2-1"
							}
							if(path.indexOf('/upload_file/order2') == 0){
								this.activemenu = "2-2"
							}
							if(path.indexOf('/create-report/create_report') == 0){
								this.activemenu = "3-1"
							}
							if(path.indexOf('/user-manage/userlist') == 0){
								this.activemenu = "4-1"
							}
							if(path.indexOf('/user_name') == 0){
								this.activemenu = "1-12"
							}
				}								
     }
	}
</script>

<style scoped>
	.home{
		display: flex;
		flex-direction: row;
		flex-basis: auto;
		box-sizing: border-box;
		min-width: 0;
		height:100%;
        
	}
	aside{
		width:200px;
		  background: #4f5a6d;
		 height:100%;
		overflow:hidden;
    overflow-y:auto;
	}
	
aside::-webkit-scrollbar {
    display: none;
}
	main{
		flex: 1;
		background: #f5f7f9;
		height:100%;
		overflow:hidden;
		display: flex;
		flex-direction: column;
		/* z-index: 9000000; */
	}
	header{
		/* height:30px;
		line-height: 30px; */
		box-shadow:0px 0px  2px 2px #aaa;
		padding: 8px 30px;
		background: #fff;

	}
	header>div{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
	}
	.content-center{
		flex: 1;
		overflow:hidden;
		overflow-y:auto;
	}
	.aside-log{
		width:80%;
		
		height:80px;
		background: url('../assets/userLogo.png') no-repeat;
		/* background: #4f5a6d; */
		margin:2px 15%;
	}
	

</style>


</style>

<template>
	
	<div class="home">
		  <aside>
			 <!-- <asidecomp></asidecomp> -->
					
			    <Sider :style="{height: '100vh', overflow: 'auto'}">
						<div class="aside-log"></div>
            <Menu :active-name="activemenu" theme="dark" width="auto" :open-names="['1']" @on-select="routeTo">
							<MenuItem name="2"><Icon type="ios-cloud-upload-outline" />文件导入</MenuItem>
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="md-book" />
                        表报统计
                    </template>
                    <MenuItem name="1-1"><Icon type="ios-chatbubbles-outline" />渠道维度</MenuItem>
                    <MenuItem name="1-2"><Icon type="ios-bug-outline" />分公司维度</MenuItem>
                    <!-- <MenuItem name="1-3"><Icon type="ios-calendar-outline" />应用维度</MenuItem> -->
										<MenuItem name="1-4"><Icon type="ios-calendar-outline" />项目名称维度</MenuItem>
										<MenuItem name="1-5"><Icon type="ios-hammer" />商品名称维度</MenuItem>
										<MenuItem name="1-6"><Icon type="ios-cut-outline" />促销商品名称维度</MenuItem>	
										<MenuItem name="1-7"><Icon type="ios-calendar-outline" />营销活动维度</MenuItem>
										<MenuItem name="1-8"><Icon type="md-closed-captioning" />供应商维度</MenuItem>
										<!-- <MenuItem name="1-9"><Icon type="ios-clipboard-outline" />省份维度</MenuItem> -->
										<!-- <MenuItem name="1-10"><Icon type="ios-cloud-circle-outline" />每日简报</MenuItem> -->
                </Submenu>
							
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
										</DropdownMenu>
								</Dropdown>
						</div>

				  </div>
			  </header>
				
				<div class="content-center">
					<router-view/>
				</div>
			 
		  </main>
			<sliderAd></sliderAd>
				
			
	</div>
	
</template>

<script>
	import getnowtime from "../mixins/nowTime.js"
	import sliderAd from "../components/sliderAd.vue"
	export default {
		name:"home",
		components:{
			sliderAd
		},
		data(){
			return{
				nowdate: new Date(),
				activemenu:"1-1",
				value2:0,
			
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
				var hour = this.nowdate.getHours();
				var year=this.nowdate.getFullYear()
				var hour=hour >= 10 ? '' + hour : '0' + hour
				var minute = this.nowdate.getMinutes();
				var minute=minute >= 10 ? '' + minute : '0' + minute
				var second = this.nowdate.getSeconds();
				var month = this.nowdate.getMonth();
				var date = this.nowdate.getDate();
				var data=date >= 10 ? '' + date : '0' + date
				return year+'-'+(month+1)+"-"+date+"  "+hour+":"+minute
			},
				
		},
		mixins: [getnowtime],
		 methods: {
			 back(){
				  this.$Modal.confirm({
                    title: ' 提示',
                    content: '您确定退出么?',
                    onOk: () => {
											 this.$store.commit('exitUser')
                       this.$router.push('/')
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
              });
			 },
				collapsedSider () {
						this.$refs.side1.toggleCollapse();
				},
				//点击菜单跳转路由
				routeTo(e){
					this.$store.state.loadData=[];
					this.$store.state.loading=false;
					this.getnowTime()
					if(e=="1-1"){
						this.$router.push("/source/source");
					}
					if(e=="1-2"){
						this.$router.push("/company_name");
					}
					if(e=="1-3"){
						this.$router.push("/use_name");
					}
					if(e=="1-4"){
						this.$router.push("/project_name");
					}
					if(e=="1-5"){
						this.$router.push("/product_name");
					}
					if(e=="1-6"){
						this.$router.push("/sales_name");
					}
					if(e=="1-7"){
						this.$router.push("/activity_name");
					}
					if(e=="1-8"){
						this.$router.push("/supplier_name");
					}
					if(e=="1-9"){
						this.$router.push("/province_name");
					}
					if(e=="1-10"){
						this.$router.push("/daily");
					}
					if(e=="2"){
						this.$router.push("/upload_file/file_name");
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
							if(path.indexOf('/upload_file/file_name') == 0){
								this.activemenu = "2"
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

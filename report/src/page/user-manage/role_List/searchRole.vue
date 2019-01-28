<template>
	<div class="searchUsers">

		<Form :model="searchParam" label-position="top"  inline>
			<FormItem label="角色">
				<Input v-model="searchParam.roleName"></Input>
			</FormItem>
			<FormItem >
				<Button style="margin-top: 22px;" type="primary" icon="ios-search" @click="start_Search()">查询</Button>
				<Button  type="primary" @click="handleReset()" style="margin-top: 22px;margin-left: 8px"> 
					<Icon type="ios-arrow-back" />重置
				</Button>
				<Button  type="primary"  @click="addRole" @parReset="addRole"  style="margin-top: 25px;margin-left: 8px">
				<Icon type="md-add" />添加角色
				</Button>
			</FormItem>		
		</Form>
		<addRole ref="childAddrole" v-if="hackReset" @getslist="getlist" @parReset="resetComp"></addRole>		
	</div>
	
</template>

<script>
	import addRole from "./add_role.vue"

	export default {
		name:"searchRole",
		components:{
			addRole
		},
		data(){
			return{
				searchParam:{
					roleName:null,	
				},
				hackReset:true,

			}
		},
		methods:{
			addRole(){
				this.$refs.childAddrole.addModel();
			},
			getlist(){
				debugger
				this.$emit("getrole")
			},
			resetComp(){
				console.log("sss")
				this.hackReset = false
					this.$nextTick(() => {
					this.hackReset = true
				})
			},
			start_Search(){
				if(this.searchParam.roleName==""){
					this.searchParam.roleName=null
				}
				if(this.searchParam.roleName==null){
					return;
				}
// 				if(this.$store.state.userInfo.userType==1){
// 					var param={}
// 				}else{
					var param={
						action:"1"
					}
					if(this.$store.state.userInfo.userType==1){
						var param={}
				}
				var searchParam={
					roleName:this.searchParam.roleName,
				}
				var params=Object.assign(param,searchParam)
				// var params=Object.assign(param,searchParam)
				this.$emit("roleParams",params)
				
				
			},
			handleReset(){
				this.searchParam.loginName=null;
				this.searchParam.name=null;
				this.searchParam.roleName=null;
				this.$emit("paramReset")
			},
		}
	}
</script>

<style>
	.searchUser{
		/* border-bottom: 1px dashed #ccc; */

	}

</style>

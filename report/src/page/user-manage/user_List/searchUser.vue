<template>
	<div class="searchUser">
		<addUser ref="childAdduser" v-if="hackReset" @getList="getpelist" @parReset="resetComp"></addUser>
		<Form :model="searchParam" label-position="top"  inline>
			<FormItem label="用户名">
                 <Input v-model="searchParam.loginName" ></Input>
            </FormItem>
			<FormItem label="姓名">
				<Input v-model="searchParam.name" ></Input>
			</FormItem>
			<FormItem label="角色">
				<Input v-model="searchParam.roleName"></Input>
			</FormItem>
			<FormItem >
				<Button style="margin-top: 22px;" type="primary" icon="ios-search" @click="start_Search()">查询</Button>
				<Button  type="primary" @click="handleReset()" style="margin-top: 22px;margin-left: 8px"> 
				     <Icon type="ios-arrow-back" />重置
				</Button>
				<Button  type="primary" @click="addUser" style="margin-top: 22px;margin-left: 8px">
				<Icon type="md-add" />新增用户
				</Button>
			</FormItem>
			
		</Form>


		
	</div>
	
</template>

<script>
	import addUser from "./add_user.vue"
	export default {
		name:"searchUser",
		components:{
			addUser,
		},
		data(){
			return{
				hackReset:true,
				searchParam:{
					loginName:null,
					name:null,
					roleName:null,
					
				}
			}
		},
		methods:{
			getpelist(){
				this.$emit('getuserlist')
			},
			//
			resetComp(){
				this.hackReset = false
					this.$nextTick(() => {
					this.hackReset = true
				})
			},
			addUser(){
				this.$refs.childAdduser.addModel();
			},
			start_Search(){
				
				if(this.searchParam.loginName==""){
					this.searchParam.loginName=null
				}
				if(this.searchParam.name==""){
					this.searchParam.name=null
				}
				if(this.searchParam.roleName==""){
					this.searchParam.roleName=null
				}
				if(this.searchParam.loginName==null&&this.searchParam.roleName==null&&this.searchParam.name==null){
					return;
				}
				var searchParam={
					loginName:this.searchParam.loginName,
					name:this.searchParam.name,
					roleName:this.searchParam.roleName,
					uuid:this.$store.state.userInfo.uuid
				}
				console.log(searchParam)
				this.$emit("userParams",searchParam)
				
				
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

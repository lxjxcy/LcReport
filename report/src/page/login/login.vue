<template>
	<div class="login  img1 note" :style ="note">
		<div class="backco">
			
			<div class="logopic">
				<img src="../../assets/userLogo.png"/>
			</div>
			<div class="logotext">报表统计管理平台</div>		
		</div>
		<div class="login-con">
			
			<Card icon="log-in" title="欢迎登录" :bordered="false">
				<!--  -->
				<div class="form-con">
					<Form ref="loginForm" :model="loginForm" :rules="rules" @keydown.enter.native="handleSubmit('loginForm')">
						<FormItem prop="loginName">
							<Input v-model="loginForm.loginName" placeholder="请输入用户名">
							<span slot="prepend">
								<Icon :size="16" type="ios-person"></Icon>
							</span>
							</Input>
						</FormItem>
						<FormItem prop="password">
							<Input type="password" v-model="loginForm.password" placeholder="请输入密码">
							<span slot="prepend">
								<Icon :size="14" type="md-lock"></Icon>
							</span>
							</Input>
						</FormItem>
						<FormItem prop="code">
							<Input v-model="loginForm.code" placeholder="请输入验证码" style="width:60%">
							<span slot="prepend">
								<Icon :size="14" type="ios-construct" />
							</span>
							</Input>
							<div class="code" @click="getImg()">
								 <!-- <span v-model="imgUrl" class="check" style="position: absolute;right:0" > -->
									 <img :src="imgUrl" alt="" style="width:100%;height:100%"/>
									<!-- </span> -->
							</div>
						</FormItem>
						<FormItem>
							<Button :loading="loading" @click="handleSubmit('loginForm')" type="primary" long>登录</Button>
						</FormItem>
					</Form>
					<!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
				</div>
			</Card>
		</div>
	</div>
</template>
<script>
import echartLogin from "./echart-login.vue"
import getnowtime from "../../mixins/nowTime.js"
import md5 from 'js-md5';
  import axios from 'axios';
 export default {

	 name:"login",
	 components:{
	 	echartLogin
	 },

	 
	 data(){
		 return {
			 loading:false,
			 focusIndex: 0,
			 imgUrl:"",
			 loginForm: {
				loginName: '',
				password: '',
				code:"",
				
			 },
			  note: {
          backgroundImage: "url(" + require("../../assets/login.jpg") + ") ",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          verticalAlign: "middle",
         backgroundColor:"#fff"
        },
			 rules:{
				  loginName: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
					password: [
						{ required: true, message: '密码不能为空', trigger: 'blur' }
					],
					code: [
						{ required: true, message: '验证码不能为空', trigger: 'blur' }
					],
			 }
			 
		 }
		 
	 },
	 mixins: [getnowtime],
	 mounted(){
		 this.getImg()
		 this.$store.commit('exitUser')
	 },
	methods: {
		 //  获取验证码
				getImg(){
					axios.post("/report/user/getCode").then(res=>{
						// if(res.data.code==0){
							this.imgUrl= `data:image/jpeg;base64,`+res.data.data.base;
							console.log(this.imgUrl)
						// }
						
					})
				},
		//提交
		handleSubmit (loginForm) {	
			var that=this;
			that.$refs[loginForm].validate((valid) => {
				if (valid) {
					that.loading=true;
					
					var loginParam={
						loginName:that.loginForm.loginName,
						password:md5(that.loginForm.password),
						code:that.loginForm.code
					}
					axios.get("/report/user/loginUser",{params:loginParam}).then(res=>{
						that.getImg()
						that.loading=false;
						if(res.data.code==0){
							that.$store.commit('setToken',that.loginForm.loginName)
							that.$store.commit('saveUserinfo',res.data.data)
							that.$router.push('/source/source')
							
						}else{
							that.$Message.error(res.data.message);
							that.getnowTime()
							that.loginForm.code=="";
							
							 
						}	
					})					
				}
			})
		}
	}
       
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.login{
	    width: 100%;
	    height: 100%;
	    position: relative;
		overflow:hidden;
		.backco{
			width:100%;
			height:300px;
			padding: 110px;
			margin-top: 140px;
			// background: #FF0000;
			margin-bottom: 50px;
			color: #FF0000;
			.logopic{
				height:100px;
				width:200px;
				border-right: 2px solid #fff;
				float: left;
				
			}
			.logotext{
				color: #000000;
				font-size: 30px;
				font-weight: 500;
				float: left;
				padding: 20px 50px;
			}
// 			height:1000px;
// 			width: 431px;
// 			background: #384c62;
// 			position: absolute;
// 			right:455px;
// 			top:148px;
// 			-o-transform: rotate(46deg);
// 			-webkit-transform: rotate(46deg);
// 			-moz-transform: rotate(46deg);
// 			filter:progid:DXImageTransform.Microsoft.BasicImage(Rotation=2);
			 
		}
		
	    &-con{
	        position: absolute;
	        right: 160px;
	        top: 50%;
			z-index: 100;
	        transform: translateY(-60%);
	        width: 310px;
	        &-header{
	            font-size: 16px;
	            font-weight: 300;
	            text-align: center;
	            padding: 20px 0;
				
	        }
	        .form-con{
	            padding: 10px 0 0;
	        }
	        .login-tip{
	            font-size: 10px;
	            text-align: center;
	            color: #c3c3c3;
	        }
			.code{
				width:30%;
				height:30px;
				border:1px solid #ccc;
				position: absolute;
				right:0;
				top:2px;
				text-align: center;
			}
			
	    }
		
		
	}

</style>

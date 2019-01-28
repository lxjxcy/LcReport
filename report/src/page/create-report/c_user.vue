<template>
	<div class="c_user">
		<Button  type="primary" :loading="this.$store.state.loading" icon="ios-apps-outline" @click="create()" style="margin-top: 22px;">
			<span v-if="!this.$store.state.loading">生成</span>
			<span v-else>Loading...</span>
		</Button>
		
	</div>
	
</template>

<script>
	export default {
		name:"c_user",
		data(){
			return{
				
			}
		},
		methods:{
			create(){
				this.$store.state.loading=true;
				this.$Spin.show({
					render: (h) => {
						return h('div', [
							h('Icon', {							
								'class': 'demo-spin-icon-load',
								props: {
										type: 'ios-loading',
										size: 18
								},
							}),
							h('div', "报表生成中，请耐心等待，不要刷新或关闭页面"),
						])
					}
				});
				var params={}
				this.$api.runUser(params).then(res=>{
					if(res.code==0){
						this.$store.state.loading=false;
						this.$Spin.hide()
						this.$Modal.info({
								title: '提示',
								content: "用户维度报表生成成功，可前往操作用户维度",
								onOk: () => {
									
								},
						});
						
					}else{
						this.$Message.error(res.message);
					}
					

				})
			}
		}
	}
</script>

<style scoped>
	.c_user{
		height:500px;
		width:100%;
		background: #fff;
		padding:40px 20px;
	}
</style>

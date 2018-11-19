<template>
	<div class="report">
		<Form  label-position="top"  inline>
			<FormItem>
				<Button type="primary" :loading="this.$store.state.loading" icon="ios-download-outline" @click="download()" style="margin-top: 22px;">
					<span v-if="!this.$store.state.loading">导出</span>
					<span v-else>Loading...</span>
				</Button>
			</FormItem>	
		</Form>				
	</div>
</template>

<script>
	export default {
		name:"day_top",
		data(){
			return{
				
			}
		},
		methods:{
			//导出excle表
			download(){
				this.$store.state.loading=true;
				this.$store.state.loadData=[];
				this.$emit("getExcel")
			},
		}
		
	}
</script>

<style>

</style>

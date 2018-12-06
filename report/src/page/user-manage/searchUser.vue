<template>
	<div class="searchUser">
		<Form :model="searchParam" label-position="top"  inline>
			<FormItem label="账户">
                 <Input v-model="searchParam.loginName"></Input>
            </FormItem>
			<FormItem label="姓名">
				<Input v-model="searchParam.name"></Input>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('formValidate')">查询</Button>
				<Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
			</FormItem>
			
		</Form>


		
	</div>
	
</template>

<script>
	export default {
		name:"searchUser",
		data(){
			return{
				searchParam:{
					loginName:null,
					name:null
					
				}
			}
		}
	}
</script>

<style>

</style>

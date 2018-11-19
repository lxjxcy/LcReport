<template>
	<div>
		<Breadcrumb>
			<BreadcrumbItem :to="{path:gobackUrl}">
				<Icon type="md-arrow-back" />返回上一页
			</BreadcrumbItem>
			<BreadcrumbItem>
				<Icon type="ios-cafe"></Icon> {{nowTitel}}
			</BreadcrumbItem>
		</Breadcrumb>
		
	</div>
	
</template>

<script>
	export default {
		name:"goBack",
		props: {
		  gobackUrl: String,
		  nowTitel:String,
		  required: true
		}
		
	}
</script>

<style>

</style>

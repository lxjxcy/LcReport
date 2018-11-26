import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '/',
			name: 'login',
			component: resolve => require(['@/page/login/login'], resolve),
		},
    {
			path: '/source',
			name: 'home',
      meta: {Auth: true},
			component: resolve => require(['@/page/home'], resolve),
			children:[
				//渠道维度
				{
					path:'/source/source',
					name:'order_source',
					meta: {Auth: true},
					component: resolve => require(['@/page/source/order_source'], resolve),
				},
				{
					path:'/source/day_report',
					name:'day_report',
					meta: {Auth: true},
					component: resolve => require(['@/page/source/day_report'], resolve),
				},
				{
					path:'/source/second_source',
					name:'second_source',
					meta: {Auth: true},
					component: resolve => require(['@/page/source/second_source'], resolve),
				},
				
				//分公司维度
				{
					path:'/company_name',
					name:'company_name',
					meta: {Auth: true},
					component: resolve => require(['@/page/branch-company/company_name'], resolve),
				},
				{
					path:'/company_name/company_day',
					name:'company_day',
					meta: {Auth: true},
					component: resolve => require(['@/page/branch-company/company_day'], resolve),
				},
				{
					path:'/company_name/product_detail',
					name:'product_detail',
					meta: {Auth: true},
					component: resolve => require(['@/page/branch-company/product_detail'], resolve),
				},
				//整合方维度
				{
					path:'/integration',
					name:'integration',
					meta: {Auth: true},
					component: resolve => require(['@/page/integration/integration'], resolve),
				},
				{
					path:'/integration/integration_day',
					name:'integration_day',
					meta: {Auth: true},
					component: resolve => require(['@/page/integration/integration_day'], resolve),
				},
				{
					path:'/integration/integration_sec',
					name:'integration_sec',
					meta: {Auth: true},
					component: resolve => require(['@/page/integration/integration_sec'], resolve),
				},
				//每日简报
				{
					path:'/daily',
					name:'daily',
					meta: {Auth: true},
					component: resolve => require(['@/page/daily-briefing/daily'], resolve),
				},
				
				//应用维度
				{
					path:'/use_name',
					name:'use_name',
					meta: {Auth: true},
					component: resolve => require(['@/page/make-use/use_name'], resolve),
				},
				{
					path:'/use_name/use_day',
					name:'use_day',
					meta: {Auth: true},
					component: resolve => require(['@/page/make-use/use_day'], resolve),
				},
				//营销活动
				{
					path:'/activity_name',
					name:'activity_name',
					meta: {Auth: true},
					component: resolve => require(['@/page/market-activity/activity_name'], resolve),
				},
				//商品名称维度
				{
					path:'/product_name',
					name:'product_name',
					meta: {Auth: true},
					component: resolve => require(['@/page/product-name/product_name'], resolve),
				},
				{
					path:'/product_name/product_day',
					name:'product_day',
					meta: {Auth: true},
					component: resolve => require(['@/page/product-name/product_day'], resolve),
				},
				//项目名称维度
				{
					path:'/project_name',
					name:'project_name',
					meta: {Auth: true},
					component: resolve => require(['@/page/project-name/project_name'], resolve),
				},
				{
					path:'/project_name/project_day',
					name:'project_day',
					meta: {Auth: true},
					component: resolve => require(['@/page/project-name/project_day'], resolve),
				},
				//促销商品维度
				{
					path:'/sales_name',
					name:'sales_name',
					meta: {Auth: true},
					component: resolve => require(['@/page/sales-product/sales_name'], resolve),
				},
				{
					path:'/sales_name/sales_day',
					name:'sales_day',
					meta: {Auth: true},
					component: resolve => require(['@/page/sales-product/sales_day'], resolve),
				},
				//供应商维度
				{
					path:'/supplier_name',
					name:'supplier_name',
					meta: {Auth: true},
					component: resolve => require(['@/page/supplier/supplier_name'], resolve),
				},
				{
					path:'/supplier_name/supplier_day',
					name:'supplier_day',
					meta: {Auth: true},
					component: resolve => require(['@/page/supplier/supplier_day'], resolve),
				},
				
				//省份维度
				{
					path:'/province_name',
					name:'province_name',
					meta: {Auth: true},
					component: resolve => require(['@/page/provinces/province_name'], resolve),
				},
				{
					path:'/province_name/province_day',
					name:'province_day',
					meta: {Auth: true},
					component: resolve => require(['@/page/provinces/province_day'], resolve),
				},
				//文件导入
				{
					path:'/upload_file/file_name',
					name:'file_name',
					meta: {Auth: true},
					component: resolve => require(['@/page/upload_file/file_name'], resolve),
				},
				//报表生成
				
				{
					path:'/create-report/create_report',
					name:'create_report',
					meta: {Auth: true},
					component: resolve => require(['@/page/create-report/create_report'], resolve),
				},
				
			]
    }, 
  ]
})

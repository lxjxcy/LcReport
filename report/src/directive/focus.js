import Vue from 'vue'

 Vue.directive('focus', {
  // 当绑定元素插入到DOM中
		inserted: function (el) {
		// 聚焦元素
		el.focus()
		}
  });    





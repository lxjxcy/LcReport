global.baseUrl = 'http://101.37.124.231:8081';
global.sysApi = global.baseUrl + '/sys';

global.formHeader = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'X-Requested-With': 'XMLHttpRequest',
	}
}
global.jsonHeader = {
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
		'X-Requested-With': 'XMLHttpRequest'
	}
}
export default global;
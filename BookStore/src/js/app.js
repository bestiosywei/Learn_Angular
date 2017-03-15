var bookStoreApp = angular.module('bookStoreApp', [
	'ngRoute', 'ngAnimate', 'bookStoreCtrls', 'bookStoreFilters',
	'bookStoreServices', 'bookStoreDirective'
]);


bookStoreApp.config(function($RouteProvide){
	$RouteProvide.when('./hello', {
		templateUrl: 'tpls/hello.html',
		controller: 'helloCtrl'
	}).when('./hello', {
		templateUrl: 'tpls/hello.html',
		controller: 'helloCtrl'
	}).otherwise({
		redirectTo: 'hello'
	})
});
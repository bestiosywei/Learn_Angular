var userInfoModule = angular.module('userInfoModule', []);

// controller
userInfoModule.controller('userInfoCtrl', ['$scope', function($scope){
	$scope.userInfo = {
		email: '674986077@qq.com',
		password: '12345679',
		autoLogin: true
	};

	$scope.getFormData = function(){
		console.log($scope.userInfo);
	};

	$scope.setFormData = function(){
		$scope.userInfo = {
			email: 'w482942942@136.com',
			password: '12345679',
			autoLogin: false
		};
	};

	$scope.resetFormData = function(){
		$scope.userInfo = {
			email: '674986077@qq.com',
			password: '12345679',
			autoLogin: true
		};
	};
}]);
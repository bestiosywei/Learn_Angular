var bookStoreCtrls = angular.module("bookStoreCtrls", []);

// controller
bookStoreCtrls.controller("helloCtrl", ["$scope", function($scope){
	$scope.greeting = {
		text: "hello",
	};

	$scope.pageClass = "hello";

}]);


bookStoreCtrls.controller("bookListCtrl", ["$scope", function($scope){
	$scope.books = [{
		title: "《this is a one》",
		author: "one"
	},
	{
		title: "《this is a two》",
		author: "two"
	},
	{
		title: "《this is a three》",
		author: "three"
	}];

	$scope.pageClass = "list";
}]);
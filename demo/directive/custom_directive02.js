var myApp = angular.module('myApp', []);

//contoller
myApp.controller('someController',['$scope', function($scope){
		$scope.expanders = [{
			title: 'click me to expand',
			text: 'hi there folks, i am content that was hidden but i now shown'
		},{
			title: 'click this',
			text: 'i am even better text than you have seen previously'	
		},{
			title: 'test',
			text: 'test'
		}]
}]);


// 自定义指令
myApp.directive('accordion', function(){
	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		template: '<div ng-transclude></div>',
		// 暴露一些方法
		controller: function() {
			var expanders = [];
			this.gotOpened = function(selectedExpander) {
				angular.forEach(expanders, function(expander){
					if (selectedExpander !=expander) {
						expander.showMe = false;
					}
				});
			};

			this.addExpander = function(expander) {
				expanders.push(expander);
			}
		}
	};
});


// 自定义指令
myApp.directive('expander', function(){
	return {
		restrict: 'EA',
		require: '^?accordion',
		replace: true,
		transclude: true,
		scope: {
			// 等于是双向数据绑定，该模板的title与expander-title绑定
			title:'=expanderTitle'
		},
		template: '<div>'
				+ '<div class="title" ng-click="toggle()">{{title}}</div>'
				+ '<div class="body" ng-show="showMe" ng-transclude></div>'
				+'</div>',
		link: function(scope, element, attrs, accordionCtrl) {
			scope.showMe = false;
			accordionCtrl.addExpander(scope);
			scope.toggle = function() {
				scope.showMe = !scope.showMe;
				accordionCtrl.gotOpened(scope);
			};
		}
	};
});


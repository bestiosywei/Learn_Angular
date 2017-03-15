
//myModule.controller('LoadDataCtrl',['$scope','$http',function($scope,$http){
//myModule.controller('LoadDataCtrl',function($scope,$http){
//这两种写法都是正确的，只是第一种是官方推荐的，
//因为后续代码压缩的时候，第二种方式的代码会失效，
//而第一种不会受影响，希望对各位有用。



var myServiceApp = angular.module("MyServiceApp", []);
//自定义service的封装
//注意，**1）自定义的service不要以$开头，**
myServiceApp.factory('userListService', ['$http',
    function($http) {
//返回了一个对象
        var doRequest = function(username, path) {
//向后台的请求
            return $http({
                method: 'GET',
                url: 'users.json'
            });
        }
        return {
//返回的userList是一个方法，返回上面请求返回的对象，以及传递的两个参数
            userList: function(username) {
                return doRequest(username, 'userList');
            }
        };
    }
]);
//注意，**2）在注入的时候，要放在angular内置service的后面。**
myServiceApp.controller('ServiceController', ['$scope', '$timeout', 'userListService',
    function($scope, $timeout, userListService) {
//在页面中不是按一下就向后台发起请求，因为这样页面会发生抖动，页面会频繁的刷新，一个解决
//思路是在一定的时间段里，你不在按下一个键，才发起请求。所以用到定时器。（连续按键并不会发起请求）
        var timeout;
//$watch方法是监控一个数据模型的变化的，当username发生变化的，执行一个函数
        $scope.$watch('username', function(newUserName) {
//即新输入的username值，存在的话
            if (newUserName) {
//且timeout存在的话
                if (timeout) {
//那么久清除定时
                    $timeout.cancel(timeout);
                }
//把timeout350毫秒后，执行一个函数，那就是向后台发起请求。
                timeout = $timeout(function() {
//userListService这个服务是我们自己写的，即定义的service
                    userListService.userList(newUserName)
                        .success(function(data, status) {
                            $scope.users = data;
                        });
                }, 350);
            }
        });
    }
]);

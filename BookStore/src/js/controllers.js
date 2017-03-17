/**
 * 这里是书籍列表模块
 * @type {[type]}
 */

var booklistModule = angular.module('BookListCtrl', []);
booklistModule.controller('BookListCtrl', ['$scope', '$http', '$state', '$statePara','ui.grid.pagination',
 function($scope, $http, $state, $statePara, ui.grid.pagination){
	



var getPage = function(curPage, pageSize) {
        var firstRow = (curPage - 1) * pageSize;
        $scope.gridOptions.totalItems = mydefalutData.length;
        $scope.gridOptions.data = mydefalutData.slice(firstRow, firstRow + pageSize);
};
getPage(1, $scope.gridOptions.paginationPageSize);
 	

//ui-grid
 $scope.gridOptions = {
    data: 'books',
    columnDefs: [{ field: 'index', 
                   displayName: '序号', 
                   width: '10%', 
                   enableColumnMenu: false,// 是否显示列头部菜单按钮
                   enableHiding: false,
                   suppressRemoveSort: true,
                   enableCellEdit: false // 是否可编辑
                 },
                 { field: "name",
                   displayName: '书名'
             	 },
                { field: "author",
                  displayName: '作者'
            	 },
                { field: "publicTime",
                  displayName: '出版日期'
            	 },
                { field: "price",
                  displayName: '定价',
                  cellFilter: 'currency:"￥"'
            	 },	 
                { field: "bookId",
                  displayName: '操作'
            	 } 	 
                ],
                
    enableSorting: true, //是否排序
    useExternalSorting: false, //是否使用自定义排序规则
    enableGridMenu: true, //是否显示grid 菜单
    showGridFooter: true, //是否显示grid footer
    enableHorizontalScrollbar :  0, //grid水平滚动条是否显示, 0-不显示  1-显示
    enableVerticalScrollbar : 0, //grid垂直滚动条是否显示, 0-不显示  1-显示
    
    //-------- 分页属性 ----------------
    enablePagination: true, //是否分页，默认为true
    enablePaginationControls: true, //使用默认的底部分页
    paginationPageSizes: [10, 15, 20], //每页显示个数可选项
    paginationCurrentPage:1, //当前页码
    paginationPageSize: 10, //每页显示个数
    //paginationTemplate:"<div></div>", //自定义底部分页代码
    totalItems : 0, // 总数量
    useExternalPagination: true,//是否使用分页按钮
    //---------------api---------------------
    onRegisterApi: function(gridApi) {
        $scope.gridApi = gridApi;
        //分页按钮事件
        gridApi.pagination.on.paginationChanged($scope,function(newPage, pageSize) {
              if(getPage) { 
                  getPage(newPage, pageSize); 
               }
        });
        //行选中事件
        $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row,event){
            if(row){
                $scope.testRow = row.entity;
            }
         });
    }
};


}]);
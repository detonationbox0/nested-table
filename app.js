var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.expandable', 'ui.grid.selection', 'ui.grid.pinning'])
  .controller('MainCtrl', MainCtrl);
 
// function MainCtrl() {
//   this.myData = [
//     {
//         firstName: "Cox",
//         lastName: "Carney",
//         company: "Enormo",
//         employed: true
//     },
//     {
//         firstName: "Lorraine",
//         lastName: "Wise",
//         company: "Comveyer",
//         employed: false
//     },
//     {
//         firstName: "Nancy",
//         lastName: "Waters",
//         company: "Fuelton",
//         employed: false
//     }
//   ];
// }

function MainCtrl($http) {
  var vm = this;
 
  vm.gridOptions = {
    expandableRowTemplate: 'expandableRowTemplate.html',
    expandableRowHeight: 150,
    //subGridVariable will be available in subGrid scope
    expandableRowScope: {
      subGridVariable: 'subGridScopeVariable'
    }
  };
 
  vm.gridOptions.columnDefs = [
    { name: 'id' },
    { name: 'name'},
    { name: 'age'},
    { name: 'address.city'}
  ];
 
  $http.get('/nested-table/data/500_complex.json')
    .then(function(response) {
      var data = response.data;
 
      for(i = 0; i < data.length; i++){
        data[i].subGridOptions = {
          columnDefs: [{name: 'Id', field: 'id'}, {name: 'Name', field: 'name'}],
          data: data[i].friends
        };
      }
      vm.gridOptions.data = data;
    });
 
    vm.gridOptions.onRegisterApi = function(gridApi){
      vm.gridApi = gridApi;
    };
 
    vm.expandAllRows = function() {
      vm.gridApi.expandable.expandAllRows();
    };
 
    vm.collapseAllRows = function() {
      vm.gridApi.expandable.collapseAllRows();
    };
 
    vm.toggleExpandAllBtn = function() {
      vm.gridOptions.showExpandAllButton = !vm.gridOptions.showExpandAllButton;
    };
}

app.controller('SecondCtrl', function SecondCtrl($http, $log) {
  var vm = this;

  vm.gridOptions = {
      enableRowSelection: true,
      expandableRowTemplate: 'expandableRowTemplate.html',
      expandableRowHeight: 150
  }

  vm.gridOptions.columnDefs = [
      { name: 'id', pinnedLeft:true },
      { name: 'name'},
      { name: 'age'},
      { name: 'address.city'}
  ];

  $http.get('/nested-table/data/500_complex.json')
      .then(function(response) {
          var data = response.data;

          for(i = 0; i < data.length; i++) {
              data[i].subGridOptions = {
                  columnDefs: [{name: 'Id', field: 'id'}, {name: 'Name', field: 'name'}],
                  data: data[i].friends
              };
          }
          vm.gridOptions.data = data;
      });
});
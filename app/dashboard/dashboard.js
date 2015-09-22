'use strict';
var dashMod = angular.module('OnTheRock.dashboard', ['OnTheRock.ajaxService', 'ngStorage']);
dashMod.controller('DashboardCtrl', ['$scope', 'ajaxRequest', '$q', '$localStorage', '$state',
    function ($scope, ajaxRequest, $localStorage, $q, $state) {

//        if (!$localStorage.user) {
//            $state.go('main.login')
//        }

        $scope.model_title = 'Add';
        $scope.list = {};
        $scope.item = {
            name: '',
            short_code: ''
        };
        $scope.loading = true;
        var ajax = ajaxRequest.send('bu/list');
//        var ajax = ajaxRequest.sendApi('data/list.json');
        ajax.then(function (data) {
            $scope.list = data;
            $scope.loading = false;
        });
        $scope.addItem = function () {
            $scope.buttonShow = true;
            $scope.model_title = 'Add';
            $scope.item = {
                name: '',
                short_code: ''
            };
        };
        $scope.editItem = function (item) {
            $scope.buttonShow = false;
            console.log(item);
            $scope.model_title = 'Edit';
            $scope.item = {
                name: item.name,
                short_code: item.short_code,
                org_level: item.org_level
            };
            $('#myModal').modal({backdrop: true})
        };
        $scope.saveItem = function () {
            var url = 'bu/add';
            var values = {'name': $scope.item.name, 'short_code': $scope.item.short_code, 'org_level': $scope.item.org_level};
            var promise = ajaxRequest.send(url, values, 'POST');
            $('#myModal').modal('hide');
        };
        $scope.page = function () {
        };
        $scope.editRecord = function () {
            if (!$scope.item.short_code || !$scope.item.name || !$scope.item.org_level) {
                alert("pls must fill all the field");
            } else {
                var url = 'bu/update';
                var values = {'name': $scope.item.name, 'short_code': $scope.item.short_code, 'org_level': $scope.item.org_level};
                var promise = ajaxRequest.send(url, values, 'POST');
                $('#myModal').modal('hide');
                console.log("Edit Call");
                $('#myModal').modal('hide');
            }
        }

        $scope.deleteItem = function (items) {
            console.log(items.id);
            var url = 'bu/delete';
            var dataId = items.id;
            var promise = ajaxRequest.send(url, dataId, 'POST');
            console.log("Delete Call");
        }

    }]);
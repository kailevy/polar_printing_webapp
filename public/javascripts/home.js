var app = angular.module('printingpress', []);

app.controller('mainCtrl', function ($scope, $log, imageRetrieve) {
  $scope.imPaths = [];
  imageRetrieve.get().success(function (data) {
    $scope.imPaths = data;
  })
  .error(function (err) {
    $log.error(err);
  });
});

app.factory('imageRetrieve', function($http) {
  return {
    get: function () {
      return $http.get('/images');
    }
  };
});

'use strict';

function MainCtrl($scope, $location) {
  $scope.$watch(() => $location.path(), (path) => {
    this.resource = path.split('/')[1];
  });
};

export default ['$scope', '$location', MainCtrl];

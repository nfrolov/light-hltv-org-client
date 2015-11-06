'use strict';

import angular from 'angular';

function ResourceFactory($resource) {
  return function (url, params, methods) {
    const defaults = {
      update: {method: 'put', isArray: false},
      create: {method: 'post'}
    };

    methods = angular.extend(defaults, methods);

    const resource = $resource(url, params, methods);
    resource.prototype.$save = function () {
      if (this._id) {
        return this.$update();
      } else {
        return this.$create();
      }
    };

    return resource;
  };
};

export default ['$resource', ResourceFactory];

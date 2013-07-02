angular.module('SampleServices', ['ngResource']).
  factory('Sample', function ($resource) {
    return $resource('api/samples/:id', {id: '@_id'}, {update: {method: 'PUT'}});
  });

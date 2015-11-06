'use strict';

function RouteConfig($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      redirectTo: '/players'
    })
    .when('/players', {
      templateUrl: 'players/index.html',
      controller: 'PlayersIndexCtrl',
      controllerAs: 'c'
    })
    .when('/players/new', {
      templateUrl: 'players/new.html',
      controller: 'PlayersEditCtrl',
      controllerAs: 'c'
    })
    .when('/players/:id/edit', {
      templateUrl: 'players/edit.html',
      controller: 'PlayersEditCtrl',
      controllerAs: 'c'
    })
    .when('/teams', {
      templateUrl: 'teams/index.html',
      controller: 'TeamsIndexCtrl',
      controllerAs: 'c'
    })
    .when('/teams/new', {
      templateUrl: 'teams/new.html',
      controller: 'TeamsEditCtrl',
      controllerAs: 'c'
    })
    .when('/teams/:id/edit', {
      templateUrl: 'teams/edit.html',
      controller: 'TeamsEditCtrl',
      controllerAs: 'c'
    })
    .when('/matches', {
      templateUrl: 'matches/index.html',
      controller: 'MatchesIndexCtrl',
      controllerAs: 'c'
    })
    .when('/matches/new', {
      templateUrl: 'matches/new.html',
      controller: 'MatchesEditCtrl',
      controllerAs: 'c'
    })
    .when('/matches/:id/edit', {
      templateUrl: 'matches/edit.html',
      controller: 'MatchesEditCtrl',
      controllerAs: 'c'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}

export default ['$routeProvider', '$locationProvider', RouteConfig];

'use strict';

import angular from 'angular';
import ngResource from 'angular-resource';
import ngRoute from 'angular-route';

import './templates';

import Settings from './settings';
import RouteConfig from './routes';
import ResourceFactory from './factories/resource';
import PlayerFactory from './factories/player';
import TeamFactory from './factories/team';
import MatchFactory from './factories/match';
import MainCtrl from './controllers/main';
import PlayersIndexCtrl from './controllers/players-index';
import PlayersEditCtrl from './controllers/players-edit';
import TeamsIndexCtrl from './controllers/teams-index';
import TeamsEditCtrl from './controllers/teams-edit';
import MatchesIndexCtrl from './controllers/matches-index';
import MatchesEditCtrl from './controllers/matches-edit';

angular.module('app', [ngResource, ngRoute, 'templates'])
  .constant('Settings', Settings)
  .config(RouteConfig)
  .factory('Resource', ResourceFactory)
  .factory('Player', PlayerFactory)
  .factory('Team', TeamFactory)
  .factory('Match', MatchFactory)
  .controller('MainCtrl', MainCtrl)
  .controller('PlayersIndexCtrl', PlayersIndexCtrl)
  .controller('PlayersEditCtrl', PlayersEditCtrl)
  .controller('TeamsIndexCtrl', TeamsIndexCtrl)
  .controller('TeamsEditCtrl', TeamsEditCtrl)
  .controller('MatchesIndexCtrl', MatchesIndexCtrl)
  .controller('MatchesEditCtrl', MatchesEditCtrl);

angular.bootstrap(document, ['app'], {strictDi: true});

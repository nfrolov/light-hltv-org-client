'use strict';

function MatchesEditCtrl($routeParams, $location, Match, Team) {
  const {id} = $routeParams;

  this.loading = true;

  this.teams = Team.query(() => {
    this.loading = !this.match.teams;
  });

  if (id) {
    this.match = Match.get({id}, () => {
      this.loading = !this.teams.length;
      this.match.result = undefined;
      this.match.teams = this.match.teams.map(team => team._id);
    });
  } else {
    this.match = new Match();
    Object.assign(this.match, {
      teams: ['', ''],
      maps: []
    });
  }

  this.newMap = defaultMapObject();

  this.removeMap = (map) => {
    this.match.maps = this.match.maps.filter(m => m !== map);
  };
  this.addNewMap = () => {
    if (!this.newMap.name) {
      return;
    }
    const map = {
      map: this.newMap.name,
      result: normalizeMapResult(this.newMap.result)
    };
    this.match.maps.push(map);
    this.newMap = defaultMapObject();
  };

  this.errors = {};
  this.saving = false;

  this.submit = () => {
    if (!this.validate()) {
      return;
    }

    this.match.maps.forEach((map) => {
      map.result = normalizeMapResult(map.result);
    });

    this.saving = true;
    if (id) {
      this.match.$update(() => {
        this.saving = false;
      });
    } else {
      this.match.$create(() => {
        this.saving = false;
        $location.path('/matches');
      });
    }
  };

  this.validate = () => {
    const match = this.match;
    const errors = this.errors = {};

    if (!match.teams[0]) {
      errors.team0 = true;
    }
    if (!match.teams[1]) {
      errors.team1 = true;
    }

    return Object.keys(errors).length === 0;
  };

  function defaultMapObject() {
    return {name: '', result: []};
  }
  function normalizeMapResult(result) {
    const empty = result.filter(r => r == '').length;
    if (0 == result.length || 2 === empty) {
      return [];
    }
    return [
      result[0] || 0,
      result[1] || 0
    ].map(Number);
  }
}

export default ['$routeParams', '$location', 'Match', 'Team', MatchesEditCtrl];

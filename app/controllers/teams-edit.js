'use strict';

function TeamsEditCtrl($routeParams, $location, Team, Player) {
  const {id} = $routeParams;

  this.loading = true;

  this.players = Player.query(() => {
    this.players.forEach((player) => {
      if (!player.name) {
        player.name = `${player.firstName} '${player.nick}' ${player.lastName}`;
      }
    });
  });

  if (id) {
    this.team = Team.get({id}, () => {
      this.loading = false;
    });
  } else {
    this.loading = false;
    this.team = new Team();
    Object.assign(this.team, {
      players: []
    });
  }

  this.newPlayer = null;

  this.removePlayer = (player) => {
    this.team.players = this.team.players.filter(p => p !== player);
  };
  this.addNewPlayer = () => {
    if (this.newPlayer) {
      this.team.players.push(this.newPlayer);
      this.newPlayer = null;
    }
  };

  this.errors = {};
  this.saving = false;

  this.submit = () => {
    if (!this.validate()) {
      return;
    }

    this.saving = true;
    if (id) {
      this.team.$update(() => {
        this.saving = false;
      });
    } else {
      this.team.$create(() => {
        this.saving = false;
        $location.path('/teams');
      });
    }
  };

  this.validate = () => {
    const team = this.team;
    const errors = this.errors = {};

    if (!team.name) {
      errors.name = true;
    }
    if (!team.country) {
      errors.country = true;
    }

    return Object.keys(errors).length === 0;
  };
}

export default ['$routeParams', '$location', 'Team', 'Player', TeamsEditCtrl];

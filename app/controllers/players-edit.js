'use strict';

function PlayersEditCtrl($routeParams, $location, Player) {
  const {id} = $routeParams;

  this.loading = true;

  if (id) {
    this.player = Player.get({id}, () => {
      this.loading = false;
    });
  } else {
    this.loading = false;
    this.player = new Player();
  }

  this.errors = {};
  this.saving = false;

  this.submit = () => {
    if (!this.validate()) {
      return;
    }

    this.saving = true;
    if (id) {
      this.player.$update(() => {
        this.saving = false;
      });
    } else {
      this.player.$create(() => {
        this.saving = false;
        $location.path('/players');
      });
    }
  };

  this.validate = () => {
    const player = this.player;
    const errors = this.errors = {};

    if (!player.nick) {
      errors.nick = true;
    }
    if (!player.country) {
      errors.country = true;
    }

    return Object.keys(errors).length === 0;
  };
}

export default ['$routeParams', '$location', 'Player', PlayersEditCtrl];

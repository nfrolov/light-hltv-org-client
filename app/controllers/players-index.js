'use strict';

function PlayersIndexCtrl(Player) {
  this.loading = true;
  this.players = Player.query(() => {
    this.loading = false;
  });
  this.delete = (player) => {
    const fullName = `${player.firstName || ''} '${player.nick}' ${player.lastName || ''}`.trim();
    const message = `Delete ${fullName}  (${player._id})?`;
    if (window.confirm(message)) {
      player.$delete(() => {
        this.players = this.players.filter(p => p !== player);
      });
    }
  };
}

export default ['Player', PlayersIndexCtrl];

'use strict';

function TeamsIndexCtrl(Team) {
  this.loading = true;
  this.teams = Team.query(() => {
    this.loading = false;
  });
  this.delete = (team) => {
    const message = `Delete ${team.name}  (${team._id})?`;
    if (window.confirm(message)) {
      team.$delete(() => {
        this.teams = this.teams.filter(t => t !== team);
      });
    }
  };
}

export default ['Team', TeamsIndexCtrl];

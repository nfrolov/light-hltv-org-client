'use strict';

function MatchesIndexCtrl(Match) {
  this.loading = true;
  this.matches = Match.query(() => {
    this.loading = false;
  });
  this.delete = (match) => {
    const matchName = match.teams.map(team => team.name).join(' vs ');
    const message = `Delete ${matchName}  (${match._id})?`;
    if (window.confirm(message)) {
      match.$delete(() => {
        this.matches = this.matches.filter(m => m !== match);
      });
    }
  };
}

export default ['Match', MatchesIndexCtrl];

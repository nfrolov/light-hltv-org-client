'use strict';

function MatchFactory(Resource, Settings) {
  const url = Settings.apiUrl + '/matches/:id';
  return Resource(url, {id: '@_id'});
}

export default ['Resource', 'Settings', MatchFactory];

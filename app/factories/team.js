'use strict';

function TeamFactory(Resource, Settings) {
  const url = Settings.apiUrl + '/teams/:id';
  return Resource(url, {id: '@_id'});
}

export default ['Resource', 'Settings', TeamFactory];

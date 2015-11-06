'use strict';

function PlayerFactory(Resource, Settings) {
  const url = Settings.apiUrl + '/players/:id';
  return Resource(url, {id: '@_id'});
}

export default ['Resource', 'Settings', PlayerFactory];

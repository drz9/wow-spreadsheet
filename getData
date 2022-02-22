function getRaidBosses(instanceID) {
  
  var driveService = getDriveService()
  //instanceID = 1193     # Sanctum of Domination
  var journalInstanceApiURL = 'https://eu.api.blizzard.com/data/wow/journal-instance/'
  var journalInstanceResponse = UrlFetchApp.fetch(journalInstanceApiURL + instanceID + "?locale=en_US", {
    headers: {
      "Authorization": 'Bearer ' + driveService.getAccessToken(),
      "Battlenet-Namespace": 'static-eu'
    }
  })

  var journalInstanceJSONData = journalInstanceResponse.getContentText()
  var json = JSON.parse(journalInstanceJSONData)
  var arrayEncounterNames =  []
  var arrayEncounterIDs = []
  var twoDimensionalArray = []

  for (var i = 0; i < json.encounters.length; i++) {
    arrayEncounterIDs.push(json.encounters[i].id.toString())
    arrayEncounterNames.push(json.encounters[i].name)
  }
  // create 2-dimensional array for both purposes since we need IDs for better API calls but names for Spreadsheet content
  twoDimensionalArray.push(arrayEncounterIDs, arrayEncounterNames)

  return twoDimensionalArray

}

function getItemsByEncounter(encounterID) {
  var driveService = getDriveService()
  var url = 'https://eu.api.blizzard.com/data/wow/journal-encounter/'
  var response = UrlFetchApp.fetch(url + encounterID + "?locale=en_US", {
    headers: {
    "Authorization": 'Bearer ' + driveService.getAccessToken(),
    "Battlenet-Namespace": 'static-eu'
    }
  })

  var json = response.getContentText();
  var data = JSON.parse(json);

  var items = [];
  //var itemIDs = [];
  //var other_options = [ "No need", "Offspec", "Mounts", "Conduits", "Transmog" ]

  for (var i = 0; i < data.items.length; i++) {
    items.push(data.items[i].item.id.toString());
  }
  //items = filterItemsByType(itemIDs);
  //items = items.concat(other_options);
  return items;
}

function getGuildroster(guildname, realmname) {
  
  var driveService = getDriveService()
  var url = UrlFetchApp.fetch('https://eu.api.blizzard.com/data/wow/guild/' + realmname + '/' + guildname + '/roster', {
    headers: {
      "Authorization": 'Bearer ' + driveService.getAccessToken(),
      "Battlenet-Namespace": 'profile-eu'
    }
  });
  var json = url.getContentText()
  var data = JSON.parse(json)
  var array_player_ids = []
  var array_player_names = []
  var array_player_class = []
  var array_guild_rank = []
  var array_of_arrays = []


  for (var i = 0; i < data.members.length; i++) {
    if (data.members[i].rank.toString() <= 3) {
    array_player_ids.push(data.members[i].character.id.toString())
    array_player_names.push(data.members[i].character.name)
    array_guild_rank.push(data.members[i].rank.toString())
    array_player_class.push(data.members[i].character.playable_class.id.toString())
    }
  }

  array_of_arrays.push(array_player_ids, array_player_names, array_player_class, array_guild_rank)
  return array_of_arrays
}

function myFunction() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // get all encounters of Sanctum of Domination Raid (ID = 1193) and write encounterIDs to array
  var sod_encounters_api_url = 'https://eu.api.blizzard.com/data/wow/journal-instance/1193?namespace=static-eu&locale=en_US&access_token=USrzS13sWRh1mrJ67hDy9lCHVTIQgZOVBO';
  var response_sod_encounters = UrlFetchApp.fetch(sod_encounters_api_url);
  var json_response_sod_encounters = response_sod_encounters.getContentText();
  var data_sod_encounters = JSON.parse(json_response_sod_encounters);
  var array_encounter_ids = [];
  var array_encounter_names = [];
  var array_of_arrays = [];
  for (var i = 0; i < data_sod_encounters.encounters.length; i++) {
    array_encounter_ids.push(data_sod_encounters.encounters[i].id.toString());
    array_encounter_names.push(data_sod_encounters.encounters[i].name);
  }
  array_of_arrays.push(array_encounter_ids, array_encounter_names);

  var range_encounter_names = sheet.getRange(1, 2, 1, array_encounter_names.length);
  range_encounter_names.setValues([ array_of_arrays[1] ]);

  for (var i = 0; i < array_encounter_ids.length; i++)  {
    var items = getItemsByEncounter(array_encounter_ids[i]);
    var range = sheet.getRange(2, 2 + i, 1, 1);
    var dropdown = SpreadsheetApp.newDataValidation().requireValueInList(items);
    range.setDataValidation(dropdown);
  }
}

function getItemsByEncounter(encounterID) {
  var url = 'https://eu.api.blizzard.com/data/wow/journal-encounter/'
  + encounterID
  + '?namespace=static-eu&locale=en_US&access_token=USrzS13sWRh1mrJ67hDy9lCHVTIQgZOVBO';
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  var items = [];
  var itemIDs = [];
  var other_options = [ "No need", "Offspec", "Mounts", "Conduits", "Transmog" ]

  for (var i = 0; i < data.items.length; i++) {
    itemIDs.push(data.items[i].item.id.toString());
  }
  items = filterItemsByType(itemIDs);
  items = items.concat(other_options);
  return items;
 }
 
function filterItemsByType(itemlist) {
  var url = 'https://eu.api.blizzard.com/data/wow/item/';
  var token = '?namespace=static-eu&locale=en_US&access_token=USrzS13sWRh1mrJ67hDy9lCHVTIQgZOVBO';
  var itemID;
  var items = [];
  for (var i = 0; i < itemlist.length; i++) {
    itemID = itemlist[i];
    var itemURL = url + itemID + token;
    var response = UrlFetchApp.fetch(itemURL);
    var json = response.getContentText();
    var data = JSON.parse(json);

    if(data.item_class.name === "Armor" || data.item_class.name ==="Weapon"){
      items.push(data.name);
    }
  }
  return items;
}

function getGuildroster() {
  var guildroster_api_url = 'https://eu.api.blizzard.com/data/wow/guild/blackmoore/imprecision/roster?namespace=profile-eu&locale=de_DE&access_token=USdwyf5kopTiQsOPVhKwE3VicyZAGW8PYS';
  var response_guildroster = UrlFetchApp.fetch(guildroster_api_url);
  var json_response_guildroster = response_guildroster.getContentText();
  var data_guildroster = JSON.parse(json_response_guildroster);
  var array_player_ids = [];
  var array_player_names = [];
  var array_player_class = [];
  var array_guild_rank = [];
  var array_of_arrays = [];
  

  for (var i = 0; i < data_guildroster.members.length; i++) {
    if (data_guildroster.members[i].rank.toString() <= 3) {
    array_player_ids.push(data_guildroster.members[i].character.id.toString());
    array_player_names.push(data_guildroster.members[i].character.name);
    array_guild_rank.push(data_guildroster.members[i].rank.toString());
    array_player_class.push(data_guildroster.members[i].character.playable_class.id.toString());
    }
  }
  array_of_arrays.push(array_player_ids , array_player_names, array_player_class, array_guild_rank);

 // ausgabe ?

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range_player_names = sheet.getRange(1, 1, 1, array_player_names.length);
  range_player_names.setValues([ array_of_arrays[1] ]);
  range_player_names.setFontFamily('roboto');
  range_player_names.setFontWeight("bold");
  range_player_names.setFontSize(12);
  
  Logger.log(array_player_names);

}

 // TODO: Item Liste verringern (Conduits/Mounts entfernen und dafür extra Buttons erschaffen: Mounts, Conduits, Transmog, Offspec)

function filterItemsByWeaponType(itemlist) {
  
  var driveService = getDriveService()
  var url = 'https://eu.api.blizzard.com/data/wow/item/'
  var weapons = []
  var weaponsPriest = []
  var weaponsDK = []
  var weaponsDH = []
  var weaponsDruid = []
  var weaponsRogue = []
  var weaponsMage = []
  var weaponsShaman = []
  var weaponsWarrior = []
  var weaponsPaladin = []
  var weaponsHunter = []
  var weaponsMonk = []
  var weaponsWarlock = []


  for (var i = 0; i < itemlist.length; i++) {
    var itemID = itemlist[i]
    var response = UrlFetchApp.fetch(url + itemID + "?locale=en_US", {
    headers: {
      "Authorization": 'Bearer ' + driveService.getAccessToken(),
      "Battlenet-Namespace": 'static-eu'
    }
    })
    var json = response.getContentText()
    var data = JSON.parse(json)

    if(data.item_subclass.id.toString() === "6") {
      weaponsWarrior.push(data.name)
      weaponsShaman.push(data.name)
      weaponsPaladin.push(data.name)
    }    

    if(data.item_class.name === "Weapon"){
      switch(data.item_subclass.id.toString()){
        case "0": // one-handed axe
          weaponsDK.push(data.name)
          weaponsWarrior.push(data.name)
          weaponsHunter.push(data.name)
          weaponsPaladin.push(data.name)
          weaponsShaman.push(data.name)
          weaponsDH.push(data.name)
          weaponsMonk.push(data.name)
          weaponsRogue.push(data.name)
          break

        case "1": // two-handed axes
          weaponsDK.push(data.name)
          weaponsWarrior.push(data.name)
          weaponsHunter.push(data.name)
          weaponsPaladin.push(data.name)
          weaponsShaman.push(data.name)
          break

        case "2": // bows
          //weaponsWarrior.push(data.name)
          weaponsHunter.push(data.name)
          //weaponsRogue.push(data.name)
          break

        case "3": // guns
          //weaponsWarrior.push(data.name)
          weaponsHunter.push(data.name)
          //weaponsRogue.push(data.name)
          break

        case "4": // one-handed mace
          weaponsDK.push(data.name)
          weaponsWarrior.push(data.name)
          weaponsPriest.push(data.name)
          weaponsPaladin.push(data.name)
          weaponsShaman.push(data.name)
          weaponsDruid.push(data.name)
          weaponsMonk.push(data.name)
          weaponsRogue.push(data.name)
          break

        case "5": // two-handed mace
          weaponsDK.push(data.name)
          weaponsDruid.push(data.name)
          weaponsPaladin.push(data.name)
          weaponsShaman.push(data.name)
          weaponsWarrior.push(data.name)
          break

        case "6": // polearm
          weaponsDK.push(data.name)
          weaponsDruid.push(data.name)
          weaponsPaladin.push(data.name)
          weaponsShaman.push(data.name)
          weaponsWarrior.push(data.name)
          break
        
        case "7": // one-handed sword
          weaponsDK.push(data.name)
          weaponsDH.push(data.name)
          weaponsHunter.push(data.name)
          weaponsMage.push(data.name)
          weaponsMonk.push(data.name)
          weaponsPaladin.push(data.name)
          weaponsRogue.push(data.name)
          weaponsWarlock.push(data.name)
          weaponsWarrior.push(data.name)
          break

        case "8": // two-handed sword
          weaponsDK.push(data.name)
          weaponsHunter.push(data.name)
          weaponsWarrior.push(data.name)
          weaponsPaladin.push(data.name)
          break
        
        case "9": // warglaives
          weaponsDH.push(data.name)
          break

        case "10": // staff
          weaponsDruid.push(data.name)
          weaponsHunter.push(data.name)
          weaponsMage.push(data.name)
          weaponsMonk.push(data.name)
          weaponsPriest.push(data.name)
          weaponsShaman.push(data.name)
          weaponsWarlock.push(data.name)
          weaponsWarrior.push(data.name)
          break

        case "11": // bear claws
          break

        case "12": // cat claws
          break

        case "13": // fist weapon
          weaponsDH.push(data.name)
          weaponsDruid.push(data.name)
          weaponsHunter.push(data.name)
          weaponsMonk.push(data.name)
          weaponsRogue.push(data.name)
          weaponsShaman.push(data.name)
          weaponsWarrior.push(data.name)
          break

        case "14": // miscellanous
          break

        case "15": // daggers
          weaponsDruid.push(data.name)
          weaponsHunter.push(data.name)
          weaponsMage.push(data.name)
          weaponsPriest.push(data.name)
          weaponsShaman.push(data.name)
          weaponsWarlock.push(data.name)
          weaponsWarrior.push(data.name)
          weaponsRogue.push(data.name)
          break

        case "16": // thrown
          break

        case "17": // spears
          break

        case "18": // crossbows
          //weaponsWarrior.push(data.name)
          weaponsHunter.push(data.name)
          //weaponsRogue.push(data.name)
          break

        case "19": // wands
          weaponsMage.push(data.name)
          weaponsPriest.push(data.name)
          weaponsWarlock.push(data.name)
          break

        case "20": // fishing pole
          break
      }
    }
  }
  weapons.push(weaponsDH, weaponsDK, weaponsDruid, weaponsHunter, weaponsMage, weaponsMonk, weaponsPaladin, weaponsPriest, weaponsRogue, weaponsShaman, weaponsWarlock, weaponsWarrior)
  return weapons
}

function filterItemsByArmorType(itemlist) {
  
  var driveService = getDriveService()
  var url = 'https://eu.api.blizzard.com/data/wow/item/'
  var items = []
  var itemsCloth = []
  var itemsMail = []
  var itemsPlate = []
  var itemsLeather = []

  for (var i = 0; i < itemlist.length; i++) {
    var itemID = itemlist[i]
    var response = UrlFetchApp.fetch(url + itemID + "?locale=en_US", {
    headers: {
      "Authorization": 'Bearer ' + driveService.getAccessToken(),
      "Battlenet-Namespace": 'static-eu'
    }
    })
    var json = response.getContentText()
    var data = JSON.parse(json)

    if(data.item_class.name === "Armor" ){
      switch(data.item_subclass.name){
        case "Plate":
          itemsPlate.push(data.name)
          break
        case "Mail":
          itemsMail.push(data.name)
          break
        case "Cloth":
          itemsCloth.push(data.name)
          break
        case "Leather":
          itemsLeather.push(data.name)
          break
        case "Miscellaneous":
          itemsPlate.push(data.name)
          itemsMail.push(data.name)
          itemsCloth.push(data.name)
          itemsLeather.push(data.name)
          break
      }
    }
  }
  items.push(itemsCloth, itemsMail, itemsPlate, itemsLeather)
  return items
}
function filterItemsByTierSet(itemlist) {

  //itemlist = ["191014", "191002", "191003", "191021"]

  var driveService = getDriveService()
  var url = 'https://eu.api.blizzard.com/data/wow/item/'
  var tierset = []
  var tiersetPriest = []
  var tiersetDK = []
  var tiersetDH = []
  var tiersetDruid = []
  var tiersetRogue = []
  var tiersetMage = []
  var tiersetShaman = []
  var tiersetWarrior = []
  var tiersetPaladin = []
  var tiersetHunter = []
  var tiersetMonk = []
  var tiersetWarlock = []

  for (var i = 0; i < itemlist.length; i++) {
    var itemID = itemlist[i]
    var response = UrlFetchApp.fetch(url + itemID + "?locale=en_US", {
    headers: {
      "Authorization": 'Bearer ' + driveService.getAccessToken(),
      "Battlenet-Namespace": 'static-eu'
    }
    })
    var json = response.getContentText()
    var data = JSON.parse(json)

    if (data.item_class.name === "Miscellaneous") {
      for(var j = 0; j < 3; j++) {
        switch(data.preview_item.requirements.playable_classes.links[j].id.toString()) {
          case "1":   // Warrior
          tiersetWarrior.push(data.name)
          break

          case "2":   // Paladin
          tiersetPaladin.push(data.name)
          break

          case "3":   // Hunter
          tiersetHunter.push(data.name)
          break

          case "4":     // Rogue
          tiersetRogue.push(data.name)
          break

          case "5":     // Priest
          tiersetPriest.push(data.name)
          break

          case "6":   // Death Knight
          tiersetDK.push(data.name)
          break

          case "7":     // Shaman
          tiersetShaman.push(data.name)
          break

          case "8":     // Mage
          tiersetMage.push(data.name)
          break

          case "9":     // Warlock
          tiersetWarlock.push(data.name)
          break

          case "10":    // Monk
          tiersetMonk.push(data.name)
          break

          case "11":    // Druid
          tiersetDruid.push(data.name)
          break

          case "12":    // Demon Hunter
          tiersetDH.push(data.name)
          break
        }
      
      }
    }
  }
  tierset.push(tiersetDH, tiersetDK, tiersetDruid, tiersetHunter, tiersetMage, tiersetMonk, tiersetPaladin, tiersetPriest, tiersetRogue, tiersetShaman, tiersetWarlock, tiersetWarrior)
  return tierset
}

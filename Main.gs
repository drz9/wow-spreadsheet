
function main(raidID, guildName, guildRealmName) {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  //sheet.setColumnWidths('B', lengthRaidBosses, 190)


  // TODO: parameterize all values for functions, make them generate from user input in HTML
  var raidbosses = getRaidBosses(raidID)
  var lengthRaidBosses = raidbosses[0].length
  var roster = getGuildroster(guildName.toString(), guildRealmName.toString())

  // create list of bosses in 1st row and set background color to grey and font to bold
  var rangeBosses = sheet.getRange(1, 2, 1, raidbosses[1].length)
  rangeBosses.setValues([ raidbosses[1] ])
  //sheet.setColumnWidths('B', lengthRaidBosses, 190)
  formatBosses(rangeBosses)

  var lootPriest = []
  var lootDK = []
  var lootDH = []
  var lootDruid = []
  var lootRogue = []
  var lootMage = []
  var lootShaman = []
  var lootWarrior = []
  var lootPaladin = []
  var lootHunter = []
  var lootMonk = []
  var lootWarlock = []
  var lootMisc = [ "Conduits", "Offspec/Transmog", "Mounts", "No Need" ]

  // create dropdowns per class
  for (var i = 0; i < raidbosses[0].length; i++) {
    var loot = getItemsByEncounter(raidbosses[0][i])
    var armor = filterItemsByArmorType(loot)
    var weapon = filterItemsByWeaponType(loot)
    var tierset = filterItemsByTierSet(loot)

    lootDH.push(armor[3].concat(weapon[0], tierset[0], lootMisc))
    lootDK.push(armor[2].concat(weapon[1], tierset[1], lootMisc))
    lootDruid.push(armor[3].concat(weapon[2], tierset[2], lootMisc))
    lootHunter.push(armor[1].concat(weapon[3], tierset[3], lootMisc))
    lootMage.push(armor[0].concat(weapon[4], tierset[4], lootMisc))
    lootMonk.push(armor[3].concat(weapon[5], tierset[5], lootMisc))
    lootPaladin.push(armor[2].concat(weapon[6], tierset[6], lootMisc))
    lootPriest.push(armor[0].concat(weapon[7], tierset[7], lootMisc))
    lootRogue.push(armor[3].concat(weapon[8], tierset[8], lootMisc))
    lootShaman.push(armor[1].concat(weapon[9], tierset[9], lootMisc))
    lootWarlock.push(armor[0].concat(weapon[10], tierset[10], lootMisc))
    lootWarrior.push(armor[2].concat(weapon[11], tierset[11], lootMisc))
  }

  // create list of raiders in 1st column and set background color matching their playable class
  for (var i = 0; i < roster[1].length; i++) {
    var offset = 3 * i + 2
    var tripleArray = []

    tripleArray.push([ roster[1][i] ], [ "" ], [ "" ])
    
    var rangePlayers = sheet.getRange(offset.toString(), 1, 3, 1)
    rangePlayers.setValues(tripleArray)

    // TODO: move switch case to seperate function to tidy up the main function
    switch (roster[2][i]) {
      case "1":   // Warrior
        formatPlayer(rangePlayers, '#C69B6D')
        formatLoot(lootWarrior, offset, lengthRaidBosses)
        break

      case "2":   // Paladin
        formatPlayer(rangePlayers, '#F48CBA')
        formatLoot(lootPaladin, offset, lengthRaidBosses)
        break

      case "3":   // Hunter
        formatPlayer(rangePlayers, '#AAD372')
        formatLoot(lootHunter, offset, lengthRaidBosses)
        break

      case "4":     // Rogue
        formatPlayer(rangePlayers, '#FFF468')
        formatLoot(lootRogue, offset, lengthRaidBosses)
        break

      case "5":     // Priest
        formatPlayer(rangePlayers, '#ffffff')
        formatLoot(lootPriest, offset, lengthRaidBosses)
        break

      case "6":   // Death Knight
        formatPlayer(rangePlayers, '#C41E3A')
        formatLoot(lootDK, offset, lengthRaidBosses)
        break

      case "7":     // Shaman
        formatPlayer(rangePlayers, '#0070DD')
        formatLoot(lootShaman, offset, lengthRaidBosses)
        break

      case "8":     // Mage
        formatPlayer(rangePlayers, '#3FC7EB')
        formatLoot(lootMage, offset, lengthRaidBosses)
        break

      case "9":     // Warlock
        formatPlayer(rangePlayers, '#8788EE')
        formatLoot(lootWarlock, offset, lengthRaidBosses)
        break

      case "10":    // Monk
        formatPlayer(rangePlayers, '#00FF98')
        formatLoot(lootMonk, offset, lengthRaidBosses)
        break

      case "11":    // Druid
        formatPlayer(rangePlayers, '#FF7C0A')
        formatLoot(lootDruid, offset, lengthRaidBosses)
        break

      case "12":    // Demon Hunter
        formatPlayer(rangePlayers, '#A330C9')
        formatLoot(lootDH, offset, lengthRaidBosses)
        break
    }
  }
}

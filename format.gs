function formatPlayer(range, color) {
  range.setBackground(color)
  range.mergeVertically()
  range.setVerticalAlignment('middle')
  range.setHorizontalAlignment('center')
  range.setFontWeight('bold')
  range.setBorder(true, true, true, true, null, null)
}

function formatBosses(range) {
  range.setBackground('#d3d3d3')
  range.setFontWeight('bold')
  range.setHorizontalAlignment('center')
}

function formatLoot(loot, offset, numRaidBosses) {
  sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  for (var j = 0; j < numRaidBosses; j++) {
    var rangeLoot = sheet.getRange(offset.toString(), 2 + j, 3, 1)
    var dropdownloot = SpreadsheetApp.newDataValidation().requireValueInList(loot[j])
    rangeLoot.setDataValidation(dropdownloot)
    rangeLoot.setBorder(true, null, true, null, null, null)
    }
}

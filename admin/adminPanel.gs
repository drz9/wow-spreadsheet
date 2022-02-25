//@OnlyCurrentDoc
function onOpen() {
 SpreadsheetApp
   .getUi()
   .createMenu("Admin")
   .addItem("Oauth Authorization", "oauthConfiguration")
   .addItem("Create Loot Sheet", "createLootSheet")
   .addToUi();
}

function oauthConfiguration() {
 var widget = HtmlService.createHtmlOutputFromFile('oauthConfiguration.html')
 widget.setTitle('Oauth2 Configration')
 SpreadsheetApp.getUi().showSidebar(widget)
}

function createLootSheet() {
  var widget = HtmlService.createHtmlOutputFromFile('lootSheet.html')
  SpreadsheetApp.getUi().showModalDialog(widget, 'Create Loot Sheet')
}

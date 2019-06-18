function lock() {
  var app=SpreadsheetApp;
  var sheet = app.getActiveSpreadsheet().getSheetByName("MasterSheet");
  last = sheet.getLastRow();
  Logger.log(last);
  
  
}
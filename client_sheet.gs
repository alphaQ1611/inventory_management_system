function lock() {
  var app=SpreadsheetApp;
  var sheet = app.getActiveSpreadsheet().getSheetByName("Sheet1");
  var super_sheet = app.openByUrl("https://docs.google.com/spreadsheets/d/1Rmr7H5P25sUs1xsPskna3hYCVfJhbGlRy_j2CbW_Ga8/edit?usp=sharing").getSheetByName("Astro");
  var last_update = super_sheet.getLastRow();
  var Avals = super_sheet.getRange("K:K").getValues();
  var last_locked = Avals.filter(String).length;

  Logger.log(last_locked);
  Logger.log(last_update);
  
  
}

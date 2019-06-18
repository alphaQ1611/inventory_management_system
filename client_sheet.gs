function lock()
{
  var app=SpreadsheetApp;
  var sheet = app.getActiveSpreadsheet().getSheetByName("Sheet1");
  var super_sheet = app.openByUrl("https://docs.google.com/spreadsheets/d/1Rmr7H5P25sUs1xsPskna3hYCVfJhbGlRy_j2CbW_Ga8/edit?usp=sharing").getSheetByName("Astro");
  var last_update = super_sheet.getLastRow();
  var Avals = super_sheet.getRange("K:K").getValues();
  var last_locked = Avals.filter(String).length+1;

  Logger.log(last_locked);
  Logger.log(last_update);
  if(last_locked<last_update)
  {
    super_sheet.getRange(last_locked+1, 8, last_update-last_locked,3).setValues(sheet.getRange(last_locked+1, 8, last_update-last_locked,3).getValues());
    super_sheet.getRange(last_locked+1, 11, last_update-last_locked).setValue("Done");
  }
  sheet.getRange("H:K").setValues(super_sheet.getRange("H:K").getValues());
}

function onOpen(e)
{
  var app=SpreadsheetApp;
  var sheet = app.getActiveSpreadsheet().getSheetByName("Sheet1");
  var super_sheet = app.openByUrl("https://docs.google.com/spreadsheets/d/1Rmr7H5P25sUs1xsPskna3hYCVfJhbGlRy_j2CbW_Ga8/edit?usp=sharing").getSheetByName("Astro");
  var last_update = super_sheet.getLastRow();
  var Avals = super_sheet.getRange("K:K").getValues();
  var last_locked = Avals.filter(String).length+1;
  var checkboxes = SpreadsheetApp.newDataValidation().requireCheckbox().setAllowInvalid(false).build();
  
  sheet.getRange(last_locked+1,8,last_update-last_locked).setDataValidation(checkboxes).setValue(false);
  sheet.getRange(last_locked+1,9,last_update-last_locked).setValues(sheet.getRange(last_locked+1,6,last_update-last_locked).getValues());
  sheet.getRange(last_locked+1,10,last_update-last_locked).setValues(sheet.getRange(last_locked+1,3,last_update-last_locked).getValues());
}
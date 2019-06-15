function check(e)
{
  var app=SpreadsheetApp;
  var master_sheet = app.getActiveSpreadsheet().getSheetByName("Mastersheet");
  end_line = master_sheet.getLastRow();
  for(var i=3;i<=end_line;i++){
    var cell=master_sheet.getRange(i,13).getValue();
    if(cell>0){
      master_sheet.getRange(i,14).setValue("Available");
    }
    else{
      master_sheet.getRange(i,14).setValue("Not_Available");
    }
  }
}
function fromResponse_2_exhange(app)
{
  var app=SpreadsheetApp;
  var response_sheet = app.getActiveSpreadsheet().getSheetByName("Form_responses");
  var issue_sheet = app.getActiveSpreadsheet().getSheetByName("Issue_records");
  var master_sheet = app.getActiveSpreadsheet().getSheetByName("Mastersheet");
  var last_update_response = response_sheet.getLastRow()-1;
  var last_update_issue = issue_sheet.getRange(issue_sheet.getLastRow(),1).getValue();
  var num_items = 0;
  var items,details,timestamp,email,reason;
  Logger.log(last_update_response);
  Logger.log(last_update_issue);
  for(var j = last_update_issue; j<last_update_response; j++)
  {
    items = response_sheet.getRange(j+2, 6).getValue();
    details = response_sheet.getRange(j+2, 3, 1, 3).getValues();
    timestamp = response_sheet.getRange(j+2, 2).getValue();
    reason = response_sheet.getRange(j+2, 7, 1, 2).getValues();
    email = response_sheet.getRange(j+2, 1).getValue();
    

    var array1 = [{}];
    var string1 = items;
    array1 = string1.split(",");
    Logger.log(details);
    for(var i = 0;i<array1.length;i++)
    {
      issue_sheet.getRange(issue_sheet.getLastRow()+1,2).setValue(array1[i]);
      issue_sheet.getRange(issue_sheet.getLastRow(),3).setValue(checkAvailable(master_sheet,array1[i].toString()));
      issue_sheet.getRange(issue_sheet.getLastRow(),1).setValue(j+1);
      issue_sheet.getRange(issue_sheet.getLastRow(),6).setValue(timestamp);
      issue_sheet.getRange(issue_sheet.getLastRow(),7).setValue(details.toString());
      issue_sheet.getRange(issue_sheet.getLastRow(),8).setValue(email.toString());
      issue_sheet.getRange(issue_sheet.getLastRow(),9).setValue(reason.toString());
    }
  }
}


function checkAvailable(sheet,key)
{
  var avail = false
  ind = search(3,sheet,key)
  Logger.log(ind);
  if(ind != -1)
  {
     if(sheet.getRange(ind, 14).getValue() == "Available")
     {
       avail = true;
     }
  }
  return avail;
}




function search(col,search_sheet,key)
{
  search_range = search_sheet.getRange(2, col, search_sheet.getLastRow()).getValues();
  index = search_range.findIndex(key);
   if(index != -1)
    {
      index = index+2;
    }
  return index;
}

Array.prototype.findIndex = function(search){
  if(search == "") return false;
  for (var i=0; i<this.length; i++)
    if (this[i].toString().indexOf(search) > -1 ) return i;
  return -1;
} 
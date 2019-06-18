function check()
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
function fromResponse_2_exhange()
{
  var app=SpreadsheetApp;
  var response_sheet = app.getActiveSpreadsheet().getSheetByName("Form_responses");
  var issue_sheet = app.getActiveSpreadsheet().getSheetByName("Issue_records");
  var master_sheet = app.getActiveSpreadsheet().getSheetByName("Mastersheet");
  var last_update_response = response_sheet.getLastRow()-1;
  var last_update_issue = issue_sheet.getRange(issue_sheet.getLastRow(),1).getValue();
  var num_items = 0;
  var items,index,details,timestamp,email,reason,isAvailable,duedate,head;
  var checkboxes = SpreadsheetApp.newDataValidation().requireCheckbox().setAllowInvalid(false).build();
  var headnames = master_sheet.getRange(1, 4, 2, 8).getValues();
  var head_sheet = new Array(headnames[0].length);
  for (var i = 0; i<headnames[0].length;i++)
  {   
    head_sheet[i] = app.getActiveSpreadsheet().getSheetByName(headnames[0][i].toString());

  }

  for(var j = last_update_issue; j<last_update_response; j++)
  {
    items = response_sheet.getRange(j+2, 6).getValue();
    details = response_sheet.getRange(j+2, 3, 1, 3).getValues();
    timestamp = response_sheet.getRange(j+2, 2).getValue();
    reason = response_sheet.getRange(j+2, 7, 1, 2).getValues();
    email = response_sheet.getRange(j+2, 1).getValue();
    duedate = response_sheet.getRange(j+2, 9).getValue();
    var array1 = [{}];
    var string1 = items;
    array1 = string1.split(",");
    for(var i = 0;i<array1.length;i++)
    {
      index = checkAvailable(master_sheet,array1[i].toString());
      isAvailable = index>0;
      issue_sheet.appendRow([j+1,array1[i],isAvailable," "," ",timestamp,details.toString(),email.toString(),reason.toString(),duedate])

      if(isAvailable)
      {
        head = master_sheet.getRange(index, 12).getValue();
        issue_sheet.getRange(issue_sheet.getLastRow(),4).setValue(headnames[0][head-1]);
        issue_sheet.getRange(issue_sheet.getLastRow(),5).setValue(headnames[1][head-1]);
        Logger.log(head);
        head_sheet[head-1].appendRow([master_sheet.getRange(index,2).getValue(),array1[i]," ",master_sheet.getRange(index,13).getValue(),details.toString(),reason.toString(),duedate]);
        head_sheet[head-1].getRange(head_sheet[head-1].getLastRow(),8).setDataValidation(checkboxes).setValue(false);
        
      }
    }
  }
}


function checkAvailable(sheet,key)
{
  var avail = -1
  ind = search(3,sheet,key)
  if(ind != -1)
  {
     if(sheet.getRange(ind, 14).getValue() == "Available")
     {
       avail = ind;
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
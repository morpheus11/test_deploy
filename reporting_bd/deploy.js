//name of sheetname for variable SeetName 
var sheetName = 'DP-0201_summary' 
// script properties to variable scriptProp
var scriptProp = PropertiesService.getScriptProperties()
//this function for first start
// function intialSetup () {
//   var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
//   scriptProp.setProperty('key', activeSpreadsheet.getId())
// }

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {


    var doc = SpreadsheetApp.openById(scriptProp.getProperty('keyBD'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {

      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    //***Code only for sendMail Start***//
    var emailAddress = 'incidents@shipsnavo.de'
    var reply = 'handler.navo@gmail.com'
    var nameOfSender = e.parameter.Ship
    var messageSubject = e.parameter.Subject
    var messageHTML = e.parameter.MessageBody
    MailApp.sendEmail ({to:emailAddress, replyTo:reply,name:nameOfSender, subject:messageSubject, htmlBody:messageHTML});
    //***Code only for sendMail END***//
    


    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}

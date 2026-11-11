/**
 * Optional Google Sheets bridge for Bookstock.
 * 1. Open Extensions > Apps Script from your destination Google Sheet.
 * 2. Paste this file, save, then Deploy > New deployment > Web app.
 * 3. Execute as: Me. Who has access: Anyone. Copy the /exec URL into Bookstock settings.
 * Each export appends the Shopify template header (once) and the batch rows.
 */
function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var headers = payload.headers;
    var rows = payload.rows;
    if (!Array.isArray(headers) || !Array.isArray(rows)) throw new Error('Invalid batch');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    } else {
      // Add newly introduced export fields to the end of an existing header row.
      var existingWidth = Math.max(sheet.getLastColumn(), 1);
      var existingHeaders = sheet.getRange(1, 1, 1, existingWidth).getValues()[0];
      var missingHeaders = headers.filter(function(header) { return existingHeaders.indexOf(header) === -1; });
      if (missingHeaders.length) sheet.getRange(1, existingWidth + 1, 1, missingHeaders.length).setValues([missingHeaders]);
    }
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, headers.length).setValues(rows);
    return ContentService.createTextOutput(JSON.stringify({ ok: true, count: rows.length })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}

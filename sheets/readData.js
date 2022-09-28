async function readSheetData(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1e3iP1RpNdtsXnFLnpie9HROIVpd34AwbkbFcDZ3Xm3c",
    range: "keyboards!A2:F",
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }
  rows.forEach((row) => {
    // Print columns A and E, which correspond to indices 0 and 4.
    console.log(`${row[0]}, ${row[4]}`);
  });
}

module.exports = { readSheetData };

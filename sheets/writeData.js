const { google } = require("googleapis");

const writeSheetData = async function (auth, values) {
  const sheets = google.sheets({ version: "v4", auth });
  const sheetName = "keyboards";

  const resource = {
    values,
  };

  await sheets.spreadsheets.values.append(
    {
      spreadsheetId: "1e3iP1RpNdtsXnFLnpie9HROIVpd34AwbkbFcDZ3Xm3c",
      range: `${sheetName}!A2`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: resource,
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          "%d cells updated on range: %s",
          result.data.updates.updatedCells,
          result.data.updates.updatedRange
        );
      }
    }
  );
};

module.exports = { writeSheetData };

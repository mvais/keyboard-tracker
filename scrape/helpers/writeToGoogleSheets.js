const { authorize } = require("../../sheets/authorize.js");
const { writeSheetData } = require("../../sheets/writeData.js");

async function writeToGoogleSheets(keyboardData) {
  const arrayOfKeyboardData = keyboardData.map(function (obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  });

  authorize()
    .then((auth) => {
      writeSheetData(auth, arrayOfKeyboardData);
    })
    .catch(console.error);
}

module.exports = { writeToGoogleSheets };

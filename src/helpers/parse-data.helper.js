const hbs = require("hbs");
const path = require("path");
const fs = require("fs");

module.exports = {
  name: "parseData",
  callback: () => {
    const data = JSON.parse(
      fs.readFileSync(path.resolve("data.json"), "utf-8")
    );
    let res = "";
    Object.keys(data).map((k) => {
      const obj = data[k];
      const objKeys = Object.keys(obj);
      const arr = [];
      let width = 0;
      let rowData = "";
      objKeys.map((ok) => {
        rowData += `<td>${ok}</td>`;
        if (obj[ok].length > width) width = obj[ok].length;
        arr.push(obj[ok]);
      });

      let clients = "";

      for (let j = 0; j < width; j++) {
        let td = "";
        for (let z = 0; z < arr.length; z++) {
          td += `<td>${arr[z][j] ? arr[z][j] : ""}</td>`;
        }
        clients += `<tr>${td}</tr>`;
      }

      res += `<table>
                <thead>
                  <tr>
                    <th colspan="${objKeys.length}">
                      ${k}
                    </th>
                  </tr>
                </thead>
                <tbody>
                    <tr style="font-weight: bold">${rowData}</tr>
                    ${clients}
                </tbody>
              </table>`;
    });
    return new hbs.SafeString(res);
  },
};

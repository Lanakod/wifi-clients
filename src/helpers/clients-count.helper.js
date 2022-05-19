const path = require("path");
const fs = require("fs");

module.exports = {
  name: "clientsCount",
  callback: () => {
    const data = JSON.parse(
      fs.readFileSync(path.resolve("data.json"), "utf-8")
    );
    let count = 0;
    Object.keys(data).map((k) => {
      const obj = data[k];
      const objKeys = Object.keys(obj);
      objKeys.map((ok) => {
        count += obj[ok].length;
      });
    });
    return `Клиенты - ${count}`;
  },
};

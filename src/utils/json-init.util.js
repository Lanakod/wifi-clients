const fs = require("fs");
const path = require("path");

const Init = () => {
  if (!fs.existsSync(path.resolve("data.json"))) {
    const data = {};
    const sample = JSON.parse(
      fs.readFileSync(path.resolve("sample.json"), "utf-8")
    );

    Object.keys(sample).map((k) => {
      let dataValue = {};
      sample[k].map((v) => (dataValue[v] = []));
      data[k] = dataValue;
    });
    fs.writeFileSync(path.resolve("data.json"), JSON.stringify(data));
  } else {
    const data = JSON.parse(
      fs.readFileSync(path.resolve("data.json"), "utf-8")
    );
    const dataKeys = Object.keys(data);
    dataKeys.map((dataKey) => {
      const floor = data[dataKey];
      const floorKeys = Object.keys(floor);
      floorKeys.map((floorKey) => {
        floor[floorKey] = [];
      });
    });
    fs.writeFileSync(path.resolve("data.json"), JSON.stringify(data));
  }
};

module.exports = Init;

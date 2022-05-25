const fs = require("fs"),
  path = require("path"),
  moment = require("moment");
const logger = require("../utils/logger.util");

class DataService {
  static set = (io, deviceName, ssid) => {
    const data = JSON.parse(
      fs.readFileSync(path.resolve("data.json"), "utf-8")
    );
    const dataKeys = Object.keys(data);
    dataKeys.map((dataKey) => {
      const floor = data[dataKey];
      const ssidKeys = Object.keys(floor);
      ssidKeys.map((ssidKey) => {
        const netName = floor[ssidKey];
        const device = netName.find((s) => s === deviceName);
        if (device) {
          const index = netName.indexOf(device);
          if (index > -1) {
            netName.splice(index, 1);
          }
        }
      });
      const newPos = floor[ssid];
      if (newPos) {
        newPos.push(deviceName);
        floor[ssid] = newPos;
      }
    });
    fs.writeFileSync(path.resolve("data.json"), JSON.stringify(data));

    // io.sockets.emit("DATA", data);
    io.sockets.emit("NEW", deviceName, ssid);

    logger(
      `[${moment().format(
        "MM/DD/YYYY - HH:mm:ss"
      )}] - Устройство "${deviceName}" подключилось к сети "${ssid}"\n`
    );

    return {
      message: `Устройство "${deviceName}" подключилось к сети "${ssid}"`,
    };
  };

  static del = (io, deviceName) => {
    let ssid;
    const data = JSON.parse(
      fs.readFileSync(path.resolve("data.json"), "utf-8")
    );
    const dataKeys = Object.keys(data);
    dataKeys.map((dataKey) => {
      const floor = data[dataKey];
      const ssidKeys = Object.keys(floor);
      ssidKeys.map((ssidKey) => {
        const netName = floor[ssidKey];
        const device = netName.find((s) => s === deviceName);
        if (device) {
          ssid = ssidKey;
          const index = netName.indexOf(device);
          if (index > -1) {
            netName.splice(index, 1);
          }
        }
      });
    });
    fs.writeFileSync(path.resolve("data.json"), JSON.stringify(data));

    // io.sockets.emit("DATA", data);
    io.sockets.emit("DEL", deviceName, ssid);

    logger(
      `[${moment().format(
        "MM/DD/YYYY - HH:mm:ss"
      )}] - Устройство "${deviceName}" отключилось от сети ${
        ssid ? `"${ssid}"` : '"Не указано"'
      }\n`
    );

    return {
      message: `Устройство "${deviceName}" отключилось от сети ${
        ssid ? `"${ssid}"` : "Не указано"
      }`,
    };
  };

  static fetch = (io) => {
    io.sockets.emit(
      "DATA",
      JSON.parse(fs.readFileSync(path.resolve("data.json"), "utf-8"))
    );

    return {
      message: `FETCHED`,
    };
  };

  static getData = (io) => {
    const data = JSON.parse(
      fs.readFileSync(path.resolve("data.json"), "utf-8")
    );
    return {
      data,
    };
  };
}

module.exports = DataService;

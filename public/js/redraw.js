const redraw = (ssid, deviceName, add) => {
  const newClients = document.querySelectorAll(".blink-green");
  const oldClients = document.querySelectorAll(".blink-red");

  let gdk, n, i;

  const globalDataKeys = Object.keys(globalData);
  globalDataKeys.map((globalDataKey) => {
    const floor = globalData[globalDataKey];
    const networks = Object.keys(floor);
    networks.map((network) => {
      const clients = floor[network];
      if (add) {
        clients.map((client) => {
          if (client === deviceName) {
            const wtf = globalData[globalDataKey][network];
            const index = wtf.indexOf(deviceName);
            globalData[globalDataKey][network].splice(index, 1);
          }
        });
      }
      if (
        network === ssid &&
        globalData[globalDataKey][network].indexOf(deviceName) === -1
      ) {
        globalData[globalDataKey][network].push(deviceName);
      } else if (network === ssid && !add) {
        const index = globalData[globalDataKey][network].indexOf(deviceName);
        gdk = globalDataKey;
        n = network;
        i = index;
      }
    });
  });

  initTable(globalData);

  const data = document.querySelectorAll("td");
  let match;
  data.forEach((v) => {
    if (v.innerText.includes(deviceName)) match = v;
  });
  if (match) {
    match.classList.add(add ? "blink-green" : "blink-red");
    if (!add) {
      match.classList.remove("blink-green");
      if (gdk && n) {
        const index = globalData[gdk][n].indexOf(deviceName);
        globalData[gdk][n].splice(index, 1);
      }
    }
    setTimeout(() => {
      match.classList.remove(add ? "blink-green" : "blink-red");
      if (!add) {
        initTable(globalData);
        classChecker(document.querySelectorAll("td"), newClients, oldClients);
      }
    }, 5000);
  }

  classChecker(data, newClients, oldClients);
};

const classChecker = (data, newClients, oldClients) => {
  for (let d of data) {
    for (let nc of newClients) {
      if (d.innerText === nc.innerText) {
        d.classList.add("blink-green");
        setTimeout(() => d.classList.remove("blink-green"), 1000);
      }
    }

    for (let oc of oldClients) {
      if (d.innerText === oc.innerText) {
        d.classList.add("blink-red");
        setTimeout(() => d.classList.remove("blink-red"), 1000);
      }
    }
  }
};

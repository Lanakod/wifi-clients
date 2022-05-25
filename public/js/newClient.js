socket.on("NEW", (deviceName, ssid) => {
  // const data = document.querySelectorAll("td");
  // const newClients = document.querySelectorAll(".blink-green");
  // const oldClients = document.querySelectorAll(".blink-red");
  // let match;
  // data.forEach((v) => {
  //   if (v.innerText === deviceName) match = v;
  // });
  redraw(ssid, deviceName, true);
  // if (match) {
  //   match.classList.add("blink-green");
  //   setTimeout(() => match.classList.remove("blink-green"), 5000);
  // }
});

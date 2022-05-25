socket.on("DEL", (deviceName, ssid) => {
  const data = document.querySelectorAll("tbody");
  let match;
  data.forEach((v) => {
    if (v.innerText.includes(ssid)) match = v;
  });
  if (!match) return;
  let matchChildren;
  for (let i of match.children) {
    if (i.innerText.includes(deviceName)) {
      matchChildren = i;
    }
  }

  for (let j of matchChildren.children) {
    if (j.innerText === deviceName) {
      j.classList.remove("blink-green");
      j.classList.add("blink-red");
      setTimeout(async () => {
        await fetch(
          window.location.protocol + "//" + window.location.host + "/fetch"
        );
      }, 5000);
    }
  }
});

socket.on("NEW", (deviceName) => {
  const data = document.querySelectorAll("td");
  let match;
  data.forEach((v) => {
    if (v.innerText === deviceName) match = v;
  });
  if (match) {
    match.classList.add("blink-green");
    setTimeout(() => match.classList.remove("blink-green"), 5000);
  }
});

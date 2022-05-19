socket.on("NEW", (deviceName) => {
  const data = document.querySelectorAll("td");
  let match;
  data.forEach((v) => {
    if (v.innerText === deviceName) match = v;
  });
  if (match) {
    match.classList.add("blink");
    setTimeout(() => match.classList.remove("blink"), 5000);
  }
});

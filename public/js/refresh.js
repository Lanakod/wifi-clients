setInterval(async () => {
  const date = new Date(Date.now());
  if (date.getHours() === 0) {
    const response = await fetch(
      window.location.protocol + "//" + window.location.host + "/getData"
    );
    const { data } = await response.json();
    globalData = data;
    initTable(data);
  }
}, 60 * 1000);

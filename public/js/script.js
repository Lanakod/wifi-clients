const socket = io();
socket.on("DATA", (data) => {
  let res = "";
  let count = 0;
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
      count += obj[ok].length;
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
  document.querySelector(".tables").innerHTML = res;
  document.querySelector("h1").innerHTML = `Клиенты - ${count}`;
});

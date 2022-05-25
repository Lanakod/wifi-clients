const socket = io();
let globalData;

const getData = async () => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + "/getData"
  );
  const { data } = await response.json();
  globalData = data;
  initTable(data);
};
getData();

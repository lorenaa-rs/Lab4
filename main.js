const socket = io();
let servers = [];
const table = document.getElementById("table-servers");

socket.on("info", (data) => {
  servers = data;
  console.log(data);
  console.log(servers);
  let row = table.insertRow(1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  for (let i = 0; i < servers.length; i++) {
    cell1.innerHTML = `<div class="py-3 px-6 text-center">
    <span
      class="bg-indigo-200 text-center text-indigo-600 py-1 px-3 rounded-full text-lg"
      >${servers[i].ip}</span
    ></div>`;

    cell2.innerHTML = ` <div class="py-3 px-6 text-center">
    <span
      class="bg-indigo-200 text-center text-indigo-600 py-1 px-3 rounded-full text-lg"
      >${servers[i].port}</span
    ></div>`;
  }
});

function newInstance() {
  console.log("Instancia");
  socket.emit("instance", true);
}

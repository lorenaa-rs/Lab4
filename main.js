const socket = io();

const newTime = document.getElementById("new-time");
const log = document.getElementById("log");
const table = document.getElementById("table-log");

function changeTime() {
  let values = {
    hours: newTime.value.split(":")[0],
    minutes: newTime.value.split(":")[1],
  };
  console.log(values);
  socket.emit("date", values);
  newTime.value = undefined;
}

const clock_show = document.getElementById("clock-show");

socket.on("date", (data) => {
  let date = new Date(data);
  console.log(date);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  clock_show.innerHTML = `${hours}:${minutes}:${seconds}`;
});

socket.on("info", (data) => {
  console.log(data);
  let actualDate = new Date(data.actualDate);
  let newDate = new Date(data.newDate);
  let row = table.insertRow(1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let actualMinutes =
    (actualDate.getMinutes() < 10 ? "0" : "") + actualDate.getMinutes();
  let newMinutes =
    (newDate.getMinutes() < 10 ? "0" : "") + newDate.getMinutes();

  cell1.innerHTML = `<div class="py-3 px-6 text-center">
  <span
    class="bg-indigo-200 text-center text-indigo-600 py-1 px-3 rounded-full text-lg"
    >${actualDate.getHours()}:${actualMinutes}</span
  ></div>`;

  cell2.innerHTML = ` <div class="py-3 px-6 text-center">
  <span
    class="bg-indigo-200 text-center text-indigo-600 py-1 px-3 rounded-full text-lg"
    >${data.adjust}</span
  ></div>`;

  cell3.innerHTML = `  <div class="py-3 px-6 text-center">
  <span
    class="bg-indigo-200 text-center text-indigo-600 py-1 px-3 rounded-full text-lg"
    >${newDate.getHours()}:${newMinutes}</span
  ></div>`;
});

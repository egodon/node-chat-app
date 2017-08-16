const Mustache = require('mustache');
const io = require('socket.io-client');
const client = io();

import "../css/styles.css";

client.on('connect', () => {
   client.emit('getRooms');
});

client.on('sendRooms', (rooms) => {
    let roomOptions;

    if (rooms.length > 1){
       roomOptions = '<option selected="selected" value="0">Current Rooms</option>';

       rooms.forEach(roomName => {
           roomName = roomName.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
           roomOptions += `<option value="${roomName}">${roomName}</option>`;
       });
   } else {
      roomOptions = '<option selected="selected" value="0">None</option>'
   }


   $('#room-selection').html(roomOptions);
});


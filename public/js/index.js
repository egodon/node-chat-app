const Mustache = require('mustache');
const io = require('socket.io-client');
const client = io();

import '../css/global-styles.css';
import "../css/index-styles.css";

client.on('connect', () => {
   client.emit('getRooms');

   // Check for input text in "Create Room" and disable "Current Rooms" select if needed
    const $createRoomInput = $('#create-room-input');
    const $roomSelect = $('#room-selection');
    $createRoomInput.change( () => {
        if ($createRoomInput.val()){
            $roomSelect.prop('disabled', 'disabled');
            $roomSelect.css('background','#eee');
            $roomSelect.children()[0].selected = 'selected';
        } else{
            $roomSelect.prop('disabled', false);
            $roomSelect.css('background','#ffffff');
        }
    });
});

client.on('sendRooms', (rooms) => {
    let roomOptions;

    if (rooms.length >= 1){
       roomOptions = '<option selected="selected" disabled>- Select Room -</option>';

       rooms.forEach(roomName => {
           roomName = capitalizeFirstLetters(roomName);
           roomOptions += `<option value="${roomName}">${roomName}</option>`;
       });
   } else {
      roomOptions = '<option selected="selected" value="">None</option>'
   }


   $('#room-selection').html(roomOptions);
});




function capitalizeFirstLetters(word){
    return word.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
}

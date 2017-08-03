const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

});

socket.on('disconnect', () => {
    console.log('Disconnected from server')
});

socket.on('newEmail', (email) => {
   console.log(email);
});

socket.on('newMessage', (message) => {
    console.log(message)
});
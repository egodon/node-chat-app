const Mustache = require('mustache');
const io = require('socket.io-client');
const client = io();


client.on('connect', () => {
    const params= jQuery.deparam(window.location.search);

    client.emit('join', params, (err) => {
        if (err){
            alert(err);
            window.location.href = '/'
        } else {
            console.log('No errors');
        }
    });
});

client.on('disconnect', () => {
    console.log('Disconnected from server')
});

client.on('updateUserList', (users) => {
    const ul = $('<ul></ul>');
    users.forEach((user) => {
       ul.append($('<li></li>').text(user));
    });
    $('#users').html(ul);
});

client.on('fillRoomWithMessages', (messages) => {
    const template = $('#message-template').html();
    messages.forEach((message) => {
        const html = Mustache.render(template, {
            from: message.from,
            text: message.text,
            createdAt: message.createdAt
        });

        $('#messages').append(html);
        scrollToBottom();
    })
});

// Admin messages
client.on('adminMessage', (message) => {
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        createdAt: message.createdAt
    });

    $('#messages').append(html);
    scrollToBottom();
});


client.on('newMessage', (message) => {
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: message.createdAt
    });

    $('#messages').append(html);
    scrollToBottom();

});



$('#message-form').on('submit', (e) => {
    e.preventDefault();
    const $messageTextbox = $('[name=message]');
    client.emit('createMessage', {
        text: $messageTextbox.val()
    }, () => {
        $messageTextbox.val('');
    });
});

function scrollToBottom() {
    // Selectors
    const $messages = $('#messages');
    const newMessage = $messages.children('li:last-child');
    // Heights
    const clientHeight = $messages.prop('clientHeight');
    const scrollTop = $messages.prop('scrollTop');
    const scrollHeight = $messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        $messages.scrollTop(scrollHeight);
    }
}


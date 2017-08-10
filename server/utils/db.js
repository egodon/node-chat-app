const {Room, Message} = require('../../models/room');


class Mongo {

    saveRoomToDB (room) {
        Room.findOne({name: room}, (err, theRoomExists) => {
            if (err) {
                return console.log(err);
            }
            if (!theRoomExists) {
                let newRoom = new Room({
                    name: room
                });

                newRoom.save((err) => {
                    if (err) {
                        return console.log(err);
                    } else {
                        console.log('Room added to mongodb');
                    }
                });
            }
        });
    }
    saveMessageToDB (message, room) {
        Room.findOne({name: room}, (err, toThisRoom) => {
            if (err){
                return console.log(err);
            }

            let addThisMessage = new Message({
                from: message.from,
                text:  message.text,
                createdAt:  message.createdAt
            });

            toThisRoom.messages.push(addThisMessage);
            toThisRoom.save((err) => {
                if (err) {
                    return console.log(err);
                }
            });
        });
    }
    getRoomsFromDB () {

    }

    getMessagesFromRoom (fromThisRoom) {

        const query = Room.findOne({name: fromThisRoom});
        return query.exec((err, room) => {
            if (err) {
                return console.log(err)
            }
            if (room) {
                return room.messages
            }
        });
    }
}

module.exports = {Mongo};
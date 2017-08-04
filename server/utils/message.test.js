const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () =>{
        const from = 'Jen';
        const text = 'Some message';
        const message = (generateMessage(from, text));

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
       const from = 'Alec';
       const latitude = '23';
       const longitude = '25';
       const url = 'https://www.google.com/maps?q=23,25';
       const location = (generateLocationMessage(from, latitude, longitude));

       expect(location.createdAt).toBeA('number');
       expect(location).toInclude({from, url});

    });
})
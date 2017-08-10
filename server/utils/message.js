const moment = require('moment');

const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

const generateAdminMessage = (text) => {
    return {
        text,
        createdAt: moment().valueOf()
    }
}

module.exports = {generateMessage, generateAdminMessage};
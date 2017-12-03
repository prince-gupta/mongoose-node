const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Server Name is required.']
    },
    ip: {
        type : String,
        required: [true, 'Server ip is required.'],
        validate : {
            validator : (ip) => ip.length > 6,
            message : 'ip lenght must be equals and greater than 7.'
        }
    },
    isRunning: Boolean
});

const Server = mongoose.model('server', ServerSchema);

module.exports = Server;
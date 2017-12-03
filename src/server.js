const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServerSchema = new Schema({
    name: String,
    ip: String,
    isRunning: Boolean
});

const Server = mongoose.model('server', ServerSchema);

module.exports = Server;
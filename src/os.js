const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OSSchema = new Schema({
    name : {
        type : String,
        required : [true, "Name of OS is missing for server"]
    },
    version : {
        type : String,
        required : [true, "Version of OS is missing for server"]
    }
});

module.exports = OSSchema;
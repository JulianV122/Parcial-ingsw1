const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type:String,
        required: true,
    },
    lastname:  {
        type:String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false
    },
    });

const User = mongoose.model('User', userSchema);
module.exports = User;
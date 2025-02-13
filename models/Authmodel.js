const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    // schema design here.
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        unique:true
    }
});

const user = mongoose.model('login', userSchema);


module.exports = user;

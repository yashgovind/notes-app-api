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
        unique: true,
        maxlength: 8,
        minlength: 4,
        
    }
});

const user = mongoose.model('login', userSchema);


module.exports = user;

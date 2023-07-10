const mongoose = require("mongoose");

const UserModel = mongoose.model("User", {
    name: String,
    email: String,
    password: String,
    address:{
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
});

module.exports = {UserModel}
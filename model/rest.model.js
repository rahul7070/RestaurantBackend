const mongoose = require("mongoose");

const RestaurantModel = mongoose.model("Restaurant", {
    name: String,
    address:{
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu:[
        {
            name:String,
            description:String,
            price: Number,
            image: String,
        },
    ],
});

module.exports = {RestaurantModel}
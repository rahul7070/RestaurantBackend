const mongoose = require("mongoose");
const { UserModel } = require("./user.model");
const { RestaurantModel } = require("./rest.model");

const OrderModel = mongoose.model("Order", {
    user: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: RestaurantModel },
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: {type:String, enum:["placed", "preparing", "on the way", "delivered"], default:"placed"} // e.g, "placed", "preparing", "on the way", "delivered"
});

module.exports = { OrderModel }
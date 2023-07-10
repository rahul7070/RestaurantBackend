const { OrderModel } = require("../model/order.model")



const addOrder = async(req, res)=>{
    try {
        let payload = await OrderModel.create(req.body)
        res.status(201).send(payload)
    } catch (error) {
        res.status(500).json({"msg":"An error occured "})
    }
}


const getOrder= async(req, res)=>{
    try {
        let {id} = req.params
        const orderdata = await OrderModel.findById(id).populate("user").populate("restaurant");
        if(orderdata) res.status(200).json({orderdata})
        else res.status(500).json({"msg":"no order with this id"})
    } catch (error) {
        res.status(500).json({"msg":"An error occured "})
    }
}

const updateOrder = async(req, res)=>{
    try {
        let {id} = req.params
        let {status} = req.body;

        const orderdata = await OrderModel.findByIdAndUpdate(id, {status}, {new:true});

        if(orderdata) res.status(204).send("status changed");
        else res.status(500).json({"msg":"no order with this id"})
    } catch (error) {
        res.status(500).json({"msg":"An error occured "})
    }
}

module.exports = {updateOrder, getOrder, addOrder}
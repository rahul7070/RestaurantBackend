const { RestaurantModel } = require("../model/rest.model");



const add = async(req, res)=>{
    try {
        let payload = new RestaurantModel(req.body);
        await payload.save()
        res.status(200).json({"msg":"added success"})
    } catch (error) {
        res.status(500).json({"msg":"An error occured "})
    }
}

const allrest = async(req, res)=>{
    try {
        const restaurants = await RestaurantModel.find();
        res.status(200).json({restaurants})
    } catch (error) {
        res.status(500).json({"msg":"An error occured "})
    }
}


const singleRest= async(req, res)=>{
    try {
        let {id} = req.params
        const restaurant = await RestaurantModel.findById(id);
        res.status(200).json({restaurant})
    } catch (error) {
        res.status(500).json({"msg":"An error occured "})
    }
}

const getmenu = async(req, res)=>{
    try {
        let {id} = req.params
        const restaurant = await RestaurantModel.findById(id);
        res.status(200).json({menu: restaurant.menu})
    } catch (error) {
        res.status(500).json({"msg":"An error occured "})
    }
}

const addmenu = async(req, res)=>{
    try {
        let {id} = req.params
        let newDish = req.body
        const restaurant = await RestaurantModel.findById(id);

        if(restaurant){
            restaurant.menu.push(newDish);
            await restaurant.save();
            res.status(201).json({"msg":"added new menu"})
        }else{
            res.status(404).json({"msg":"Restraunt not found"})
        }
        
    } catch (error) {
        res.status(500).json({"msg":"An error occured "})
    }
}

const delMenu = async(req, res)=>{
    try {
        let {id, itemid} = req.params
        let newDish = req.body
        const restaurant = await RestaurantModel.findById(id);

        if(restaurant){
            let menuIdx = restaurant.menu.findIndex((el)=>el._id.toString()==itemid);
            if(menuIdx){
                restaurant.menu.splice(menuIdx, 1);
                await restaurant.save();
                res.status(202).json({"msg":"deleted success"})
            }else{
                res.status(500).json({"msg":"no dish available with this id"})
            }
        }else{
            res.status(404).json({"msg":"Restraunt not found"})
        }

    } catch (error) {
        res.status(500).json({"msg":"An error occured "})
    }
}

module.exports = {allrest, add, singleRest, getmenu, addmenu, delMenu}
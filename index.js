const express = require("express");
const connection = require("./db");
const { userRouter } = require("./routes/user.route");
const { restRouter } = require("./routes/rest.route");
const { orderRouter } = require("./routes/order.route");

const app = express();
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("hello")
})

app.use("/api", userRouter)
app.use("/api", restRouter)
app.use("/api", orderRouter)

app.listen(8080, ()=>{
    try {
        connection;
        console.log("connection established at 8080")
    } catch (error) {
        console.log(error)
    }
})


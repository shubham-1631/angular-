const product = require("./model/product")
const user = require("./model/user")
const mongoose = require("mongoose")
const express = require("express")
const body = require("body-parser")
const bodyParser = require("body-parser")
const userRouter = require("./routes/UserRoutes")
const atlasurl = "mongodb+srv://wt-project:sp1234@cluster0.ts1oc.mongodb.net/Bakery";
const dotenv = require('dotenv')
const Categoryroute = require("./routes/CategoryRoutes")
const Orderroute = require("./routes/OrderRoutes")
const Cartroute = require("./routes/CartRoutes")
const Productroute = require("./routes/ProductRoutes")
const Wishlistroute = require("./routes/wishlistRoutes")
const Reviewroute = require("./routes/ReviewRoute")
dotenv.config()

mongoose.connect(atlasurl, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 }).then(() => {
    console.log("connect to db server");

    const app = express();

    app.use(bodyParser.json());

    app.use("/user", userRouter)

    app.use("/Category",Categoryroute)

    app.use("/Order",Orderroute)

    app.use("/Cart",Cartroute)

    app.use("/Product",Productroute)

    app.use("/Review",Reviewroute)

    app.use("/Wishlist",Wishlistroute)

    app.get('/', async(req, res)=>{
        
        res.send(await user.find())
    })

    app.listen(3000, () => {
        console.log("server started at 3000 port");
    })
})
const product = require("./model/product")
const user = require("./model/user")
const mongoose = require("mongoose")
const express = require("express")
const body = require("body-parser")
const cors = require("cors")
const bodyParser = require("body-parser")
const userRouter = require("./routes/UserRoutes")
const atlasurl = "mongodb+srv://wt-project:sp1234@cluster0.ts1oc.mongodb.net/Bakery";
const dotenv = require('dotenv')
const Categoryroute = require("./routes/CategoryRoutes.js")
const Orderroute = require("./routes/OrderRoutes")
const Cartroute = require("./routes/CartRoutes")
const Productroute = require("./routes/ProductRoutes")
const Wishlistroute = require("./routes/wishlistRoutes")
const Reviewroute = require("./routes/ReviewRoute")
dotenv.config()

const app = express();

app.use(cors());
app.use(cors({ origin: 'http://localhost:4200/' }));


mongoose.connect(atlasurl).then(() => {
    console.log("connect to db server");

    const app = express();

    app.use(express.json());

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
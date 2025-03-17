const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const dbUrl = "mongodb+srv://wt-project:sp1234@cluster0.ts1oc.mongodb.net/React"
const userRoute = require('./routes/UserRoutes');
const cartRoute = require('./routes/CartRoute');
const productRoute = require('./routes/ProductRoute');
const orderRoute = require('./routes/OrderRoute');
const wishlistRoute = require('./routes/WishlistRoute');
const categoryRoute = require('./routes/CategoryRoutes');
const subCategoriesRoute = require('./routes/SubCategoryRoute');
const brandRoute = require('./routes/BrandRoute');
const bodyParser = require('body-parser');

// console.log(process.env);
mongoose.connect(dbUrl).then(()=>{
    console.log("Connected to MongoDB");

    const app = express();

    app.use(bodyParser.json());
    // app.use(cors());

    app.use('/users',userRoute);
    app.use('/cart', cartRoute);
    app.use('/products', productRoute);
    app.use('/orders', orderRoute);
    app.use('/wishlist', wishlistRoute);
    app.use('/category', categoryRoute);
    app.use('/subCategory', subCategoriesRoute);
    app.use('/brand', brandRoute);

    app.listen(process.env.PORT, ()=>{
        console.log("Server Started")
    });

    // app.use('/api/category', CategoryRoute);

});
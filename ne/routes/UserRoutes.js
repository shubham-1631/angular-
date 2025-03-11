const express = require('express');
const userRouter = express.Router();
const Users = require("../model/user")

userRouter.get('/', async (req, res) => {
    const data = await Users.find();
    res.send(data);
})



userRouter.get('/getbyid/:id', async (req, res) => {
    const data = await Users.findById(req.params.id);
    if (data) {
        res.send(data);
    }
    else {
        res.send("invalid id");
    }
});

userRouter.post('/add', async (req, res) => {
    try {
        const data = await Users.create(req.body);
        if (req.body.name && req.body.email && req.body.password && req.body.address) {
            res.send(data);
        }
    }
    catch (error) {
        res.send(error.message)
    }
});

// userRouter.patch('/update/:id', async (req, res) => {
//     try {
//         const data = await Users.findByIdAndUpdate(req.params.id, req.body);
//         if ((req.body.name && req.body.email && req.body.password && req.body.address) && req.params.id) {
//             res.send(data);

//         }
//         res.send(data)
//     }
//     catch (error) {
//         res.send(error.message)
//     }
// })

userRouter.patch('/update/:id', async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        // Validate required fields
        if (name && email && password && address && Array.isArray(address) && address.length === 0) {
            return res.status(400).json({ error: "All fields (name, email, password, address) are required." });
        }

        // Validate address structure
        if(address){

            for (let addr of address) {
                if (addr.street && addr.city && addr.state && addr.postal_code) {
                    return res.status(400).json({ error: "Each address must contain street, city, state, and postal_code." });
                }
            }
        }
            
        // Find and update the user
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.delete('/delete/:id', async (req, res) => {
    try {
        const data = await Users.findByIdAndDelete(req.params.id);
        if (!data) return res.send("No data found!");
        res.send(data);
    }
    catch (error) {
        res.send(error.message);
    }
});
//login api
userRouter.post('/login', async (req, res) => {
    const data = await Users.findOne({
        name: req.body.name,
        password: req.body.password
    });

    if (data) {
        var token = jwt.sign({ ...data }, process.env.jwtSecret);
        const ans = {
            isValid: true,
            msg: "Welcome",
            token: token
        };

        res.send(ans);
    }
    else {
        const data = {
            isValid: false,
            msg: "name/password does not match"
        };
        res.send(data);
    }

})

module.exports = userRouter;


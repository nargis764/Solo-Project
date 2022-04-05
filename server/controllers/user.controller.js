const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register: (req,res) => {
        const user = new User(req.body);

        user.save()
            .then((newUser) => {
                console.log(newUser)
                console.log("Successfully registered");
                res.json({
                    successMessage:"Thank you for registering",
                    user: newUser
                })
            })
            .catch((err) => {
                console.log("Registration not successful");
                res.status(400).json(err)
            })
    }
}


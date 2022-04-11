const Trip = require("../models/trip.model")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken");

module.exports = {
    createTrip: (req,res) => {
        const newTripObject = new Trip(req.body);
        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete:true
        })

        newTripObject.postedBy = decodedJWT.payload.id;

        newTripObject.save()
            .then((newTrip) => {
                console.log(newTrip)
                res.json(newTrip)
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    getAllTrips: (req,res) => {
        Trip.find().sort({"postedAt":-1})
        .populate("postedBy", "username email")
        .then((allTrips) => {
            console.log(allTrips);
            res.json(allTrips)
        })
        .catch((err) => console.log(err))
    },
    
    getOneTrip: (req,res) => {
        Trip.findById({_id:req.params.id})        
            .then((oneTrip) => {
                console.log(oneTrip)
                res.json(oneTrip)
            })
            .catch((err) => console.log(err))
    },
    
    deleteOneTrip: (req,res) => {
        Trip.deleteOne({_id:req.params.id})
            .then((deletedTrip) => {
                console.log(deletedTrip)
                res.json(deletedTrip)
            })
            .catch((err) => console.log(err))
    },

    updateTrip: (req,res) => {
        Trip.updateOne({_id:req.params.id},req.body,{new:true,runValidators:true})
            .then((updateTrip) => {
                console.log(updateTrip)
                res.json(updateTrip)
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    findAllTripsByUser: (req,res) => {
        if (req.jwtpayload.username !== req.params.username) {
            console.log("not the user")
            User.findOne({username: req.params.username})
            .then((userNotLoggedIn) => {
                Trip.find({postedBy: userNotLoggedIn._id})
                .populate("postedBy", "username")
                .then((allTripsByUser) => {
                    console.log(allTripsByUser)
                    res.json(allTripsByUser)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(400).json(err)
                })
            })
            .catch((err) => {
                    console.log(err)
                    res.status(400).json(err)
            })
        }

        else {
            console.log("current user")
            console.log("req.jwtpayload.id:", req.jwtpayload.id);
            Trip.find({postedBy:req.jwtpayload.id})
            .populate("postedBy", "username email")
            .then((allTripsByLoggedInUser) => {
                console.log(allTripsByLoggedInUser)
                res.json(allTripsByLoggedInUser)
            })
            .catch((err) => {
                    console.log(err)
                    res.status(400).json(err)
            })
        }
    }

}
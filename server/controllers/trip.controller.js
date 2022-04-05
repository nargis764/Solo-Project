const Trip = require("../models/trip.model")

module.exports = {
    createTrip: (req,res) => {
        Trip.create(req.body)
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
        Trip.find()
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
    }
}
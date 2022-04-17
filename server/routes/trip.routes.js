const TripController = require("../controllers/trip.controller");

const {authenticate} = require("../config/jwt.config")

module.exports = (app) => {
    app.post("/api/trips", authenticate, TripController.createTrip);
    app.get("/api/trips", TripController.getAllTrips);
    app.get("/api/trips/:id", TripController.getOneTrip);
    app.get("/api/tripsbyuser/:username", authenticate, TripController.findAllTripsByUser);     
    app.delete("/api/trips/:id", TripController.deleteOneTrip);
    app.put("/api/trips/:id", TripController.updateTrip);  
    app.put("/api/comment", authenticate, TripController.createComment);   
}
const TripController = require("../controllers/trip.controller");

module.exports = (app) => {
    app.post("/api/trips", TripController.createTrip);
    app.get("/api/trips", TripController.getAllTrips);
    app.get("/api/trips/:id", TripController.getOneTrip); 
    app.delete("/api/trips/:id", TripController.deleteOneTrip);
    app.put("/api/trips/:id", TripController.updateTrip);    
}
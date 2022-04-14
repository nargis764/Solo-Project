const mongoose = require("mongoose")

const TripSchema = new mongoose.Schema({
    title: {
        type:String, 
        required: [true, "Must enter title"]
        },

    description: {
        type: String, 
        required: [true, "Must enter description"]
        },

    location: {
        type: String, 
        required:[true, "Must enter location"]
        },

    selectedFile: {
        type:String,
        required:[true, "Must upload image"]
        },

    postedAt:{
        type:Date,
        default: new Date().toLocaleString('en-US')
        },

    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }    
}, {timestamps:true})

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;

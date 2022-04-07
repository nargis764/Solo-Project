const mongoose = require("mongoose")

const TripSchema = new mongoose.Schema({
    title: {type:String, required: true},
    description: {type: String, required: true},
    location: {type: String, required:true},
    selectedFile: {type:String},
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

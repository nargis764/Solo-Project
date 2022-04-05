const mongoose = require("mongoose");

const tripDB = "tripDB";

mongoose.connect(`mongodb://localhost/${tripDB}`, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=> console.log("Established a connection to the database"))
.catch(err => console.log(err))
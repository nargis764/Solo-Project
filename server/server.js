require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");

const app = express();


app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({limit:"50mb", extended:true, parameterLimit: 50000 }));
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(cookieParser());

require("./config/mongoose.config")
require("./routes/trip.routes")(app)

app.listen(process.env.MY_PORT, () => console.log(`You are connected to port ${process.env.MY_PORT}`))
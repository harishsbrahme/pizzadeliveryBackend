const express = require("express")
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();
const app = express();
const allRoutes = require('./routes/index.route.js');


// 2. Enable CORS with wildcard (*)
// This allows all origins, methods, and headers
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

app.use('/api', allRoutes);

app.listen(5000,()=>{console.log("Server Running on port 5000");
 })

app.get("/",(req,res)=>{
    res.send("Welcome")
});

const connectdb = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected");
        
    } catch (error) {
        console.log("dbconnectionerror=>",error);
        
    }
}
connectdb();
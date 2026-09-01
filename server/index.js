import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
mongoose.connect(process.env.url).then(() => {
    console.log("Mongo DB Connected")
}).catch((err) => {
    console.log(err)
})

const app = express();
const port = 2430;

app.get('/', (req,res)=>{
    res.send("Hello public")
})

app.listen(port, () => {
    console.log('Server is started at 2430')
})

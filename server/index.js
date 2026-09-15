import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import cors from 'cors';
dotenv.config()

const app = express();

//we were making request from client side but server is not accepting that reqest from other domain so we user cors
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()) // when you get coockies from the user side , it will access those cookies cuz you cant access thaose coockies by default 

mongoose.connect(process.env.url).then(() => {
    console.log("Mongo DB Connected")
}).catch((err) => {
    console.log(err)
})

const port = process.env.PORT || 2430;
app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.send("Hello public")
})

app.listen(port, () => {
    console.log(`Server is started at ${port}`)
})


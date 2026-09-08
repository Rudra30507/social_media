import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

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


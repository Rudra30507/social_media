import bcrypt from "bcrypt" // to secure out password through hashing
// register controllers 
import User from "../models/user.model.js";
import genToken from "../utils/generateTokens.js";

const coockiesOptions = {
    httpOnly : true
}

export const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length <= 6) {
            return res.status(400).json({ message: "Password should be grater than 6 character" })
        }

        const userExists = await User.findOne({ username })
        const emailExists = await User.findOne({ email })

        if (userExists) {
            return res.status(409).json({ message: "User already exists" })
        }
        if (emailExists) {
            return res.status(409).json({ message: "Email already exists" })
        }
        //salt is a random string that is added to the password before hashing
        const salt = await bcrypt.genSalt(10)

        console.log(salt)

        //hashing
        const hashedPassword = await bcrypt.hash(password, salt)

        console.log(hashedPassword)
        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        })
        //token
        const token = genToken(newUser._id)

        //storing tokens inside coockies
        res.cookie('token' , token , coockiesOptions)

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email
            }
        })

    }
    catch (err) {
        res.status(500).json({ message: 'server crashed', error: err.message })
    }
}

//login user 

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const PasswordValid = await bcrypt.compare(password, user.password)

        if (!PasswordValid) {
            return res.status(401).json({ message: "Invalid password" })
        }

        //token
        const token = genToken(user._id)

        //storing tokens inside coockies
        res.cookie('token', token, coockiesOptions)

        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        })

    }

    catch (err) {
        res.status(500).json({ message: 'server crashed', error: err.message })
    }
}

// get current user profile
export const getProfile = async (req, res) => {
    try {
        return res.status(200).json({ user: req.user })
    }
    catch (err) {
        res.status(500).json({ message: 'server crashed', error: err.message })
    }
}
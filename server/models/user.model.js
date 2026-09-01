import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
    },

    profileImage: {
        type: String,
    },

    followers: [],
    following: [],

    bio: {
        type: String,
    },

    post: [],
    stories: [],
    reels: [],

    isVerified: {
        type: Boolean,
        default: false,
    },

})

const User = mongoose.model('User', userSchema)

export default User
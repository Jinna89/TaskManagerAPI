import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    mobile:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
    },
    otp: {
        type: String,
        default: 0,
    }
},
{
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("users", userSchema);
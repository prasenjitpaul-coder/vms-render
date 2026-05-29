import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email"
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        select: false
    },
    role: {
        type: String,
        enum: ["admin", "employee", "security"],
        default: "employee",
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verifiedexp: {
        type: Date,
    },

}, { timestamps: true, });

export default mongoose.model("user", UserSchema);

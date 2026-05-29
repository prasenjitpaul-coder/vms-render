import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
    visitorname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email"
        ],
    },
    purpose: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verifiedexp: {
        type: Date,
    }, photo: {
        type: String,
        required: true,

    }

}, { timestamps: true });

export default mongoose.model("visitor",VisitorSchema);
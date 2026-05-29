import mongoose, { model, Types } from "mongoose";

const Schema = mongoose.Schema;
const AppointmentSchema = new Schema({
    visitor: {
        type: Schema.Types.ObjectId,
        ref: "visitor",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    purpose: {
        type: String,
        trim: true,
        required: true
    },
    status:{
        type: String,
        enum: ["pending","approved","rejected"],
        default:"pending"
    }
},{timestamps:true})

export default mongoose.model("appointment",AppointmentSchema);
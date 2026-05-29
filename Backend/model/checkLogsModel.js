import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CheckLogsSchema = new Schema({
    security: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    visitor: {
        type: Schema.Types.ObjectId,
        ref: "visitor",
        required: true
    },
    appointment: {
        type: Schema.Types.ObjectId,
        ref: "appointment",
        required: true,
    },
    pass: {
        type: Schema.Types.ObjectId,
        ref: "passes",
        required: true,
    },
    gate: {
        type: String,
        enum: ["Back Gate", "Front Gate"],
        default: "Front Gate"
    },
    enterTime: {
        type: Date,

    },
    exitTime: {
        type: Date
    }
},{timestamps:true});

export default mongoose.model("checklog",CheckLogsSchema);
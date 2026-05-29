import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PassesSchema = new Schema({
    visitor: {
        type: Schema.Types.ObjectId,
        ref: "visitor",
        required: true
    },
    appointment: {
        type: Schema.Types.ObjectId,
        ref: "appointment",
        required: true
    },
    issuedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    passnumber:{
        type: String,
        unique: true,
        required:true
    },
    qrCode:{
        type: String
    },
    validFrom:{
        type: Date,
        required: true,
    },
     validTill:{
        type: Date,
        required: true,
     },
     statuts:{
        type:String,
        enum: ["active", "expired"],
        default: "active"
     },
},{timestamps:true});

export default mongoose.model("passes",PassesSchema);
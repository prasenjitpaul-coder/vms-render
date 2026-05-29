import appointmentModel from "../model/appointmentModel.js";
import userModel from "../model/userModel.js";
import visitorModel from "../model/visitorModel.js";

export const appointmentVisitor = async (req, res) => {
    try {
        const { status } = req.body;
        const { visitorId } = req.body;
        const Visitor = await visitorModel.findById(visitorId);
        if (!Visitor) {
            return res.status(400).json({ status: false, message: "No Visitor Found" })
        }
        const User = await userModel.findById(req.user.id);
        if (!User) {
            return res.status(400).json({ status: false, message: "Something Went Wrong" })
        }
        await appointmentModel.create({
            purpose: Visitor.purpose,
            visitor: Visitor._id,
            user: User._id,
            status
        })
        res.status(201).json({ status: true, message: "Appointment Created" })
    } catch (error) {
        return res.status(500).json({ status: false, message: error })
    }
}
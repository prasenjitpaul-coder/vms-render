import visitorModel from "../model/visitorModel.js";

export const visitor = async (req, res) => {
    try {

        const { visitorname, email, purpose, } = req.body;

        if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Photo is required"
            });
        }
        
        const photo = req.file.path;
        if (!visitorname || !email || !purpose) {
            return res.status(400).json({ status: false, message: "All Fields Are Needed" });
        }
        const visitor = await visitorModel.findOne({ email });
        if (visitor) {
            return res.status(401).json({ status: false, message: "Already Visitor Exist" });
        }
        await visitorModel.create({
            visitorname,
            email,
            photo,
            purpose

        });
        res.status(201).json({
            status: true, message: "Visitor Created"
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Something Went wrong" })
    }
}
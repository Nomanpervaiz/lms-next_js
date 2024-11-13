import mongoose from "mongoose";
import { UserModel } from "./UserModel";

const {Schema} = mongoose

const applicationSchema  = new Schema(
    {
        course: { type: mongoose.Types.ObjectId, ref: "Course" },
        batch: { type: mongoose.Types.ObjectId, ref: "Batch" },
        addmission: { type: mongoose.Types.ObjectId, ref: "Addmission" },
        user: { type: mongoose.Types.ObjectId, ref: "Users" },
        info : {
            CNIC : String,
            DOB : String,
            email : String
        },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "enrolled", "rejected"],
          },
   
},{timestamps : true})

const ApplicationModel  = mongoose.models.Application || mongoose.model("Application" , applicationSchema)
export default ApplicationModel;
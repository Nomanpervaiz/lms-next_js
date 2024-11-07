import mongoose from "mongoose";

const { Schema } = mongoose;

const addmissionSchema = new Schema({

    course : {type : mongoose.Types.ObjectId , ref : "Course"},
    batch : {type : mongoose.Types.ObjectId , ref : "Batch"},
    startDate : String,
    endDate : String,
    status : {
        type : String,
        default : "pending",
        enum : ["pending" , "open" , "close"]
    },

}, { timestamps: true });

if (mongoose.models.Admission) {
    mongoose.models.Admission.schema = addmissionSchema;
  }
export const AddmissionModel =
  mongoose.models.Addmission || mongoose.model("Addmission", addmissionSchema);

import { connectDB } from "@/lib/dbConnect";
import { AddmissionModel } from "@/lib/Models/AddmissionModel";
import { BatchModel } from "@/lib/Models/BatchModel";
import { CourseModel } from "@/lib/Models/CourseModel";

// This function get data from database
export async function GET(request, { params }) {
  await connectDB();
  const id = await params.id;
  const addmission = await AddmissionModel.findOne({ _id: id })
    .populate("course", "title description")
    .populate("batch", "title")
    .lean();
  const applications = await AddmissionModel.find({ addmission: id })
    .populate("user", "name email profileImg")
    .lean();
  return Response.json({
    error: false,
    msg: "Addmission Added Successully",
    addmission: {
      ...addmission,
      applications,
    },
  });
}

import { connectDB } from "@/lib/dbConnect";
import { AddmissionModel } from "@/lib/Models/AddmissionModel";
import { BatchModel } from "@/lib/Models/BatchModel";
import { CourseModel } from "@/lib/Models/CourseModel";

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  let newAddmission = new AddmissionModel({ ...obj });
  newAddmission = await newAddmission.save();

  return Response.json({
    error: false,
    msg: "Addmission Added Successully",
    addmission: newAddmission,
  });
}

export async function GET(request) {
  await connectDB();
  const reqUrl = request.url;
  const { searchParams } = new URL(reqUrl);
  const query = {};
  if (searchParams.get("course")) {
    query.course = searchParams.get("course");
  }
  if (searchParams.get("batch")) {
    query.batch = searchParams.get("batch");
  }

  const addmission = await AddmissionModel.find(query)
    .populate("course", "title")
    .populate("batch", "title");
  return Response.json({
    error: false,
    msg: "Addmission Added Successully",
    addmission,
  });
}

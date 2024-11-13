import { connectDB } from "@/lib/dbConnect";
import { AddmissionModel } from "@/lib/Models/AddmissionModel";
import { BatchModel } from "@/lib/Models/BatchModel";
import { CourseModel } from "@/lib/Models/CourseModel";

// This function Post data in database using schema
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

// This function get data from database
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
    .populate("course", "title description")
    .populate("batch", "title");
  return Response.json({
    error: false,
    msg: "Addmission Added Successully",
    addmission,
  });
}

export async function PUT(request) {
  await connectDB();
  const obj = await request.json();
  console.log("obj in put addmission ==> ",obj);
  
  const { id, status } = obj;
  const updated = await AddmissionModel.findOneAndUpdate(
    { _id: id},
    { status: status }
  ).exec();
  return (Response.json({
    error : false ,
    msg : "Addmission Updated Successfully." , 
    addmission : updated
  }))
}

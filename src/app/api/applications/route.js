import { connectDB } from "@/lib/dbConnect";
import { AddmissionModel } from "@/lib/Models/AddmissionModel";
import ApplicationModel from "@/lib/Models/ApplicationModel";
import { BatchModel } from "@/lib/Models/BatchModel";
import { CourseModel } from "@/lib/Models/CourseModel";
import { UserModel } from "@/lib/Models/UserModel";


// This function Post data in database using schema
export async function POST(request) {
    await connectDB();
    const obj = await request.json();
    console.log( "obj in application ==>",obj );
    let application = await ApplicationModel.findOne({ 
        addmission : obj.addmission,
        user : obj.user
    });


if (application) {
    return Response.json({
      error: true,
      msg: "you already applied for this course."
  }); 
}

let newApplication = new  ApplicationModel({...obj})
newApplication = await  newApplication.save()

return Response.json({
  error: false,
  msg: "Application Added Successully",
  application: newApplication,
});
}

// This function get data from database 
export async function GET(request) {
  await connectDB();
  const reqUrl = await request.url;
  const { searchParams } = new URL(reqUrl);
  const query = {};
  if (searchParams.get("course")) {
    query.course = searchParams.get("course");
  }
  if (searchParams.get("batch")) {
    query.batch = searchParams.get("batch");
  }
  if (searchParams.get("addmission")) {
    query.addmission = searchParams.get("addmission");
  }
  if (searchParams.get("user")) {
    query.user = searchParams.get("user");
  }
 
  const application = await ApplicationModel.find(query)
    .populate("course", "title")
    .populate("batch", "title")
    .populate("addmission", "startDate endDate status")
    .populate("user", "name email profileImg")
  return Response.json({
    error: false,
    msg: "Addmission Added Successully",
    application,
  });
}


export async function PUT(request) {
  await connectDB();
  const obj = await request.json();
  
  const { id, status } = obj;
  const updated = await ApplicationModel.findOneAndUpdate(
    { _id: id},
    { status: status }
  ).exec();
  return (Response.json({
    error : false ,
    msg : "Application Updated Successfully." , 
    application : updated
  }))
}

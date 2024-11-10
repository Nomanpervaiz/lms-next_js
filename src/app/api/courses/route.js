import { connectDB } from "@/lib/dbConnect";
import { CourseModel } from "@/lib/Models/CourseModel";

// This function Post data in database using schema

export async function POST(request) {
    try {
        
        await connectDB();
        const obj = await request.json();
        let newCourse = new CourseModel({ ...obj });
        newCourse = await newCourse.save();
      
        return Response.json({
          error: false,
          msg: "Course Added Successfully",
          course: newCourse,
        });
    } catch (error) {

        console.log("error in course api" , error);
        
        
    }
}

export async function GET() {
  await connectDB();

  const courses = await CourseModel.find();
  return Response.json({
    error: false,
    msg: "Course Fetched Successfully",
    courses: courses,
  });
}
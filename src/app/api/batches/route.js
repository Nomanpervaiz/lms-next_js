import { connectDB } from "@/lib/dbConnect";
import BatchModel from "@/lib/Models/BatchModel";
import CourseModel from "@/lib/Models/CourseModel";

// This function Post data in database using schema

export async function POST(request) {
    await connectDB()
    const obj = await request.json()
    let newBatch  = new BatchModel({...obj})
    newBatch = await newBatch.save()
    return Response.json({
        error :  false , 
        msg : "Batch Added Successully", 
        batch : newBatch
    })
}

export async function GET(request) {

    await connectDB()
    const reqUrl = request.url
    const {searchParams} = new URL(reqUrl)
    const query ={}
    if (searchParams.get("course")) {
        query.course = searchParams.get("course")
    }

    const batches  = await BatchModel.find(query).populate("course" , "title")
    return Response.json({
        error :  false , 
        msg : "Batch Added Successully", 
        batches , 
    })
}


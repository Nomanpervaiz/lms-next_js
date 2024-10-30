import { connectDB } from "@/lib/dbConnect";
import userModal from "@/lib/Modals/UserModal";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function GET(request) {
  return Response.json("Get response login Successfully");
}

export async function POST(request) {
  // calling connectDb
  await connectDB();
  //   reciving response from postman to obj
  const obj = await request.json();
  console.log("obj ==> ", obj);
  //   checking user same data user exist or not
  const user = await userModal.findOne({ email: obj.email });
  //   if user not exist make error 
  if (!user) {
    return Response.json(
      { error: true, msg: "User Not Found" },
      { status: 404 }
    );
  }
  
  const isPasswordMatch = await bcrypt.compare(obj.password, user.password)
  
  if (!isPasswordMatch) {
    return Response.json(
        {
            error: true,
            msg : "Password is not valid",
        },{status : 400}
    )
  }


  const token = jwt.sign(
       { id: user._id, role: user.role },
       process.env.JWT_KEY
  )


return Response.json(
    {
        error : false,
        msg : "user Login Successfully",
        user,
        token,        
    },{status : 200}
)
}

import { connectDB } from "@/lib/dbConnect";
import { UserModel } from "@/lib/Models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// This function Post data in database using schema
export async function POST(request) {
  // calling connectDb
  await connectDB();
  //   reciving response from postman to obj
  const obj = await request.json();
  console.log("obj ==> ", obj);
  //   checking user same data user exist or not
  const user = await UserModel.findOne({ email: obj?.email });
  //   if user exist make error user alerady exist
  if (user) {
    return Response.json(
      { error: true, msg: "User already exist" },
      { status: 403 }
    );
  }
  // Hashed password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(obj.password, saltRounds);
  obj.password = hashedPassword;

//   after everything ..  i make new user using same code but it make new user with the help of new keyword

  let newUser = new UserModel({ ...obj });
  newUser = await newUser.save();

  
  const token = jwt.sign(
       { id: newUser?._id, role: newUser?.role },
       process?.env?.JWT_KEY
  )

return Response.json(
    {
        error : false,
        msg : "user Added Successfully",
        user: newUser,
        token : token ,
    },{status : 200}
)
}

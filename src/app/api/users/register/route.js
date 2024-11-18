import { connectDB } from "@/lib/dbConnect";
import { UserModel } from "@/lib/Models/UserModel";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export async function GET(request) {
  return new Response(JSON?.stringify("Get response login Successfully"), {
    status: 200,
  });
}
// This function Post data in database using schema
export async function POST(request) {
  try {
    // Connecting to the database
    await connectDB();

    // Parsing JSON request data
    const obj = await request?.json();
    // Check if the user exists in the database
    const existingUser = await UserModel.findOne({ email: obj.email });
    if (existingUser) {
      return new Response(
        JSON?.stringify({ error: true, msg: "User Already exist" }),
        { status: 400 }
      );
    }


    // convert password to hash password
    const hashPassword = await bcrypt.hash(obj.password,12)

 // Create new user object
 const newUser = await UserModel.create({
  name : obj.name,
  email: obj.email,
  password : hashPassword,
  provider : Credentials
})

    // Generate JWT token
    const token = jwt?.sign(
      { id: newUser?._id, role: newUser?.role },
      process.env.JWT_KEY, // Ensure JWT_KEY is set in .env
    );


    // Respond with success message, user info, and token
    return new Response(
      JSON?.stringify({
        error: false,
        msg: "User Register successfully",
          user : {
            id : newUser._id,
            name : newUser.name,
            email : newUser.email
          },
        token,
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration Error:", error);
    return new Response(
      JSON?.stringify({ error: true, msg: "Server Error" }),
      { status: 500 }
    );
  }
}

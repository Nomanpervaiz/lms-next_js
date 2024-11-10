import { connectDB } from "@/lib/dbConnect";
import { UserModel } from "@/lib/Models/UserModel";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export async function GET(request) {
  return new Response(JSON?.stringify("Get response login Successfully"), {
    status: 200,
  });
}

export async function POST(request) {
  try {
    // Connecting to the database
    await connectDB();

    // Parsing JSON request data
    const obj = await request?.json();
    console.log("obj ==> ", obj);

    // Check if the user exists in the database
    const user = await UserModel.findOne({ email: obj.email });
    if (!user) {
      return new Response(
        JSON?.stringify({ error: true, msg: "User Not Found" }),
        { status: 404 }
      );
    }

    // Compare the provided password with the stored hash
    const isPasswordMatch = await bcrypt.compare(obj.password, user.password);
    if (!isPasswordMatch) {
      return new Response(
        JSON?.stringify({ error: true, msg: "Password is not valid" }),
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt?.sign(
      { id: user?._id, role: user?.role },
      process.env.JWT_KEY, // Ensure JWT_KEY is set in .env
    );

    // Respond with success message, user info, and token
    return new Response(
      JSON?.stringify({
        error: false,
        msg: "User login successfully",
        user,
        token,
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Login Error:", error);
    return new Response(
      JSON?.stringify({ error: true, msg: "Server Error" }),
      { status: 500 }
    );
  }
}

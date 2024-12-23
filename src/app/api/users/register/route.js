import { connectDB } from "@/lib/dbConnect";
import { UserModel } from "@/lib/Models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function GET(request) {
  return new Response(JSON.stringify("Get response: Register Successfully"), {
    status: 200,
  });
}

export async function POST(request) {
  try {
    // Connecting to the database
    await connectDB();

    // Parsing JSON request data
    const obj = await request.json();

    // Log request payload for debugging
    console.log("Request Payload:", obj);

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email: obj.email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: true, msg: "User already exists" }),
        { status: 400 }
      );
    }

    // Hash the password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(obj.password, saltRounds);

    // Create new user object and save to the database
    const newUser = await UserModel.create({
      name: obj.name,
      email: obj.email,
      password: hashPassword,
      provider: "Credentials",
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_KEY // Ensure JWT_KEY is set in the environment
    );

    // Respond with success message, user details, and token
    return new Response(
      JSON.stringify({
        error: false,
        msg: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        token,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return new Response(
      JSON.stringify({ error: true, msg: "Server Error" }),
      { status: 500 }
    );
  }
}

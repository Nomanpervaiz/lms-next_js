import mongoose  from "mongoose"
const {Schema} = mongoose
const userSchema = new Schema({
    name : String,
    email : {type : String , required : true},
    provider : {type : String},
    profileImg : {type : String },
    password : {type : String },
    role : {type : String , default : "user" },
    gender : String ,
    address : String ,
},{timestamps : true});

export const UserModel = mongoose?.models?.Users || mongoose?.model("Users" , userSchema)
  


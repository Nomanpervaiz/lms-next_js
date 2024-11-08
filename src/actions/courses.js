"use server"

import { revalidatePath } from "next/cache"


export const getCourses  = async ()=>{
    let courses  = await fetch(`${process.env.BASE_URL}api/courses`)
    courses = await courses.json()
    return courses
}

export const addCourses = async (formData)=>{
    console.log("formData ==>" , formData);
    const obj = {
        title : formData.get("title"),
        description : formData.get("description"),
        duration : formData.get("duration"),
        eligibility : formData.get("duration"),
        thumbnail : formData.get("thumbnail"),
    }

    const course = await fetch(`${process.env.BASE_URL}api/courses`,{
        method : "POST",
        body : JSON.stringify(obj),
    })
    if (course.ok) {
        revalidatePath("/admin/courses")
    }


} 
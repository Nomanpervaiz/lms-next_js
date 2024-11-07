"use server"


const getCourses  = async ()=>{
    let courses  = await fetch(`${process.env.BASE_URL}api/courses`)
    courses = await courses.json()
    return courses
}
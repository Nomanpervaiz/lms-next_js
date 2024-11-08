import { getCourses } from "@/actions/courses"
import CourseTable from "@/components/DataTables/CourseTable"
import CourseModal from "@/components/Dialog/CourseModal"


async function Courses() {
  const {courses} = await getCourses()
  
    
  return (
    <div className="min-h-screen p-10">
      <div className='flex justify-between py-10 '>
        <h1 className="text-4xl font-bold text-center ">Courses</h1>
        <CourseModal/>
      </div>
    <CourseTable courses={courses}/>
  </div>
  )
}

export default Courses
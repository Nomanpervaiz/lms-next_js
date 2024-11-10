import { getAddmission } from "@/actions/addmissions"
import { getBatches } from "@/actions/batches"
import { getCourses } from "@/actions/courses"
import AddmissionTable from "@/components/DataTables/AddmissionTable"


export default function Admissions() {

  const {courses} = getCourses()  
  const {batches} = getBatches()  
  const {addmission} = getAddmission()  
    console.log("addmission ==> ", addmission);
  
  return (
    <div className="min-h-screen p-10">
   <div className='flex justify-between py-10 '>
      <h1 className="text-4xl font-bold text-center ">Admissions</h1>
      {/* <AddmissionModal courses={courses} batches={batches} /> */}
      </div>
      <AddmissionTable data={addmission} />
    </div>)
}


import { getAddmission } from "@/actions/addmissions"
import { getBatches } from "@/actions/batches"
import { getCourses } from "@/actions/courses"
import AddmissionTable from "@/components/DataTables/AddmissionTable"
import { AddmissionModal } from "@/components/Dialog/AddmissionModal"


export default async function Admissions() {

  const {courses} = await getCourses()  
  const {batches} = await getBatches()  
  const {addmission} = await getAddmission()  
  
  return (
    <div className="min-h-screen p-10">
   <div className='flex justify-between py-10 '>
      <h1 className="text-4xl font-bold text-center ">Admissions</h1>
      <AddmissionModal courses={courses}  batches={batches} />
      </div>
      <AddmissionTable data={addmission} />
    </div>)
}


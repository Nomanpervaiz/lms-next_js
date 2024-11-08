import { getBatches } from '@/actions/batches'
import { getCourses } from '@/actions/courses'
import BatchTable from '@/components/DataTables/BatchTable'
import { BatchModal } from '@/components/Dialog/BatchModal'


async function Batches() {

  const {batches}  = await getBatches()
  const {courses}  = await getCourses()

  return (
    <div className="min-h-screen p-10">
   <div className='flex justify-between py-10 '>
      <h1 className="text-4xl font-bold text-center ">Batches</h1>
      <BatchModal courses={courses} />
      </div>
      <BatchTable batches={batches} />
    </div>)
}

export default Batches
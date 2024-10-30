import BatchTable from '@/components/DataTables/BatchTable'
import { BatchModal } from '@/components/Dialog/BatchModal'
import React from 'react'

function Batches() {
  return (
    <div className="min-h-screen p-10">
   <div className='flex justify-between py-10 '>
      <h1 className="text-4xl font-bold text-center ">Batches</h1>
      <BatchModal/>
      </div>
      <BatchTable />
    </div>)
}

export default Batches
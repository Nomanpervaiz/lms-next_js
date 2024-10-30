import TrainerTable from '@/components/DataTables/TrainerTable'
import TrainerModal from '@/components/Dialog/TrainerModal'
import React from 'react'

function Trainers() {
  return (
    <div className="min-h-screen p-10">
      <div className='flex justify-between py-10 '>
      <h1 className="text-4xl font-bold text-center ">Trainer</h1>
      <TrainerModal/>
      </div>
      <TrainerTable/>
    </div>
    )
}

export default Trainers
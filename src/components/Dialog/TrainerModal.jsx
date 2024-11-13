'use client'
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const TrainerModal = () => {
  const [open, setOpen] = React.useState(false)

  const handleAddTrainer = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newTrainer = {
      id: `trainer${Math.random().toString(36).substr(2, 9)}`, // Unique ID
      name: formData.get('name'),
      expertise: formData.get('expertise'),
      experience: formData.get('experience'),
      noOfCourses: formData.get('noOfCourses'),
    }

    // Here you could handle adding the new trainer to the list
    console.log("New Trainer Added:", newTrainer)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Trainer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="font-bold">Add Trainer</DialogTitle>
          <DialogDescription>
            Enter the details of the new trainer.
          </DialogDescription>
        </DialogHeader>
        <TrainerForm onSubmit={handleAddTrainer} />
      </DialogContent>
    </Dialog>
  )
}

function TrainerForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={cn("grid gap-4")}>
      {/* Name */}
      <div className="grid gap-2">
        <Label htmlFor="name">Trainer Name</Label>
        <Input required type="text" id="name" name="name" className="rounded-xl" placeholder="John Doe" />
      </div>

      {/* Expertise */}
      <div className="grid gap-2">
        <Label htmlFor="expertise">Expertise</Label>
        <Input required type="text" id="expertise" className="rounded-xl" name="expertise" placeholder="Web Development, AI, etc." />
      </div>

      {/* Experience */}
      <div className="grid gap-2">
        <Label htmlFor="experience">Experience</Label>
        <Input required type="text" id="experience" className="rounded-xl" name="experience" placeholder="e.g., 3 years" />
      </div>

      {/* Number of Courses */}
      <div className="grid gap-2">
        <Label htmlFor="noOfCourses">Number of Courses</Label>
        <Input required type="number" id="noOfCourses" className="rounded-xl" name="noOfCourses" placeholder="e.g., 5" />
      </div>

      <Button type="submit" className="bg-black hover:bg-black hover:text-white rounded-xl text-white">Add Trainer</Button>
    </form>
  )
}

export default TrainerModal

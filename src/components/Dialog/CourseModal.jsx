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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CourseModal() {
  const [open, setOpen] = React.useState(false)

  const handleAddCourse = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newCourse = {
      id: `course${Math.random().toString(36).substr(2, 9)}`, // Unique ID
      course: formData.get('courseName'),
      status: formData.get('status'),
      duration: formData.get('duration'),
      description: formData.get('description'),
    }

    // Here you can handle adding the new course to the course list or state
    console.log("New Course Added:", newCourse)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="font-bold">Add Course</DialogTitle>
          <DialogDescription>
            Enter the details of the new course.
          </DialogDescription>
        </DialogHeader>
        <CourseForm onSubmit={handleAddCourse} />
      </DialogContent>
    </Dialog>
  )
}

function CourseForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={cn("grid gap-4")}>
      
      <div className="grid gap-2">
        <Label htmlFor="courseName">Course Name</Label>
        <Input required type="text" id="courseName" name="courseName" className="rounded-xl" placeholder="e.g., Web Development" />
      </div>


      <div className="grid gap-2">
        <Label htmlFor="status" >Status</Label>
        <Select required  name="status">
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>


      <div className="grid gap-2">
        <Label htmlFor="duration">Duration</Label>
        <Input required type="text" id="duration" name="duration" className="rounded-xl" placeholder="e.g., 6 months, 1 year" />
      </div>

      {/* Description */}
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input required as="textarea" id="description" name="description" className="rounded-xl" placeholder="Describe the course" />
      </div>

      <Button type="submit" className="bg-black rounded-xl text-white">Add Course</Button>
    </form>
  )
}

export default CourseModal

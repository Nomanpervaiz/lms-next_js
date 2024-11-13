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

const courseData = [
  { id: "course1", course: "Web Development" },
  { id: "course2", course: "App Development" },
  { id: "course3", course: "Python Development" },
]

export function StudentModal() {
  const [open, setOpen] = React.useState(false)

  const handleAddStudent = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newStudent = {
      id: `student${Math.random().toString(36).substr(2, 9)}`, // Unique ID
      name: formData.get('studentName'),
      email: formData.get('email'),
      contact: formData.get('contact'),
      course: formData.get('course'),
    }

    // Handle adding the new student to the student list or state
    console.log("New Student Added:", newStudent)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="font-bold">Add Student</DialogTitle>
          <DialogDescription>
            Enter the details of the new student.
          </DialogDescription>
        </DialogHeader>
        <StudentForm onSubmit={handleAddStudent} />
      </DialogContent>
    </Dialog>
  )
}

function StudentForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={cn("grid gap-4")}>
      {/* Student Name */}
      <div className="grid gap-2">
        <Label htmlFor="studentName">Student Name</Label>
        <Input required type="text" id="studentName" className="rounded-xl" name="studentName" placeholder="e.g., John Doe" />
      </div>

      {/* Email */}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input required type="email" id="email" name="email" className="rounded-xl" placeholder="e.g., john.doe@example.com" />
      </div>

      {/* Contact */}
      <div className="grid gap-2">
        <Label htmlFor="contact">Contact Number</Label>
        <Input required type="tel" id="contact" name="contact" className="rounded-xl" placeholder="e.g., +1234567890" />
      </div>

      {/* Course */}
      <div className="grid gap-2 ">
        <Label htmlFor="course" >Course</Label>
        <Select required name="course" >
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {courseData.map((course) => (
              <SelectItem key={course.id} value={course.course}>
                {course.course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="bg-black hover:bg-black hover:text-white rounded-xl text-white">Add Student</Button>
    </form>
  )
}

export default StudentModal

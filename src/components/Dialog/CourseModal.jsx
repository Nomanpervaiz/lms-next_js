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
import { addCourses } from "@/actions/courses"

export function CourseModal() {
  const [open, setOpen] = React.useState(false)


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
        <CourseForm className="px-4" />
      </DialogContent>  
    </Dialog>
  )
}

function CourseForm({ className}) {
  return (
    <form action={addCourses} className={cn("grid gap-4",className)  }>
      
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input required type="text" id="title" name="title" className="rounded-xl" placeholder="e.g., Web Development" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="duration">Duration</Label>
        <Input required type="text" id="duration" name="duration" className="rounded-xl" placeholder="e.g., 6 months, 1 year" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input required type="url" id="thumbnail" name="thumbnail" className="rounded-xl" placeholder="Upload thumbnail" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="eligibility">Eligibility</Label>
        <Input required type="text" id="eligibility" name="eligibility" className="rounded-xl" placeholder="eligibility" />
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

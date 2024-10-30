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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


const trainerData = [
  {
    id: "trainer1",
    name: "Ghous Ahmed",
    expertise: "Web and App Development",
    experience: "5 years",
    noOfCourses: 3,
  },
  {
    id: "trainer2",
    name: "Ameen Alam",
    expertise: "Generative AI",
    experience: "3 years",
    noOfCourses: 2,
  },
  {
    id: "trainer3",
    name: "Bial Raza",
    expertise: "App Development",
    experience: "4 years",
    noOfCourses: 4,
  },
];

const courseData = [
  {
    id: "m5gr84i9",
    course: "Web and App Development",
    status: "active",
    duration: "1 Year",
    description: "Make Student Complete Web and App developer from Scratch.",
  },
  {
    id: "3u1reuv4",
    course: "App Development",
    status: "active",
    duration: "4 months",
    description: "Make Web DEVELOPER also App Developer",
  },
  {
    id: "derv1ws0",
    course: "Python Development",
    status: "active",
    duration: "4 months",
    description: "Learn Python from Scratch",
  },
];

export function BatchModal() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = true

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" >Add Batch</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="font-bold">Add Batch</DialogTitle>
            <DialogDescription>
              
            </DialogDescription>
          </DialogHeader>
          <BatchForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" >Add Batch</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-bold">Add Batch</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <BatchForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function BatchForm({ className }) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
    {/* Batch Name */}
    <div className="grid gap-2">
      <Label htmlFor="batchName">Batch Name</Label>
      <Input required type="text" id="batchName" defaultValue="" className="rounded-xl" />
    </div>

    {/* Status */}
    <div className="grid gap-2">
      <Label htmlFor="status">Status</Label>
      <Select required>
        <SelectTrigger className="rounded-xl">
          <SelectValue placeholder="Pending, Completed, Ongoing, Merged" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="ongoing">Ongoing</SelectItem>
          <SelectItem value="merged">Merged</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Trainer */}
    <div className="grid gap-2">
      <Label htmlFor="trainer">Trainer</Label>
      <Select required>
        <SelectTrigger className="rounded-xl">
          <SelectValue placeholder="Select Trainer" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {trainerData.map((trainer) => (
            <SelectItem key={trainer.id} value={trainer.name}>
              {trainer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="grid gap-2">
      <Label htmlFor="noOfStudents">No of Students</Label>
      <Input required type="number" id="noOfStudents" defaultValue="" className="rounded-xl" />
    </div>

    {/* Course */}
    <div className="grid gap-2">
      <Label htmlFor="course">Course</Label>
      <Select required>
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

    <Button type="submit" className="bg-black text-white rounded-xl">Add Batch</Button>
  </form>
  )
}

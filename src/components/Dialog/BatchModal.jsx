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
import { addBatches } from "@/actions/batches"





export function BatchModal({courses}) {
  

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
          <BatchForm courses={courses} className={"mx-1"} />
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


function BatchForm({ className ,courses}) {

console.log("courses in bach modal ==> " , courses);

  
  return (
    <form  action={addBatches} className={cn("grid items-start gap-4", className)}>
    {/* Batch Name */}
    <div className="grid gap-2">
      <Label htmlFor="title">Batch Name</Label>
      <Input required type="text" id="title" placeholder="Batch name" name="title" className="rounded-xl" />
    </div>  

    <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
        className="rounded-xl"
        placeholder="Enter Description"
          required
          type="text"
          id="description"
          name="description"
        />
      </div>

    {/* Status */}
    <div className="grid gap-2">
      <Label htmlFor="status">Status</Label>
      <Select required  name="status">
        <SelectTrigger  className="rounded-xl">
          <SelectValue  placeholder="Batch Status" />
        </SelectTrigger >
        <SelectContent  className="bg-white">
          <SelectItem  value="pending" >Pending</SelectItem>
          <SelectItem value="admission-open" >Admission-open</SelectItem>
          <SelectItem value="admission-close">Admission-close</SelectItem>
          <SelectItem value="ongoing">Ongoing</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Course */}
    <div className="grid gap-2">
      <Label htmlFor="course">Course</Label>
      <Select required name="course" >
        <SelectTrigger className="rounded-xl">
          <SelectValue placeholder="Select Course" />
        </SelectTrigger>
        <SelectContent id="course" className="bg-white">
          {courses?.map((course) =>{
              console.log("course ka map ==> " , course);
            return(
              <SelectItem key={course?._id} value={course?._id}>
              {course?.title}
            </SelectItem>
          )})}
         
        </SelectContent>
      </Select>
    </div>

    <Button type="submit" className="bg-black text-white rounded-xl">Add Batch</Button>
  </form>
  )
}

"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";


export function ApplicationModal({ addmission, session }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = true;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Apply</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="font-bold">Apply</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <BatchForm courses={courses} batches={batches} className={"mx-1"} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Addmissions</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-bold">Add Addmissions</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <BatchForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function BatchForm({ className, courses, batches }) {
  const [selecteCourse, setSelecteCourse] = React.useState("");

  return (
    <form
      action={addAddmission}
      className={cn("grid items-start gap-4", className)}
    >
      {/* Startdate */}
      <div className="grid gap-2">
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          required
          type="date"
          id="startDate"
          placeholder="Enter Addmissions open Date"
          name="startDate"
          className="rounded-xl"
        />
      </div>
      {/* endDate */}
      <div className="grid gap-2">
        <Label htmlFor="endDate">End Date</Label>
        <Input
          required
          type="date"
          id="endDate"
          placeholder="Enter Addmissions close Date"
          name="endDate"
          className="rounded-xl"
        />
      </div>



      {/* Course */}
      <div className="grid gap-2">
        <Label htmlFor="course">Course</Label>
        <Select
          required
          name="course"
          onValueChange={(value) => setSelecteCourse(value)}
        >
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent id="course" className="bg-white">
            {courses?.map((course) => {
              console.log("course ka map ==> ", course);
              return (
                <SelectItem key={course?._id} value={course?._id}>
                  {course?.title}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      {selecteCourse &&
      <div className="grid gap-2">
        <Label htmlFor="status">Batch</Label>
        <Select required name="batch">
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Batch Status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {batches?.map((batche) => {
              console.log("course ka map ==> ", batche);
              return (
                <SelectItem key={batche?._id} value={batche?._id}>
                  {batche?.title}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div> 
            }
      <Button type="submit" className="bg-black hover:bg-black hover:text-white text-white rounded-xl">
        Add Batch
      </Button>
    </form>
  );
}

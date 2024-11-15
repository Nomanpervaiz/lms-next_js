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
import { addApplication } from "@/actions/applications";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";



const formSchema = z.object({
  CNIC: z.string().min(13).max(13, { message: "please add valid cnic" }),
  DOB: z.string(),
  address: z.string().min(10).max(120),
});

export function ApplicationModal({ addmission, session }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = true;
  console.log("addmission == " , addmission);
  

  if (isDesktop) {
    return (
      <Dialog  open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
          <Button variant="outline" className=" bg-white text-black hover:rounded-2xl transition-all duration-300">Apply</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white ">
          <DialogHeader>
            <DialogTitle className="font-bold ">Apply</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <ApplicationForm addmission={addmission} session={session} setOpen={setOpen} className={"mx-1"} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Application</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-bold">Add Application</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <ApplicationForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ApplicationForm({ className, addmission, session ,setOpen}) {
const {toast} = useToast()
const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: {
    CNIC: "4210196012222",
    DOB: "2000-2-2",
    address: "Gulshane Iqbaal Karachi",
  },
});


console.log("addmission in modal==>>>",addmission);
  
  async function onSubmit(values) {
    console.log("value in application modal==",values);
    const obj = {
      course: addmission.course._id,
      batch: addmission.batch._id,
      user: session.user._id,
      addmission: addmission._id,
      info: {
        ...values,
      },
    };
    const response = await addApplication(obj);
    console.log("response=>", response);
    if (response.error) {
      toast({
        title: "Sorry, You already applied in this course",
      });
    } else {
      toast({
        title: "Your application is submitted successfully",
      });
    }

    setOpen(false);
  }


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="CNIC"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CNIC</FormLabel>
            <FormControl>
              <Input placeholder="CNIC" {...field} />
            </FormControl>
            <FormDescription>Add valid CNIC number.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="DOB"
        render={({ field }) => (
          <FormItem>
            <FormLabel>DOB</FormLabel>
            <FormControl>
              <Input type="date" placeholder="DOB" {...field} />
            </FormControl>
            <FormDescription>Add valid DOB.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Textarea placeholder="address" {...field} />
            </FormControl>
            <FormDescription>Add valid address.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="rounded-2xl bg-black text-white">
        {form.formState.isSubmitting ? "Loading.." : "Submit"}
      </Button>
    </form>
  </Form>
  );
}

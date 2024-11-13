"use server"

import { revalidatePath } from "next/cache";

// This funtion returns admission api data
export async function getAddmission(status = '') {
    let admissions =  await fetch(`${process.env.BASE_URL}api/addmissions?status=${status}`,{cache: "no-cache",});
    admissions = await admissions?.json();
    return admissions;
  }
  

//   This Function Add Data in Admission api from frontend
  export async function addAddmission(formData) {
    
    const obj = {
         startDate : formData.get("startDate") ,
         endDate : formData.get("endDate") ,
         course : formData.get("course") ,
         batch : formData.get("batch") ,
    }

    console.log("obj formData addmission ==> ",obj);
    let batch = await fetch(`${process.env.BASE_URL}api/addmission`,
        {
            method : "POST",
            body : JSON.stringify(obj)
        }
    )    

    if (batch.ok) {
        revalidatePath("/admin/addmission")        
    }
    
  }
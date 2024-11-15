"use server"

import { revalidatePath } from "next/cache";

// This funtion returns admission api data
export async function getAddmission(status='') {
    let addmission =  await fetch(`${process.env.BASE_URL}api/addmissions?status=${status}`,{cache: "no-cache",});
    addmission = await addmission?.json();
    return addmission;
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
    let addmission = await fetch(`${process.env.BASE_URL}api/addmissions`,
        {
            method : "POST",
            body : JSON.stringify(obj)
        }
    )    

    if (addmission.ok) {
        revalidatePath("/admin/addmissions")        
    }
    
  }

  export async function updateAddmission(id, status) {
    console.log("id ==> ", id);
    console.log("status ==> ", status); 
    const updateStatusOfAddmission = await fetch(`${process.env.BASE_URL}api/addmissions`, {
      method: "PUT",
      body: JSON.stringify(
        {
          id:id,
          status:status
        }
      ),
    });
  
    const responseJson = await updateStatusOfAddmission.json();
    console.log("Update response:", responseJson); 
  
    if (updateStatusOfAddmission.ok) {
      revalidatePath("/admin/addmissions");
    }
  }
  
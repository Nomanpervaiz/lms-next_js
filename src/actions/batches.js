"use server"

import { revalidatePath } from "next/cache"
// This funtion returns batch api data
export async function getBatches() {
    let batches  = await fetch(`${process.env.BASE_URL}api/batches`)
    batches = batches.json()
    return batches
}

//   This Function Add Data in batch api from frontend
export async function addBatches (formData) {
    
    const obj = {
        title : formData.get("title"),
        description : formData.get("description"),
        course : formData.get("course"),
        status : formData.get("status"),
    }
    console.log("obj", obj);
    
    
    const batch = await fetch(`${process.env.BASE_URL}api/batches`,{cache: "no-cache"},{
        method : "POST",
        body : JSON.stringify(obj)
    },{
        caches : "no-cache"
    })

    if (batch.ok) {
        revalidatePath("/admin/batches")
        
    }

}
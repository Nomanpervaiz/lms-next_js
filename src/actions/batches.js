"use server"

import { revalidatePath } from "next/cache"

export async function getBatches() {
    const batches  = await fetch(`${process.env.BASE_URL}api/batches`)
    batches = batches.json()
    return batches
}

export async function addBatches (formData) {
    const obj = {
        title : formData.get("title"),
        description : formData.get("description"),
        course : formData.get("course"),
        status : formData.get("status")
    }
    
    const batch = await fetch(`${process.env.BASE_URL}api/batches`,{
        method : "POST",
        body : JSON.stringify(batch)
    })

    if (batch.ok) {
        revalidatePath("/admin/batches")
        
    }

}
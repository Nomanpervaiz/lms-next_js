"use server"

export async function getAddmission() {
    let addmissions  = await fetch(`${process.env.BASE_URL}api/addmissions`,{cache : "no-cache"})
    addmissions = await addmissions.json()
    return addmissions
}


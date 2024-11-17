"use server";

import { revalidatePath } from "next/cache";

export async function getApplication({
  addmission = "",
  course = "",
  batch = "",
  user = "",
}) {
  let application = await fetch(
    `${process.env.BASE_URL}api/applications?addmission=${addmission}&course=${course}&batch=${batch}&user=${user}`,
    {
      cache: "no-cache",
    }
  );
  application = await application?.json();
  return application;
}

export async function addApplication(obj) {
  
  const application = await fetch(`${process.env.BASE_URL}api/applications`, {
    method: "POST",
    body: JSON.stringify(obj),
    cache: "no-cache",
  });
  return await application.json();
}



export async function updateApplication(id, status,addmissionId) {
  const updateStatusOfApplication = await fetch(`${process.env.BASE_URL}api/applications`, {
    method: "PUT",
    body: JSON.stringify(
      {
        id:id,
        status:status
      }
    ),
  });

  const responseJson = await updateStatusOfApplication.json();
  console.log("Update response:", responseJson); 

  if (updateStatusOfApplication.ok) {
    revalidatePath(`/admin/applications/${addmissionId}`);
  }
}

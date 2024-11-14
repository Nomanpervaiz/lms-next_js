"use server";

import { revalidatePath } from "next/cache";

export async function getAdmissions(status = "") {
  let admissions = await fetch(
    `${process.env.BASE_URL}api/admission?status=${status}`,
    {
      cache: "no-cache",
    }
  );
  admissions = await admissions.json();
  return admissions;
}

export async function addApplication(obj) {
  console.log("Obj in application action=>", obj);
  const application = await fetch(`${process.env.BASE_URL}api/applications`, {
    method: "POST",
    body: JSON.stringify(obj),
    cache: "no-cache",
  });
  return await application.json();
}
import CourseSection from "@/components/CourseSection";
import Hero from "@/components/Hero";
import { auth } from "../../../auth";
import { getAddmission } from "@/actions/addmissions";


export default async function Home() {
  const { addmission } = await getAddmission("open");
  const session = await auth();
  return (
    <>
      <Hero />
      <CourseSection  addmission={addmission} session={session} />
    </>
  );
}

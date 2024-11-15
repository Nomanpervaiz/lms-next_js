import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ApplicationModal } from "./Dialog/ApplicationModal";
import Link from "next/link";
  
function CourseSection({addmission,session}) {
    
  return (
    <section className="h-dvh w-full py-10 bg-black">
    <div className="container mx-auto">
        <div className="py-10">
      <h1 className="text-5xl  font-bold text-white">Admission Open</h1>

        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">


    {addmission.map((admission) => {
      console.log(admission._id);
      
        return (
            <Card className="bg-white" key={admission._id}>
              <CardHeader>
                <CardTitle>{admission.course.title}</CardTitle>
                <CardDescription>{admission.batch.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{admission.course.description}</p>
              </CardContent>
              <CardFooter>
                {session ? (
                  <ApplicationModal
                    session={session}
                    addmission={admission}
                  />
                ) : (
                  <Link href={"/signin"}>Sign in to Apply</Link>
                )}
              </CardFooter>
            </Card>
          );
        })}
        </div>
    </div>
  </section>
  )
}

export default CourseSection
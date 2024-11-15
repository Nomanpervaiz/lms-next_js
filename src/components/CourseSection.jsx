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
    <section className="h-dvh w-full py-10 bg-white">
    <div className="container mx-auto">
        <div className="pb-20 text-center">
      <h1 className="text-5xl  font-bold text-gray-800">Apply In Out Latest Courses</h1>

        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">


    {addmission.map((admission) => {
      console.log(admission._id);
      
        return (
            <Card className="border-none text-white bg-black/[0.89] shadow-lg" key={admission._id}>
              <CardHeader>
                <CardTitle className="text-xl">{admission.course.title}</CardTitle>
                <CardDescription className="text-gray-300">{admission.batch.title}</CardDescription>
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
                  <Link className="bg-white text-black rounded-xl py-1 px-2" href={"/signin"}>Sign in to Apply</Link>
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
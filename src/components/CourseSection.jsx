import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
function CourseSection({addmission,session}) {
  console.log("addmission in coursesect" , addmission);
    
  return (
    <section className="h-dvh w-full bg-black/[0.45]">
    <div className="container mx-auto text-center">
    {addmission.map((admission) => {
        console.log("admission ===>",admission);
        
          return (
            <Card key={admission._id}>
              <CardHeader>
                <CardTitle>{admission.course.title}</CardTitle>
                <CardDescription>{admission.batch.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{}</p>
              </CardContent>
              <CardFooter>
                {/* {session ? (
                  <ApplicationModalForm
                    session={session}
                    admission={admission}
                  />
                ) : (
                  <Link href={"/signin"}>Sign in to Apply</Link>
                )} */}
              </CardFooter>
            </Card>
          );
        })}
    </div>
  </section>
  )
}

export default CourseSection
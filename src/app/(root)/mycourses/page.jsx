import { redirect } from "next/navigation"
import { getApplication } from "@/actions/applications"
import { auth } from "../../../../auth"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, GraduationCapIcon, UserIcon } from 'lucide-react'


export default async function MyCourses() {
  
    const session = await auth() 
    if (!session) redirect("/")
      const {application} = await getApplication({user : session?.user?._id})
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 mt-4 text-center ">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {application.map((course) => (
          <Card key={course._id} className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-black text-white">
              <CardTitle  >{course.course.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={course.user.profileImg} alt={course.user.name} />
                  <AvatarFallback>{course.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{course.user.name}</p>
                  <p className="text-sm text-muted-foreground">{course.user.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <GraduationCapIcon className="mr-2 h-4 w-4" />
                  <span>{course.batch.title}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>
                    {new Date(course.addmission.startDate).toLocaleDateString()} - 
                    {new Date(course.addmission.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>CNIC: {course.info.CNIC}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Badge className={"bg-gray-100 rounded-xl"} variant={course.status === 'pending' ? 'secondary' : 'default'}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </Badge>
              <Badge className={"rounded-xl"} variant={course.addmission.status === 'open' ? 'success' : 'destructive'}>
                Admission {course.addmission.status.charAt(0).toUpperCase() + course.addmission.status.slice(1)}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
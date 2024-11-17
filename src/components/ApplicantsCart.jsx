"use client"
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar1Icon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateApplication } from "@/actions/applications";

function ApplicantsCart({addmission}) {
    
    const handleEnroll = async (applicationId) => {
        await updateApplication(applicationId , "enrolled" , addmission.id)
    };
    
    const handleReject = async (applicationId) => {
        await updateApplication(applicationId , "rejected" , addmission.id)
        
      };

  return (
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {addmission.application.map((application) => (
                  <Card key={application._id}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src={application.user.profileImg}
                            alt={application.user.name}
                          />
                          <AvatarFallback>
                            {application?.user?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{application.user.name}</CardTitle>
                          <CardDescription>
                            {application.user.email}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4" />
                          <span className="text-sm">
                            CNIC: {application.info.CNIC}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar1Icon className="h-4 w-4" />
                          <span className="text-sm">
                            DOB:{" "}
                            {new Date(
                              application.info.DOB
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">
                          Address: {application.info.address}
                        </p>
                        <p className="text-sm">
                          Applied on:{" "}
                          {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                        <Badge
                          variant={
                            application.status === "pending"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {application.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {application.status == "pending" && (
                        <>
                          <Button
                            onClick={() => handleEnroll(application._id)}
                            className="bg-blue-500 hover:text-black text-white rounded-xl"
                            >
                            Enroll
                          </Button>
                          <Button
                            onClick={() => handleReject(application._id)}
                            className="bg-red-500 hover:text-black text-white rounded-xl"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>  )
}

export default ApplicantsCart
import { getSingleAddmissionData } from "@/actions/addmissions";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,
  Users2Icon,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

async function AddmissionDetail({ params }) {
  const id = (await params).id;
  const { addmission } = await getSingleAddmissionData(id);
  console.log("addmission in dynamic page==>>", addmission);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admission Details</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{addmission.course.title}</CardTitle>
          <CardDescription>{addmission.course.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <BookOpenIcon className="mr-2" />
              <span>Course ID: {addmission.course._id}</span>
            </div>
            <div className="flex items-center">
              <Users2Icon className="mr-2" />
              <span>Batch: {addmission.batch.title}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-2" />
              <span>
                Start Date:{" "}
                {format(new Date(addmission.startDate), "MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-2" />
              <span>
                End Date: {format(new Date(addmission.endDate), "MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-2" />
              <span>
                Created:{" "}
                {format(
                  new Date(addmission.createdAt),
                  "MMMM d, yyyy HH:mm:ss"
                )}
              </span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-2" />
              <span>
                Updated:{" "}
                {format(
                  new Date(addmission.updatedAt),
                  "MMMM d, yyyy HH:mm:ss"
                )}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <Badge
              variant={addmission.status === "open" ? "success" : "secondary"}
            >
              Status: {addmission.status.toUpperCase()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {addmission.applications.length > 0 ? (
            <ul>
              {addmission.application.map((application, index) => {
                console.log("applications hai ==> ",application);
                
                return (
                  <li key={index}>{/* Display application details here */}</li>
                );
              })}
            </ul>
          ) : (
            <p>No applications received yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AddmissionDetail;

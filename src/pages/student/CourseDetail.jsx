import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1 className="text-center text-lg text-muted-foreground">Loading...</h1>;
  if (isError) return <h1 className="text-center text-lg text-red-500">Failed to load course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Hero Section */}
      <div className="bg-[#1f1f1f] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">{course?.courseTitle}</h1>
          <p className="text-sm md:text-base text-gray-300">Course Sub-title</p>
          <p>
            Created by{" "}
            <span className="text-indigo-300 underline italic">{course?.creator?.name}</span>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt.split("T")[0]}</p>
          </div>
          <p className="text-gray-400">Students enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10">
        {/* Left: Course Description & Content */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Course Description</h2>
            <div
              className="text-sm text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </div>

          {/* Course Content */}
          <Card className="bg-muted/50 border-none shadow-md backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-lg">Course Content</CardTitle>
              <CardDescription>{course.lectures.length} lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm hover:bg-muted p-2 rounded-md transition-all"
                >
                  <span className="text-primary">
                    {purchased ? <PlayCircle size={16} /> : <Lock size={16} />}
                  </span>
                  <p className="text-muted-foreground">{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Video Preview & Price */}
        <div className="w-full lg:w-1/3">
          <Card className="border-none shadow-xl bg-[#1f1f1f] text-white">
            <CardContent className="p-4 space-y-4">
              <div className="rounded-lg overflow-hidden aspect-video shadow-inner">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course.lectures[0].videoUrl}
                  controls
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-1">
                  {course.lectures[0].lectureTitle}
                </h2>
                <Separator className="my-2 bg-gray-700" />
                <h3 className="text-xl font-bold text-indigo-300">
                  ₹{course.coursePrice}
                </h3>
              </div>
            </CardContent>
            <CardFooter className="p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

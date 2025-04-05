import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: completeData, isSuccess: completeSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { data: inCompleteData, isSuccess: inCompleteSuccess }] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completeSuccess) {
      toast.success(completeData.message);
      refetch();
    }
    if (inCompleteSuccess) {
      toast.success(inCompleteData.message);
      refetch();
    }
  }, [completeSuccess, inCompleteSuccess]);

  if (isLoading) return <p className="text-center text-muted-foreground">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle, lectures = [] } = courseDetails;

  const initialLecture = currentLecture || lectures[0];

  const isLectureCompleted = (lectureId) =>
    progress.some((prog) => prog.lectureId === lectureId && prog.viewed);

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = () => completeCourse(courseId);
  const handleInCompleteCourse = () => inCompleteCourse(courseId);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Course Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed
            </div>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Player */}
        <div className="flex-1 bg-[#1f1f1f] text-white rounded-xl shadow-lg p-4">
          <video
            src={currentLecture?.videoUrl || initialLecture.videoUrl}
            controls
            className="w-full h-auto rounded-lg"
            onPlay={() =>
              handleLectureProgress(currentLecture?._id || initialLecture._id)
            }
          />
          <div className="mt-4">
            <h2 className="text-lg font-semibold">
              {`Lecture ${
                lectures.findIndex(
                  (lec) => lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              }: ${currentLecture?.lectureTitle || initialLecture.lectureTitle}`}
            </h2>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-2/5 space-y-4">
          <h2 className="text-xl font-semibold">Lectures</h2>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted">
            {lectures.map((lecture) => {
              const isCurrent = lecture._id === currentLecture?._id;
              const completed = isLectureCompleted(lecture._id);

              return (
                <Card
                  key={lecture._id}
                  onClick={() => handleSelectLecture(lecture)}
                  className={`transition-all cursor-pointer ${
                    isCurrent ? "border-primary bg-muted/30" : "hover:bg-muted/20"
                  }`}
                >
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {completed ? (
                        <CheckCircle2 className="text-green-500" size={20} />
                      ) : (
                        <CirclePlay className="text-gray-500" size={20} />
                      )}
                      <CardTitle className="text-base">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                    {completed && (
                      <Badge variant="outline" className="bg-green-200 text-green-600">
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;

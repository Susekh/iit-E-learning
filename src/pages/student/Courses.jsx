import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
 
const Courses = () => {
  const {data, isLoading, isError} = useGetPublishedCourseQuery();
 
  if(isError) return (
    <div className="bg-gray-50 dark:bg-[#141414] py-12">
      <div className="max-w-7xl mx-auto p-6 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-600 rounded-md p-6">
          <h3 className="text-red-600 dark:text-red-400 text-lg font-medium">Course Catalog Unavailable</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">The course catalog is temporarily unavailable. Please check back later or contact academic support.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-blue-50 dark:bg-blue-900/20 py-1 px-4 rounded-full mb-4">
            <span className="text-blue-700 dark:text-blue-400 text-sm font-medium">Spring Semester 2025</span>
          </div>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mb-3 text-center">Course Catalog</h2>
          <p className="text-slate-600 dark:text-slate-400 text-center max-w-2xl">
            Browse our comprehensive selection of accredited courses for the current academic term
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 mb-8 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">All Courses</button>
            <button className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600">Undergraduate</button>
            <button className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600">Graduate</button>
            <button className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600">Certificates</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            ) : (
              data?.courses && data.courses.map((course, index) => <Course key={index} course={course}/>) 
            )}
          </div>
        </div>
        
        {!isLoading && data?.courses?.length > 0 && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer">
              <span>View Full Academic Catalog</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden border border-blue-100 dark:border-blue-900/30 h-full flex flex-col group">
      <div className="relative">
        <Skeleton className="w-full h-40 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-slate-700 dark:to-slate-600" />
        <div className="absolute top-3 right-3">
          <Skeleton className="h-8 w-8 rounded-full bg-blue-200/70 dark:bg-blue-700/30" />
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-4 w-16 rounded-full bg-indigo-100 dark:bg-indigo-800/30" />
          <Skeleton className="h-4 w-12 rounded-full bg-green-100 dark:bg-green-800/30" />
        </div>
        
        <Skeleton className="h-6 w-5/6 mb-2 bg-gray-200 dark:bg-gray-600" />
        <Skeleton className="h-4 w-full mb-1 bg-gray-100 dark:bg-gray-700" />
        <Skeleton className="h-4 w-3/4 mb-4 bg-gray-100 dark:bg-gray-700" />
        
        <div className="mt-auto pt-3 border-t border-blue-100 dark:border-blue-900/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800/30" />
              <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-600" />
            </div>
            <Skeleton className="h-8 w-24 rounded-md bg-blue-200 dark:bg-blue-700/30" />
          </div>
        </div>
      </div>
    </div>
  );
};
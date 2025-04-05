import React from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <h1 className="text-center text-red-500 font-semibold mt-10">
        Failed to get purchased courses.
      </h1>
    );

  const { purchasedCourse } = data || [];

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));

  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );

  const totalSales = purchasedCourse.length;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {/* Total Sales */}
      <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 border dark:border-gray-700">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            {totalSales}
          </p>
        </CardContent>
      </Card>

      {/* Total Revenue */}
      <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 border dark:border-gray-700">
        <CardHeader>
          <CardTitle>Learning Fund</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-extrabold text-green-600 dark:text-green-400">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 border dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Course Prices Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {courseData.length === 0 ? (
            <p className="text-sm text-gray-500">No data to display.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis
                  stroke="#6b7280"
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  formatter={(value) => [`₹${value}`, "Price"]}
                  labelStyle={{ color: "#333" }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ stroke: "#3b82f6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

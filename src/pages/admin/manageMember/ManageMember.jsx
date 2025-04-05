import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useGetMembersQuery } from "@/features/api/authApi";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";

const MembersManagement = () => {
  const { data: membersData, error, isLoading } = useGetMembersQuery();
  const [selectedRole, setSelectedRole] = useState("student");
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  if (isLoading)
    return <Loader2 className="h-8 w-8 animate-spin mx-auto text-white" />;

  if (error) {
    toast.error("Error fetching members");
  }

  const students = membersData?.students || [];
  const teachers = membersData?.teachers || [];

  const handleAddMember = () => {
    navigate("/admin/add/member");
  };

  const handleDeleteMember = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/user/delete/${userId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = res.data;
      toast.success(data.message);
      window.location.reload();
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 rounded-md bg-gray-900 min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <Select
          value={selectedRole}
          onValueChange={handleRoleChange}
          className="w-full md:w-48 bg-gray-700 text-white border border-gray-600 rounded-md shadow-md"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Students</SelectItem>
            <SelectItem value="instructor">Instructors</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={handleAddMember}
          className="w-full md:w-auto bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add New Member
        </Button>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-6 text-white">
          {selectedRole === "student" ? "Students" : "Instructors"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedRole === "student"
            ? students.map((student) => (
                <Card
                  key={student._id}
                  className="border border-gray-800 bg-gray-800 shadow-lg rounded-lg hover:shadow-2xl transition duration-300"
                >
                  <CardHeader className="bg-blue-800 p-4 rounded-t-lg relative">
                    <Button
                      className="w-8 h-8 absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleDeleteMember(student._id, "student")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <CardTitle className="text-xl font-semibold text-white">
                      {student.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {student.email}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-gray-300">
                      <strong>Registration Number: </strong>
                      {student.regNo || "N/A"}
                    </p>
                    <p className="text-gray-300">
                      <strong>Enrolled Courses: </strong>
                      {student.enrolledCourses.length}
                    </p>
                    <p className="text-gray-500">
                      <strong>Created At: </strong>
                      {new Date(student.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-500">
                      <strong>Updated At: </strong>
                      {new Date(student.updatedAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            : teachers.map((teacher) => (
                <Card
                  key={teacher._id}
                  className="border border-gray-800 bg-gray-800 shadow-lg rounded-lg hover:shadow-2xl transition duration-300"
                >
                  <CardHeader className="bg-red-800 p-4 rounded-t-lg relative">
                    <Button
                      className="w-8 h-8 absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleDeleteMember(teacher._id, "instructor")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <CardTitle className="text-xl font-semibold text-white">
                      {teacher.name || "Unknown"}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {teacher.email}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-gray-300">
                      <strong>Role: </strong>
                      {teacher.role}
                    </p>
                    <p className="text-gray-500">
                      <strong>Created At: </strong>
                      {new Date(teacher.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-500">
                      <strong>Updated At: </strong>
                      {new Date(teacher.updatedAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MembersManagement;
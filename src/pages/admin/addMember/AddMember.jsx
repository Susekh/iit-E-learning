import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAddMemberMutation } from "@/features/api/authApi";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const AddMember = () => {
  const [memberInput, setMemberInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    regNo: "",
  });

  const [addMember, { data, error, isLoading, isSuccess }] =
    useAddMemberMutation();
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setMemberInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMember = async () => {
    const { name, email, password, role, regNo } = memberInput;

    if (!name || !email || !password || !role) {
      toast.error("Please fill in all fields");
      return;
    }

    if (role === "student" && !regNo) {
      toast.error("Registration number is required for students");
      return;
    }

    await addMember({ name, email, password, role, regNo });
  };

  if (isSuccess && data) {
    toast.success(data?.message || "Member added successfully!");
  }

  if (error) {
    toast.error(error?.data?.message || "Failed to add member");
  }

  return (
    <div className="flex items-center rounded-lg justify-center min-h-screen px-4 bg-gradient-to-b from-white to-blue-50 dark:from-[#121212] dark:to-[#1a1a1a]">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border dark:border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">Add New Member</CardTitle>
          <CardDescription>
            Fill in the details to add a new student or instructor.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={memberInput.name}
              onChange={changeInputHandler}
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={memberInput.email}
              onChange={changeInputHandler}
              placeholder="john@example.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={memberInput.password}
              onChange={changeInputHandler}
              placeholder="••••••••"
            />
          </div>

          {/* Role */}
          <div className="space-y-1">
            <Label htmlFor="role">Role</Label>
            <Select
              name="role"
              value={memberInput.role}
              onValueChange={(value) =>
                setMemberInput({ ...memberInput, role: value })
              }
            >
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Registration Number (only if role is student) */}
          {memberInput.role === "student" && (
            <div className="space-y-1">
              <Label htmlFor="regNo">Registration Number</Label>
              <Input
                id="regNo"
                type="text"
                name="regNo"
                value={memberInput.regNo}
                onChange={changeInputHandler}
                placeholder="e.g., 2024-CS-123"
              />
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button
            disabled={isLoading}
            onClick={handleAddMember}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Add Member"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddMember;

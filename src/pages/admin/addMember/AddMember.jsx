import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAddMemberMutation } from "@/features/api/authApi";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const AddMember = () => {
  const [memberInput, setMemberInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // Default role, can be changed by the form
    regNo: "", // Registration Number state
  });

  const [addMember, { data, error, isLoading, isSuccess }] = useAddMemberMutation();
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
    <div className="flex items-center justify-center mt-20">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Add Member</CardTitle>
          <CardDescription>Add a new instructor or student.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Name Input */}
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={memberInput.name}
              onChange={changeInputHandler}
              placeholder="Enter name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={memberInput.email}
              onChange={changeInputHandler}
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={memberInput.password}
              onChange={changeInputHandler}
              placeholder="Enter password"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="space-y-1">
            <Label htmlFor="role">Role</Label>
            <Select
              name="role"
              value={memberInput.role}
              onValueChange={(value) => setMemberInput({ ...memberInput, role: value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-600 dark:bg-[#2c2c3e] dark:text-white dark:border-[#3f3f4a]"
            >
              <SelectTrigger className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-600 dark:bg-[#2c2c3e] dark:text-white">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Registration Number (only for students) */}
          {memberInput.role === "student" && (
            <div className="space-y-1">
              <Label htmlFor="regNo">Registration Number</Label>
              <Input
                type="text"
                name="regNo"
                value={memberInput.regNo}
                onChange={changeInputHandler}
                placeholder="Enter registration number"
                required={memberInput.role === "student"}
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button disabled={isLoading} onClick={handleAddMember}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
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

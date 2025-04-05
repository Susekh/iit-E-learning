import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    { data: updatedData, isLoading: isUpdating, isError, error, isSuccess },
  ] = useUpdateUserMutation();

  const user = data?.user;

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updatedData?.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile.");
    }
  }, [isSuccess, isError]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  if (isLoading) {
    return <h2 className="text-center mt-10 text-muted-foreground">Loading profile...</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center md:text-left mb-6">Profile</h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <Avatar className="h-28 w-28 md:h-32 md:w-32 shadow">
          <AvatarImage
            src={user?.photoUrl || "https://github.com/shadcn.png"}
            alt={user?.name || "User"}
          />
          <AvatarFallback>{user?.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
        </Avatar>

        <div className="w-full">
          <div className="mb-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100">Name:</span>{" "}
            <span className="text-gray-700 dark:text-gray-300 ml-2">{user?.name}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100">Email:</span>{" "}
            <span className="text-gray-700 dark:text-gray-300 ml-2">{user?.email}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100">Role:</span>{" "}
            <span className="text-gray-700 dark:text-gray-300 ml-2">{user?.role?.toUpperCase()}</span>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-3">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your name or profile picture below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="photo">Profile Photo</Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={onChangeHandler}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={isUpdating} onClick={updateUserHandler}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Courses You're Enrolled In</h2>
        {user?.enrolledCourses?.length === 0 ? (
          <p className="text-muted-foreground">You're not enrolled in any courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user?.enrolledCourses?.map((course) => (
              <Course course={course} key={course._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

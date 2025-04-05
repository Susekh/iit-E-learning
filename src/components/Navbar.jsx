import { Menu, School, User, BookOpen, Edit, LogOut, LayoutDashboard, UserPlus } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  
  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logged out successfully");
      window.location.reload();
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <header className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-50 shadow-sm">
      {/* Desktop Navigation */}
      <div className="container px-4 mx-auto hidden md:flex justify-between items-center h-full">
        <div className="flex items-center gap-2">
          <School size={30} className="text-primary" />
          <Link to="/" className="flex items-center">
            <h1 className="font-extrabold text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              E-Learning
            </h1>
          </Link>
        </div>
        
        {/* User controls */}
        <div className="flex items-center gap-4">
          <DarkMode />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoUrl} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase() || <User size={16} />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="my-learning" className="w-full flex items-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      My Learning
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="profile" className="w-full flex items-center">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                
                {(user?.role === "instructor" || user?.role === "admin") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin/dashboard" className="w-full flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                
                {user?.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin/add/member" className="w-full flex items-center">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Members
                    </Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutHandler} className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button size="sm" onClick={() => navigate("/signup")}>
                Admin sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link to="/" className="flex items-center gap-2">
          <School size={24} className="text-primary" />
          <h1 className="font-extrabold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            E-Learning
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <DarkMode />
          <MobileNavbar user={user} logoutHandler={logoutHandler} />
        </div>
      </div>
    </header>
  );
};

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-primary">E-Learning</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 py-6">
          {user ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b">
                <Avatar>
                  <AvatarImage src={user?.photoUrl} />
                  <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{user?.name}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              
              <nav className="space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate("/my-learning")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  My Learning
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate("/profile")}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                
                {(user?.role === "instructor" || user?.role === "admin") && (
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                )}
                
                {user?.role === "admin" && (
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate("/admin/add/member")}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Members
                  </Button>
                )}
              </nav>
            </div>
          ) : (
            <div className="space-y-4">
              <Button 
                className="w-full" 
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate("/signup")}
              >
                Admin sign Up
              </Button>
            </div>
          )}
        </div>
        
        {user && (
          <SheetFooter>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={logoutHandler}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
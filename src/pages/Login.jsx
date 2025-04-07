import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoginInput {
  email: string;
  password: string;
}

const Login = () => {
  const [loginInput, setLoginInput] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleLogin = async () => {
    await loginUser(loginInput);
  };

  useEffect(() => {
    if (loginIsSuccess) {
      const { message } = loginData || {}; // optional chaining
      toast.success(message || "Login successful.");
      navigate("/"); // Redirect to the home page or any other page after successful login
    }
    if (loginError) {
      const errorMessage = loginError.data?.message || "Login failed";
      toast.error(errorMessage);
    }
  }, [loginIsSuccess, loginData, loginError, navigate]);

  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login with your email and password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={loginInput.email}
              onChange={changeInputHandler}
              placeholder="Eg. patel@gmail.com"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={loginInput.password}
              onChange={changeInputHandler}
              placeholder="Eg. xyz"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={loginIsLoading} onClick={handleLogin}>
            {loginIsLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Login"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

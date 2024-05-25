import { LoginForm } from "@/components/auth/login-form";

const LoginPage = async () => {
  
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-transparent">
        <LoginForm />
    </div>
  );
};

export default LoginPage;

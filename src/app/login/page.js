"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input, Button } from "@heroui/react";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message || "Invalid email or password.");
      } else {
        router.push("/");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (err) {
      setErrorMsg("Google login failed.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-surface-secondary">
      <div className="light w-full max-w-md bg-white text-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-200">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-zinc-500">Sign in to your Mango Books account.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm text-center border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700">Email Address</label>
            <Input
              type="email"
              variant="bordered"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700">Password</label>
            <Input
              type="password"
              variant="bordered"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            color="primary" 
            size="lg" 
            className="w-full mt-4 font-semibold shadow-md"
            isLoading={loading}
          >
            Login
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-zinc-500">Or continue with</span>
          </div>
        </div>

        <Button 
          variant="bordered" 
          size="lg" 
          className="w-full flex items-center gap-2 border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 transition-colors"
          onClick={handleGoogleLogin}
          isLoading={loading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </Button>

        <p className="text-center text-sm text-zinc-500 mt-8">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline font-semibold">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}
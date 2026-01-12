"use client";

import { useAuth } from "@/lib/auth";
import { setAuthCookie } from "@/lib/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader, LockIcon, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "./schema/login-form-schema";

export default function LoginForm() {
  const router = useRouter();
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (loginData: LoginFormValues) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      await setAuthCookie(data.token);

      setAuth({ ...data.user, token: data.token }, data.token);

      router.push("/admin");
    } catch (err) {
      const error = err as Error;
      setError("root", {
        message: error.message || "An unexpected error occurred",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Mail />
          </div>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
              errors.email
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
            placeholder="name@company.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <LockIcon />
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
              errors.password
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      {errors.root && (
        <div className="p-3 rounded-md bg-red-50 border border-red-200 flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm">{errors.root.message}</span>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`group w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue bg-tgs-blue hover:bg-tgs-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tgs-blue transition-all duration-200 shadow-md ${
            isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:shadow-lg"
          }`}
        >
          {isSubmitting ? <Loader className="animate-spin" /> : "Sign in"}
        </button>
      </div>
    </form>
  );
}

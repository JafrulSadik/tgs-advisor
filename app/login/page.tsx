import { getAuthToken } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import LoginForm from "./components/login-form";

export default async function LoginScreen() {
  const token = await getAuthToken();

  if (token) {
    redirect("/admin");
  }

  return (
    <div className="grid grid-cols-12 h-screen w-full bg-white">
      <div className="hidden md:col-span-6 bg-blue md:grid justify-center items-center">
        <div className="flex flex-col justify-center items-center p-8 md:p-16 relative">
          <div className="text-4xl lg:text-5xl font-bold leading-[103%]">
            <h1 className="text-center text-white">TGS</h1>
            <h1 className="text-center text-yellow">ADVISOR</h1>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form (50%) */}
      <div className="col-span-12 md:col-span-6 flex flex-col justify-center items-center p-8 md:p-16 relative">
        {/* Mobile Header (Visible only on small screens) */}
        <div className="md:hidden mb-8 text-center">
          <h1 className="text-3xl font-bold text-tgs-blue mb-2">TGS ADVISOR</h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-md">
          <div className="mb-10 hidden md:block">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 mt-2">
              Please enter your details to sign in.
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} TGS Advisor. All rights reserved.
        </div>
      </div>
    </div>
  );
}

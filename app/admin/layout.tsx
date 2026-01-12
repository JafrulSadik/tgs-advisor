import { getAuthToken } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-64 min-h-screen p-8 transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Welcome to the TGS Advisor admin panel. Manage your website content
          here.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Services</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Team Members</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Gallery Images</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">24</p>
        </div>
      </div>
    </div>
  );
}

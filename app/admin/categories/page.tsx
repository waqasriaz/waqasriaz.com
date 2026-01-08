import AdminSidebar from "@/components/admin/AdminSidebar";
import CategoryForm from "@/components/admin/blog/CategoryForm";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-600 mt-1">
            Manage blog post categories
          </p>
        </div>

        <CategoryForm />
      </main>
    </div>
  );
}

import AdminSidebar from "@/components/admin/AdminSidebar";
import TagForm from "@/components/admin/blog/TagForm";

export default function TagsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />

      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Tags</h1>
          <p className="text-slate-600 mt-1">
            Manage blog post tags
          </p>
        </div>

        <TagForm />
      </main>
    </div>
  );
}

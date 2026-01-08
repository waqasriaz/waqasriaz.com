import AdminSidebar from "@/components/admin/AdminSidebar";
import PostForm from "@/components/admin/blog/PostForm";

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <PostForm />
      </main>
    </div>
  );
}

import AdminSidebar from "@/components/admin/AdminSidebar";
import PostForm from "@/components/admin/blog/PostForm";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <PostForm postId={id} />
      </main>
    </div>
  );
}

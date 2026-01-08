"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";
import FeaturedImageUpload from "./FeaturedImageUpload";
import PublishSettings from "./PublishSettings";

interface Category {
  _id: string;
  name: string;
  slug: string;
  color: string;
}

interface Tag {
  _id: string;
  name: string;
  slug: string;
}

interface PostFormProps {
  postId?: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function PostForm({ postId }: PostFormProps) {
  const router = useRouter();
  const isEditing = !!postId;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [status, setStatus] = useState<
    "draft" | "pending" | "scheduled" | "published"
  >("draft");
  const [scheduledFor, setScheduledFor] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [savingTag, setSavingTag] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          fetch("/api/admin/categories"),
          fetch("/api/admin/tags"),
        ]);

        const categoriesData = await categoriesRes.json();
        const tagsData = await tagsRes.json();

        setCategories(categoriesData.categories || []);
        setAvailableTags(tagsData.tags || []);

        if (postId) {
          const postRes = await fetch(`/api/admin/blog/${postId}`);
          if (postRes.ok) {
            const post = await postRes.json();
            setTitle(post.title);
            setSlug(post.slug);
            setExcerpt(post.excerpt);
            setContent(post.content);
            setFeaturedImage(post.featuredImage || "");
            setFeaturedImageAlt(post.featuredImageAlt || "");
            setSelectedCategories(post.categories?.map((c: Category | string) => typeof c === 'string' ? c : c._id) || []);
            setStatus(post.status);
            setScheduledFor(
              post.scheduledFor
                ? new Date(post.scheduledFor).toISOString().slice(0, 16)
                : ""
            );
            setMetaTitle(post.metaTitle || "");
            setMetaDescription(post.metaDescription || "");
            setSelectedTags(post.tags?.map((t: Tag | string) => typeof t === 'string' ? t : t._id) || []);
            setSlugManuallyEdited(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [postId]);

  useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slugManuallyEdited]);

  function handleCategoryCreated(newCategory: Category) {
    setCategories([...categories, newCategory]);
    setSelectedCategories([...selectedCategories, newCategory._id]);
  }

  async function createTag() {
    if (!newTagName.trim()) return;

    // Split by comma and filter empty strings
    const tagNames = newTagName
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (tagNames.length === 0) return;

    setSavingTag(true);
    const newTagIds: string[] = [];
    const newTags: Tag[] = [];

    try {
      for (const tagName of tagNames) {
        // Check if tag already exists
        const existingTag = availableTags.find(
          (t) => t.name.toLowerCase() === tagName.toLowerCase()
        );

        if (existingTag) {
          // Tag exists, just select it if not already selected
          if (!selectedTags.includes(existingTag._id)) {
            newTagIds.push(existingTag._id);
          }
          continue;
        }

        // Create new tag
        const response = await fetch("/api/admin/tags", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: tagName,
            slug: generateSlug(tagName),
          }),
        });

        if (response.ok) {
          const newTag = await response.json();
          newTags.push(newTag);
          newTagIds.push(newTag._id);
        }
      }

      if (newTags.length > 0) {
        setAvailableTags([...availableTags, ...newTags]);
      }
      if (newTagIds.length > 0) {
        setSelectedTags([...selectedTags, ...newTagIds]);
      }
      setNewTagName("");
    } catch (error) {
      console.error("Failed to create tags:", error);
      alert("Failed to create tags");
    } finally {
      setSavingTag(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !slug.trim() || !excerpt.trim() || !content.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setSaving(true);

    try {
      const postData = {
        title,
        slug,
        excerpt,
        content,
        featuredImage: featuredImage || undefined,
        featuredImageAlt: featuredImageAlt || undefined,
        categories: selectedCategories,
        tags: selectedTags,
        status,
        scheduledFor: scheduledFor || undefined,
        metaTitle: metaTitle || undefined,
        metaDescription: metaDescription || undefined,
      };

      const url = isEditing ? `/api/admin/blog/${postId}` : "/api/admin/blog";
      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Failed to save post");
        return;
      }

      router.push("/admin/blog");
    } catch (error) {
      console.error("Failed to save post:", error);
      alert("Failed to save post");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#5b21b6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {isEditing ? "Edit Post" : "New Post"}
          </h1>
          <p className="text-slate-600 mt-1">
            {isEditing
              ? "Update your blog post"
              : "Create a new blog post"}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/blog")}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Slug *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setSlugManuallyEdited(true);
                    }}
                    placeholder="post-url-slug"
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Write a short summary of the post..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tags
                </label>
                {availableTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {availableTags.map((tag) => {
                      const isSelected = selectedTags.includes(tag._id);
                      return (
                        <button
                          key={tag._id}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedTags(selectedTags.filter((id) => id !== tag._id));
                            } else {
                              setSelectedTags([...selectedTags, tag._id]);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            isSelected
                              ? "bg-[#5b21b6] text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {tag.name}
                        </button>
                      );
                    })}
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), createTag())}
                    placeholder="Add tags (comma separated)..."
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={createTag}
                    disabled={savingTag || !newTagName.trim()}
                    className="px-3 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50"
                    title="Add tag"
                  >
                    {savingTag ? (
                      <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Click to select/deselect. Add multiple tags with commas.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-4">
              Content *
            </label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <PublishSettings
              status={status}
              scheduledFor={scheduledFor}
              selectedCategories={selectedCategories}
              categories={categories}
              metaTitle={metaTitle}
              metaDescription={metaDescription}
              onStatusChange={setStatus}
              onScheduledForChange={setScheduledFor}
              onCategoriesChange={setSelectedCategories}
              onCategoryCreated={handleCategoryCreated}
              onMetaTitleChange={setMetaTitle}
              onMetaDescriptionChange={setMetaDescription}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <FeaturedImageUpload
              value={featuredImage}
              alt={featuredImageAlt}
              onChange={setFeaturedImage}
              onAltChange={setFeaturedImageAlt}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

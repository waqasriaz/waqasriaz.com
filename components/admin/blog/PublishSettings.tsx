"use client";

interface Category {
  _id: string;
  name: string;
  slug: string;
  color: string;
}

interface PublishSettingsProps {
  status: "draft" | "pending" | "scheduled" | "published";
  scheduledFor?: string;
  category?: string;
  categories: Category[];
  metaTitle?: string;
  metaDescription?: string;
  onStatusChange: (status: "draft" | "pending" | "scheduled" | "published") => void;
  onScheduledForChange: (date: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onMetaTitleChange: (title: string) => void;
  onMetaDescriptionChange: (description: string) => void;
}

export default function PublishSettings({
  status,
  scheduledFor,
  category,
  categories,
  metaTitle,
  metaDescription,
  onStatusChange,
  onScheduledForChange,
  onCategoryChange,
  onMetaTitleChange,
  onMetaDescriptionChange,
}: PublishSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Status
        </label>
        <select
          value={status}
          onChange={(e) =>
            onStatusChange(
              e.target.value as "draft" | "pending" | "scheduled" | "published"
            )
          }
          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all"
        >
          <option value="draft">Draft</option>
          <option value="pending">Pending Review</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
        </select>
      </div>

      {status === "scheduled" && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Schedule For
          </label>
          <input
            type="datetime-local"
            value={scheduledFor || ""}
            onChange={(e) => onScheduledForChange(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Category
        </label>
        <select
          value={category || ""}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all"
        >
          <option value="">No Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-medium text-slate-900 mb-4">
          SEO Settings
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Meta Title
            </label>
            <input
              type="text"
              value={metaTitle || ""}
              onChange={(e) => onMetaTitleChange(e.target.value)}
              placeholder="Leave empty to use post title"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all"
            />
            <p className="text-xs text-slate-500 mt-1">
              {(metaTitle || "").length}/60 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Meta Description
            </label>
            <textarea
              value={metaDescription || ""}
              onChange={(e) => onMetaDescriptionChange(e.target.value)}
              placeholder="Leave empty to use post excerpt"
              rows={3}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all resize-none"
            />
            <p className="text-xs text-slate-500 mt-1">
              {(metaDescription || "").length}/160 characters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  color: string;
}

interface PublishSettingsProps {
  status: "draft" | "pending" | "scheduled" | "published";
  scheduledFor?: string;
  selectedCategories: string[];
  categories: Category[];
  metaTitle?: string;
  metaDescription?: string;
  onStatusChange: (status: "draft" | "pending" | "scheduled" | "published") => void;
  onScheduledForChange: (date: string) => void;
  onCategoriesChange: (categoryIds: string[]) => void;
  onCategoryCreated: (category: Category) => void;
  onMetaTitleChange: (title: string) => void;
  onMetaDescriptionChange: (description: string) => void;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function PublishSettings({
  status,
  scheduledFor,
  selectedCategories,
  categories,
  metaTitle,
  metaDescription,
  onStatusChange,
  onScheduledForChange,
  onCategoriesChange,
  onCategoryCreated,
  onMetaTitleChange,
  onMetaDescriptionChange,
}: PublishSettingsProps) {
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [savingCategory, setSavingCategory] = useState(false);

  function toggleCategory(categoryId: string) {
    if (selectedCategories.includes(categoryId)) {
      onCategoriesChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onCategoriesChange([...selectedCategories, categoryId]);
    }
  }

  async function createCategory() {
    if (!newCategoryName.trim()) return;

    setSavingCategory(true);
    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCategoryName.trim(),
          slug: generateSlug(newCategoryName),
        }),
      });

      if (response.ok) {
        const newCategory = await response.json();
        onCategoryCreated(newCategory);
        setNewCategoryName("");
        setShowNewCategory(false);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create category");
      }
    } catch (error) {
      console.error("Failed to create category:", error);
      alert("Failed to create category");
    } finally {
      setSavingCategory(false);
    }
  }

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
          Categories
        </label>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((cat) => {
              const isSelected = selectedCategories.includes(cat._id);
              return (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => toggleCategory(cat._id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isSelected
                      ? "text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  style={isSelected ? { backgroundColor: cat.color } : undefined}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowNewCategory(!showNewCategory)}
          className="text-sm text-[#5b21b6] hover:underline flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add new category
        </button>
        {showNewCategory && (
          <div className="mt-3 p-3 bg-slate-50 rounded-xl space-y-3">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), createCategory())}
              placeholder="Category name"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-[#5b21b6] focus:ring-2 focus:ring-[#5b21b6]/20 outline-none transition-all text-sm"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={createCategory}
                disabled={savingCategory || !newCategoryName.trim()}
                className="flex-1 px-3 py-1.5 rounded-lg bg-[#5b21b6] text-white text-sm font-medium hover:bg-[#4c1d95] transition-colors disabled:opacity-50"
              >
                {savingCategory ? "Saving..." : "Add"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowNewCategory(false);
                  setNewCategoryName("");
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <p className="text-xs text-slate-500 mt-2">
          Click to select/deselect categories
        </p>
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

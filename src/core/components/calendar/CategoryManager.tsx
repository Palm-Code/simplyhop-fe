"use client";
import * as React from "react";
import clsx from "clsx";
import { EventCategory } from "./types";

export interface CategoryManagerProps {
  categories: EventCategory[];
  onCategoryCreate: (category: Omit<EventCategory, "id">) => void;
  onCategoryUpdate: (categoryId: string, updates: Partial<EventCategory>) => void;
  onCategoryDelete: (categoryId: string) => void;
  className?: string;
}

export const CategoryManager = ({
  categories,
  onCategoryCreate,
  onCategoryDelete,
  className,
}: CategoryManagerProps) => {
  const [isCreating, setIsCreating] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [newCategory, setNewCategory] = React.useState({
    name: "",
    color: "blue" as const,
    description: "",
    icon: "",
  });

  const colorOptions = [
    { value: "blue", label: "Blue", class: "bg-blue-500" },
    { value: "green", label: "Green", class: "bg-green-500" },
    { value: "red", label: "Red", class: "bg-red-500" },
    { value: "purple", label: "Purple", class: "bg-purple-500" },
    { value: "yellow", label: "Yellow", class: "bg-yellow-500" },
    { value: "indigo", label: "Indigo", class: "bg-indigo-500" },
    { value: "pink", label: "Pink", class: "bg-pink-500" },
    { value: "gray", label: "Gray", class: "bg-gray-500" },
  ];

  const iconOptions = [
    { value: "📅", label: "Calendar" },
    { value: "💼", label: "Work" },
    { value: "👥", label: "Meeting" },
    { value: "🎯", label: "Goal" },
    { value: "🏠", label: "Personal" },
    { value: "✈️", label: "Travel" },
    { value: "🎉", label: "Event" },
    { value: "📚", label: "Learning" },
    { value: "🏥", label: "Health" },
    { value: "🛒", label: "Shopping" },
  ];

  const handleCreateCategory = () => {
    if (newCategory.name.trim()) {
      onCategoryCreate({
        name: newCategory.name.trim(),
        color: newCategory.color,
        description: newCategory.description.trim() || undefined,
        icon: newCategory.icon || undefined,
      });
      setNewCategory({ name: "", color: "blue", description: "", icon: "" });
      setIsCreating(false);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm("Are you sure you want to delete this category? Events using this category will lose their category assignment.")) {
      onCategoryDelete(categoryId);
    }
  };

  return (
    <div className={clsx("bg-white rounded-lg border border-gray-200 p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Event Categories</h3>
        <button
          onClick={() => setIsCreating(true)}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Category
        </button>
      </div>

      {/* Create Category Form */}
      {isCreating && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-3">Create New Category</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name
              </label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter category name"
                autoComplete="off"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <div className="flex gap-2 flex-wrap">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setNewCategory(prev => ({ ...prev, color: color.value as any }))}
                    className={clsx(
                      "w-6 h-6 rounded-full border-2 transition-all",
                      color.class,
                      newCategory.color === color.value
                        ? "border-gray-900 scale-110"
                        : "border-gray-300 hover:scale-105"
                    )}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon (Optional)
              </label>
              <div className="flex gap-2 flex-wrap">
                {iconOptions.map((icon) => (
                  <button
                    key={icon.value}
                    onClick={() => setNewCategory(prev => ({ ...prev, icon: icon.value }))}
                    className={clsx(
                      "w-8 h-8 rounded border transition-all text-lg",
                      newCategory.icon === icon.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                    title={icon.label}
                  >
                    {icon.value}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this category"
                rows={2}
                autoComplete="off"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCreateCategory}
              disabled={!newCategory.name.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Create
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewCategory({ name: "", color: "blue", description: "", icon: "" });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-2">
        {categories.length === 0 && !isCreating && (
          <p className="text-gray-500 text-center py-4">
            No categories yet. Create your first category to organize events.
          </p>
        )}

        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={clsx("w-4 h-4 rounded-full", `bg-${category.color}-500`)} />
              {category.icon && (
                <span className="text-lg">{category.icon}</span>
              )}
              <div>
                <h4 className="font-medium text-gray-900">{category.name}</h4>
                {category.description && (
                  <p className="text-sm text-gray-600">{category.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setEditingId(editingId === category.id ? null : category.id)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded transition-colors"
                title="Edit category"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors"
                title="Delete category"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

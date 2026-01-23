"use client";
import * as React from "react";
import clsx from "clsx";

export interface TouchGestureProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const TouchGestureWrapper = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  children,
  className,
  disabled = false,
}: TouchGestureProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = React.useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<{ x: number; y: number } | null>(null);
  const [isPinching, setIsPinching] = React.useState(false);
  const [lastPinchDistance, setLastPinchDistance] = React.useState(0);

  const minSwipeDistance = 50;

  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;

    if (e.touches.length === 1) {
      setTouchEnd(null);
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    } else if (e.touches.length === 2 && onPinch) {
      setIsPinching(true);
      setLastPinchDistance(getTouchDistance(e.touches[0], e.touches[1]));
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled) return;

    if (e.touches.length === 2 && isPinching && onPinch) {
      const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / lastPinchDistance;
      onPinch(scale);
      setLastPinchDistance(currentDistance);
    } else if (e.touches.length === 1) {
      setTouchEnd({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }
  };

  const handleTouchEnd = () => {
    if (disabled || !touchStart || !touchEnd) {
      setIsPinching(false);
      return;
    }

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    const isUpSwipe = distanceY > minSwipeDistance;
    const isDownSwipe = distanceY < -minSwipeDistance;

    // Determine primary direction
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Horizontal swipe
      if (isLeftSwipe && onSwipeLeft) {
        onSwipeLeft();
      } else if (isRightSwipe && onSwipeRight) {
        onSwipeRight();
      }
    } else {
      // Vertical swipe
      if (isUpSwipe && onSwipeUp) {
        onSwipeUp();
      } else if (isDownSwipe && onSwipeDown) {
        onSwipeDown();
      }
    }

    setIsPinching(false);
  };

  return (
    <div
      ref={containerRef}
      className={clsx("touch-manipulation", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: disabled ? 'auto' : 'pan-y' }}
    >
      {children}
    </div>
  );
};

// Mobile-optimized event creation modal
export interface MobileEventModalProps {
  isOpen: boolean;
  selectedDate?: Date;
  onClose: () => void;
  onSave: (eventData: any) => void;
}

export const MobileEventModal = ({
  isOpen,
  selectedDate,
  onClose,
  onSave,
}: MobileEventModalProps) => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    isAllDay: false,
    startTime: "09:00",
    endTime: "10:00",
    color: "blue",
  });

  const [activeTab, setActiveTab] = React.useState<"basic" | "details">("basic");

  const handleSave = () => {
    if (formData.title.trim() && selectedDate) {
      onSave({
        ...formData,
        date: selectedDate,
        title: formData.title.trim(),
      });
      onClose();
      setFormData({
        title: "",
        description: "",
        isAllDay: false,
        startTime: "09:00",
        endTime: "10:00",
        color: "blue",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <h2 className="text-lg font-semibold">New Event</h2>
          <button
            onClick={handleSave}
            disabled={!formData.title.trim()}
            className="text-blue-600 font-medium disabled:text-gray-400"
          >
            Save
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("basic")}
            className={clsx(
              "flex-1 py-3 text-center font-medium",
              activeTab === "basic"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            )}
          >
            Basic Info
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={clsx(
              "flex-1 py-3 text-center font-medium",
              activeTab === "details"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            )}
          >
            Details
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter event title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="off"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  {selectedDate?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  All Day Event
                </label>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, isAllDay: !prev.isAllDay }))}
                  className={clsx(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    formData.isAllDay ? "bg-blue-600" : "bg-gray-200"
                  )}
                >
                  <span
                    className={clsx(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      formData.isAllDay ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {!formData.isAllDay && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoComplete="off"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Add description..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="off"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { value: "blue", class: "bg-blue-500" },
                    { value: "green", class: "bg-green-500" },
                    { value: "red", class: "bg-red-500" },
                    { value: "purple", class: "bg-purple-500" },
                    { value: "yellow", class: "bg-yellow-500" },
                    { value: "indigo", class: "bg-indigo-500" },
                    { value: "pink", class: "bg-pink-500" },
                    { value: "gray", class: "bg-gray-500" },
                  ].map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                      className={clsx(
                        "w-12 h-12 rounded-lg border-2 transition-all",
                        color.class,
                        formData.color === color.value
                          ? "border-gray-900 scale-110"
                          : "border-gray-300"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

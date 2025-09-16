"use client";
import * as React from "react";
import clsx from "clsx";
import { CalendarEvent } from "./types";

export interface CalendarShare {
  id: string;
  name: string;
  shareType: "public" | "private" | "protected";
  permissions: "view" | "edit" | "admin";
  expiresAt?: Date;
  password?: string;
  events: CalendarEvent[];
  createdAt: Date;
  accessCount: number;
}

export interface SharingFeaturesProps {
  events: CalendarEvent[];
  existingShares: CalendarShare[];
  onCreateShare: (share: Omit<CalendarShare, "id" | "createdAt" | "accessCount">) => void;
  onUpdateShare: (shareId: string, updates: Partial<CalendarShare>) => void;
  onDeleteShare: (shareId: string) => void;
  className?: string;
}

export const SharingFeatures = ({
  events,
  existingShares,
  onCreateShare,
  onUpdateShare,
  onDeleteShare,
  className,
}: SharingFeaturesProps) => {
  const [isCreating, setIsCreating] = React.useState(false);
  const [selectedEvents, setSelectedEvents] = React.useState<string[]>([]);
  const [shareSettings, setShareSettings] = React.useState({
    name: "",
    shareType: "public" as "public" | "private" | "protected",
    permissions: "view" as "view" | "edit" | "admin",
    password: "",
    expiresAt: "",
    includeAllEvents: true,
  });

  const handleCreateShare = () => {
    if (shareSettings.name.trim()) {
      const eventsToShare = shareSettings.includeAllEvents 
        ? events 
        : events.filter(event => selectedEvents.includes(event.id));

      onCreateShare({
        name: shareSettings.name.trim(),
        shareType: shareSettings.shareType,
        permissions: shareSettings.permissions,
        password: shareSettings.shareType === "protected" ? shareSettings.password : undefined,
        expiresAt: shareSettings.expiresAt ? new Date(shareSettings.expiresAt) : undefined,
        events: eventsToShare,
      });

      // Reset form
      setShareSettings({
        name: "",
        shareType: "public",
        permissions: "view",
        password: "",
        expiresAt: "",
        includeAllEvents: true,
      });
      setSelectedEvents([]);
      setIsCreating(false);
    }
  };

  const generateShareUrl = (share: CalendarShare) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/calendar/shared/${share.id}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Copied to clipboard!");
    }
  };

  const generateEmbedCode = (share: CalendarShare) => {
    const shareUrl = generateShareUrl(share);
    return `<iframe src="${shareUrl}?embed=true" width="800" height="600" frameborder="0"></iframe>`;
  };

  const shareViaEmail = (share: CalendarShare) => {
    const shareUrl = generateShareUrl(share);
    const subject = encodeURIComponent(`Calendar Share: ${share.name}`);
    const body = encodeURIComponent(`
I'm sharing my calendar "${share.name}" with you.

You can view it here: ${shareUrl}

${share.shareType === "protected" && share.password ? `Password: ${share.password}` : ""}

This share includes ${share.events.length} events and gives you ${share.permissions} access.
    `.trim());
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const getShareTypeIcon = (shareType: CalendarShare["shareType"]) => {
    switch (shareType) {
      case "public": return "🌐";
      case "private": return "🔒";
      case "protected": return "🔐";
      default: return "📅";
    }
  };

  const getPermissionIcon = (permission: CalendarShare["permissions"]) => {
    switch (permission) {
      case "view": return "👁️";
      case "edit": return "✏️";
      case "admin": return "👑";
      default: return "👁️";
    }
  };

  return (
    <div className={clsx("bg-white rounded-lg border border-gray-200 p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Calendar Sharing</h3>
        <button
          onClick={() => setIsCreating(true)}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Share
        </button>
      </div>

      {/* Create Share Form */}
      {isCreating && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-medium text-gray-900 mb-3">Create New Share</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Share Name
              </label>
              <input
                type="text"
                value={shareSettings.name}
                onChange={(e) => setShareSettings(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Team Calendar, Project Timeline"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Share Type
                </label>
                <select
                  value={shareSettings.shareType}
                  onChange={(e) => setShareSettings(prev => ({ 
                    ...prev, 
                    shareType: e.target.value as any 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="public">🌐 Public (Anyone with link)</option>
                  <option value="protected">🔐 Password Protected</option>
                  <option value="private">🔒 Private (Invite only)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permissions
                </label>
                <select
                  value={shareSettings.permissions}
                  onChange={(e) => setShareSettings(prev => ({ 
                    ...prev, 
                    permissions: e.target.value as any 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="view">👁️ View Only</option>
                  <option value="edit">✏️ Can Edit Events</option>
                  <option value="admin">👑 Full Admin Access</option>
                </select>
              </div>
            </div>

            {shareSettings.shareType === "protected" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={shareSettings.password}
                  onChange={(e) => setShareSettings(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter password for access"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date (Optional)
              </label>
              <input
                type="datetime-local"
                value={shareSettings.expiresAt}
                onChange={(e) => setShareSettings(prev => ({ ...prev, expiresAt: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={shareSettings.includeAllEvents}
                  onChange={(e) => setShareSettings(prev => ({ 
                    ...prev, 
                    includeAllEvents: e.target.checked 
                  }))}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Include all events</span>
              </label>
            </div>

            {!shareSettings.includeAllEvents && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Events to Share
                </label>
                <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                  {events.map((event) => (
                    <label key={event.id} className="flex items-center py-1">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEvents(prev => [...prev, event.id]);
                          } else {
                            setSelectedEvents(prev => prev.filter(id => id !== event.id));
                          }
                        }}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        {event.title} - {new Date(event.date).toLocaleDateString()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleCreateShare}
              disabled={!shareSettings.name.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Create Share
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setShareSettings({
                  name: "",
                  shareType: "public",
                  permissions: "view",
                  password: "",
                  expiresAt: "",
                  includeAllEvents: true,
                });
                setSelectedEvents([]);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Existing Shares */}
      <div className="space-y-4">
        {existingShares.length === 0 && !isCreating && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🔗</div>
            <h4 className="font-medium text-gray-900 mb-1">No shares yet</h4>
            <p className="text-sm">Create your first calendar share to collaborate with others.</p>
          </div>
        )}

        {existingShares.map((share) => (
          <div
            key={share.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getShareTypeIcon(share.shareType)}</span>
                  <h4 className="font-medium text-gray-900">{share.name}</h4>
                  <span className="text-lg">{getPermissionIcon(share.permissions)}</span>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-4">
                    <span>📅 {share.events.length} events</span>
                    <span>👥 {share.accessCount} views</span>
                    <span>📅 Created {new Date(share.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {share.expiresAt && (
                    <div className="flex items-center gap-1">
                      <span>⏰ Expires {new Date(share.expiresAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => copyToClipboard(generateShareUrl(share))}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-md hover:bg-blue-200 transition-colors"
                  >
                    📋 Copy Link
                  </button>
                  
                  <button
                    onClick={() => copyToClipboard(generateEmbedCode(share))}
                    className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-md hover:bg-green-200 transition-colors"
                  >
                    🔗 Embed Code
                  </button>
                  
                  <button
                    onClick={() => shareViaEmail(share)}
                    className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-md hover:bg-purple-200 transition-colors"
                  >
                    📧 Email Share
                  </button>
                  
                  <button
                    onClick={() => {
                      const url = generateShareUrl(share);
                      window.open(url, "_blank");
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-md hover:bg-gray-200 transition-colors"
                  >
                    👁️ Preview
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1 ml-4">
                <button
                  onClick={() => {
                    const isActive = !share.expiresAt || new Date(share.expiresAt) > new Date();
                    const newExpiry = isActive 
                      ? new Date() // Disable by setting expiry to now
                      : undefined; // Enable by removing expiry
                    onUpdateShare(share.id, { expiresAt: newExpiry });
                  }}
                  className={clsx(
                    "px-2 py-1 rounded text-xs font-medium transition-colors",
                    (!share.expiresAt || new Date(share.expiresAt) > new Date())
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-red-100 text-red-800 hover:bg-red-200"
                  )}
                >
                  {(!share.expiresAt || new Date(share.expiresAt) > new Date()) ? "Active" : "Expired"}
                </button>
                
                <button
                  onClick={() => onDeleteShare(share.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors"
                  title="Delete share"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sharing Tips */}
      {existingShares.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">📌 Sharing Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Public links can be accessed by anyone who has the URL</li>
            <li>• Password-protected shares require a password to view</li>
            <li>• Private shares require explicit permission to access</li>
            <li>• Embed codes can be used in websites or blogs</li>
            <li>• Set expiration dates for temporary access</li>
            <li>• View permissions allow read-only access</li>
            <li>• Edit permissions allow creating and modifying events</li>
          </ul>
        </div>
      )}
    </div>
  );
};

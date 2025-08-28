import React from "react";

export default function Notification({type = "error", message, onClose}) {
    if (!message) return null;

    const base =
        "fixed right-4 top-4 z-50 min-w-[260px] max-w-[90vw] px-4 py-3 rounded shadow-lg flex items-start gap-3";
    const byType = {
        error: "bg-red-50 text-red-800 border border-red-200",
        success: "bg-green-50 text-green-800 border border-green-200",
        info: "bg-blue-50 text-blue-800 border border-blue-200",
        warning: "bg-yellow-50 text-yellow-800 border border-yellow-200",
    };

    return (
        <div className={`${base} ${byType[type] || byType.error}`} role="alert">
            <div className="flex-1 whitespace-pre-line">{message}</div>
            <button
                onClick={onClose}
                aria-label="Close notification"
                className="ml-2 text-sm opacity-70 hover:opacity-100"
            >
                ✕
            </button>
        </div>
    );
}
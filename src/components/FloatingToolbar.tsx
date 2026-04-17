import React from "react";
import { Bold, Italic, Link, Underline, Code } from "./icons";

interface FloatingToolbarProps {
  position: { x: number; y: number } | null;
  isVisible: boolean;
  activeFormats: Record<string, boolean>;
  onAction: (action: string) => void;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  position,
  isVisible,
  activeFormats,
  onAction,
}) => {
  if (!isVisible || !position) return null;

  return (
    <div
      className="scrivly-floating-toolbar"
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        transform: "translate(-50%, -100%)",
        marginTop: "-10px",
        display: "flex",
        background: "var(--bg-primary)",
        border: "1px solid var(--border-color)",
        borderRadius: "8px",
        boxShadow: "var(--shadow-lg)",
        padding: "4px",
        zIndex: 1000,
        pointerEvents: "auto",
      }}
    >
      <button
        className={`toolbar-button ${activeFormats.bold ? "active" : ""}`}
        onClick={() => onAction("bold")}
        title="Bold"
        style={{
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          color: activeFormats.bold ? "var(--accent-primary)" : "var(--text-secondary)",
        }}
      >
        <Bold size={14} />
      </button>
      <button
        className={`toolbar-button ${activeFormats.italic ? "active" : ""}`}
        onClick={() => onAction("italic")}
        title="Italic"
        style={{
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          color: activeFormats.italic ? "var(--accent-primary)" : "var(--text-secondary)",
        }}
      >
        <Italic size={14} />
      </button>
      <button
        className={`toolbar-button ${activeFormats.underline ? "active" : ""}`}
        onClick={() => onAction("underline")}
        title="Underline"
        style={{
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          color: activeFormats.underline ? "var(--accent-primary)" : "var(--text-secondary)",
        }}
      >
        <Underline size={14} />
      </button>
      <div style={{ width: "1px", height: "20px", background: "var(--border-color)", margin: "6px 4px" }} />
      <button
        className={`toolbar-button ${activeFormats.link ? "active" : ""}`}
        onClick={() => onAction("link")}
        title="Link"
        style={{
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          color: activeFormats.link ? "var(--accent-primary)" : "var(--text-secondary)",
        }}
      >
        <Link size={14} />
      </button>
      <button
        className={`toolbar-button ${activeFormats.code ? "active" : ""}`}
        onClick={() => onAction("code")}
        title="Inline Code"
        style={{
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          color: activeFormats.code ? "var(--accent-primary)" : "var(--text-secondary)",
        }}
      >
        <Code size={14} />
      </button>
    </div>
  );
};

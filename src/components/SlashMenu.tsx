import React, { useEffect, useState, useRef } from "react";
import { Heading1, Heading2, Heading3, List, ListOrdered, Table, Quote, FileCode, Search, Image, Video } from "lucide-react";

interface SlashMenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
}

const ITEMS: SlashMenuItem[] = [
  { id: "h1", label: "Heading 1", icon: Heading1, description: "Big section heading" },
  { id: "h2", label: "Heading 2", icon: Heading2, description: "Medium section heading" },
  { id: "h3", label: "Heading 3", icon: Heading3, description: "Small section heading" },
  { id: "bulletList", label: "Bullet List", icon: List, description: "Create a simple bulleted list" },
  { id: "numberList", label: "Numbered List", icon: ListOrdered, description: "Create a list with numbering" },
  { id: "table", label: "Table", icon: Table, description: "Insert a data table" },
  { id: "blockquote", label: "Quote", icon: Quote, description: "Capture a quotation" },
  { id: "codeBlock", label: "Code Block", icon: FileCode, description: "Add a block of code" },
  { id: "image", label: "Image", icon: Image, description: "Upload or link an image" },
  { id: "video", label: "Video", icon: Video, description: "Embed a video" },
];

interface SlashMenuProps {
  position: { x: number; y: number } | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export const SlashMenu: React.FC<SlashMenuProps> = ({ position, onSelect, onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % ITEMS.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + ITEMS.length) % ITEMS.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        onSelect(ITEMS[selectedIndex].id);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [selectedIndex, onSelect, onClose]);

  if (!position) return null;

  return (
    <div
      ref={menuRef}
      className="scrivly-slash-menu"
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        background: "var(--bg-primary)",
        border: "1px solid var(--border-color)",
        borderRadius: "8px",
        boxShadow: "var(--shadow-xl)",
        width: "280px",
        maxHeight: "300px",
        overflowY: "auto",
        zIndex: 10000,
        padding: "4px",
      }}
    >
      <div style={{ padding: "8px", fontSize: "12px", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase" }}>
        Basic Blocks
      </div>
      {ITEMS.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          onMouseEnter={() => setSelectedIndex(index)}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "8px",
            border: "none",
            background: index === selectedIndex ? "var(--bg-tertiary)" : "transparent",
            cursor: "pointer",
            borderRadius: "6px",
            textAlign: "left",
            gap: "12px",
            transition: "background 0.2s ease",
          }}
        >
          <div style={{ 
            width: "32px", 
            height: "32px", 
            background: "var(--bg-secondary)", 
            borderRadius: "4px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            color: "var(--text-secondary)"
          }}>
            <item.icon size={18} />
          </div>
          <div>
            <div style={{ fontWeight: "500", fontSize: "14px", color: "var(--text-primary)" }}>{item.label}</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

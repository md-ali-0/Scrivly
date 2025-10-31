"use client"

import {
  Code,
  CustomIcon,
  Download,
  Eraser,
  FileCode,
  Highlighter,
  ImageIcon,
  Indent,
  Italic,
  Link,
  List,
  ListOrdered,
  Maximize,
  Minimize,
  Moon,
  Outdent,
  Quote,
  RotateCcw,
  RotateCw,
  Search,
  Smile,
  Strikethrough,
  Sun,
  Table,
  Type,
  Underline,
  Video
} from "./icons";

import React, { useRef } from "react";
import type { BlockFormat, FontFamily, FontSize, ToolbarOption, ToolbarProps } from "../types/editor";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, CheckSquare, ChevronDown } from "./icons";

// Custom SVG Icons
const TextColorIcon: React.FC<CustomIcon> = ({ size = 16, color = "currentColor", ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 20h16"/>
    <path d="m6 16 6-12 6 12"/>
    <path d="M8 12h8"/>
  </svg>
);

const BackgroundColorIcon: React.FC<CustomIcon> = ({ size = 16, color = "currentColor", ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/>
    <path d="m5 2 5 5"/>
    <path d="M2 13h15"/>
    <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/>
  </svg>
);

const SubscriptIcon: React.FC<CustomIcon> = ({ size = 16, color = "currentColor", ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="m4 5 8 8"/>
    <path d="m12 5-8 8"/>
    <path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"/>
  </svg>
);

const SuperscriptIcon: React.FC<CustomIcon> = ({ size = 16, color = "currentColor", ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="m4 19 8-8"/>
    <path d="m12 19-8-8"/>
    <path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"/>
  </svg>
);

export type ToolbarConfig = {
  icon: React.ComponentType<CustomIcon>;
  label: string;
  shortcut?: string;
};

export const Toolbar: React.FC<ToolbarProps> = (props: ToolbarProps) => {
  const {
    isActive,
    currentBlock,
    onAction,
    toolbarOptions,
    customTools = [],
    className = "",
    canUndo = false,
    canRedo = false,
    isDarkMode = false,
    isFullscreen = false,
    onColorPicker,
    onEmojiPicker,
    activeDropdown,
    onDropdownChange,
    editorRef,
  } = props;
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textColorButtonRef = useRef<HTMLButtonElement>(null);
  const backgroundColorButtonRef = useRef<HTMLButtonElement>(null);
  
  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAction("imageUpload", file);
    }
    // Reset input
    if (e.target) {
      e.target.value = "";
    }
  };

  const buttonConfig = {
    bold: { icon: Bold, label: "Bold", shortcut: "Ctrl+B" },
    italic: { icon: Italic, label: "Italic", shortcut: "Ctrl+I" },
    underline: { icon: Underline, label: "Underline", shortcut: "Ctrl+U" },
    strikethrough: { icon: Strikethrough, label: "Strikethrough" },
    subscript: { icon: SubscriptIcon, label: "Subscript" },
    superscript: { icon: SuperscriptIcon, label: "Superscript" },
    code: { icon: Code, label: "Inline Code" },
    highlight: { icon: Highlighter, label: "Highlight Text" },
    blockquote: { icon: Quote, label: "Quote" },
    bulletList: { icon: List, label: "Bullet List" },
    numberList: { icon: ListOrdered, label: "Numbered List" },
    checklist: { icon: CheckSquare, label: "Checklist" },
    codeBlock: { icon: FileCode, label: "Code Block" },
    table: { icon: Table, label: "Insert Table" },
    link: { icon: Link, label: "Insert Link", shortcut: "Ctrl+K" },
    image: { icon: ImageIcon, label: "Insert Image" },
    video: { icon: Video, label: "Insert Video" },
    emoji: { icon: Smile, label: "Insert Emoji" },
    search: { icon: Search, label: "Find & Replace" },
    export: { icon: Download, label: "Export Content" },
    alignLeft: { icon: AlignLeft, label: "Align Left" },
    alignCenter: { icon: AlignCenter, label: "Align Center" },
    alignRight: { icon: AlignRight, label: "Align Right" },
    alignJustify: { icon: AlignJustify, label: "Justify" },
    indent: { icon: Indent, label: "Increase Indent" },
    outdent: { icon: Outdent, label: "Decrease Indent" },
    undo: { icon: RotateCcw, label: "Undo", shortcut: "Ctrl+Z" },
    redo: { icon: RotateCw, label: "Redo", shortcut: "Ctrl+Shift+Z" },
    clear: { icon: Eraser, label: "Clear Formatting" },
    darkMode: { icon: isDarkMode ? Sun : Moon, label: isDarkMode ? "Light Mode" : "Dark Mode" },
    fullscreen: { icon: isFullscreen ? Minimize : Maximize, label: isFullscreen ? "Exit Fullscreen" : "Fullscreen" },
  }

  const blockFormats: { value: BlockFormat; label: string }[] = [
    { value: "p", label: "Paragraph" },
    { value: "h1", label: "Heading 1" },
    { value: "h2", label: "Heading 2" },
    { value: "h3", label: "Heading 3" },
    { value: "h4", label: "Heading 4" },
    { value: "h5", label: "Heading 5" },
    { value: "h6", label: "Heading 6" },
    { value: "blockquote", label: "Quote" },
    { value: "pre", label: "Code Block" },
  ]

  const fontSizes: FontSize[] = [
    "8px",
    "10px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
    "36px",
    "48px",
    "64px",
  ]

  const fontFamilies: FontFamily[] = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Comic Sans MS",
    "Trebuchet MS",
    "Arial Black",
    "Impact",
  ]

  // Group custom tools by their group property
  const groupedCustomTools = customTools.reduce(
    (acc, tool) => {
      const group = tool.group || "custom"
      if (!acc[group]) acc[group] = []
      acc[group].push(tool)
      return acc
    },
    {} as Record<string, typeof customTools>,
  )

  const buttonGroups = [
    ["undo", "redo"],
    ["bold", "italic", "underline", "strikethrough", "subscript", "superscript", "highlight"],
    ["textColor", "backgroundColor", "fontSize", "fontFamily"],
    ["formatBlock"],
    ["blockquote", "code", "codeBlock"],
    ["bulletList", "numberList", "checklist"],
    ["alignLeft", "alignCenter", "alignRight", "alignJustify"],
    ["indent", "outdent"],
    ["table", "link", "image", "video", "emoji"], // Remove convertToTable from here
    ["search", "export"],
    ["clear", "darkMode", "fullscreen"],
    // Add custom tool groups
    ...Object.keys(groupedCustomTools).map((group) => groupedCustomTools[group].map((tool) => tool.id)),
  ]

  const renderImageButton = () => {
    return (
      <div className="dropdown-container" style={{ position: "relative" }}>
        <button
          className={`toolbar-button ${activeDropdown === "image" ? "active" : ""}`}
          onClick={() => onAction("image")}
          aria-label="Insert Image"
          title="Insert Image"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            background: "transparent",
            cursor: "pointer",
            color: "var(--text-secondary)",
            transition: "all 0.2s ease",
            position: "relative",
            border: "none",
          }}
        >
          <ImageIcon size={16} />
        </button>
        
        {activeDropdown === "image" && (
          <div 
            className="image-dropdown"
            style={{
              position: "absolute",
              top: "100%",
              left: "0",
              background: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "4px",
              boxShadow: "var(--shadow-lg)",
              marginTop: "4px",
              zIndex: 1000,
              minWidth: "180px",
              padding: "4px",
            }}
          >
            <button
              className="dropdown-item"
              onClick={() => {
                handleImageUploadClick();
                onDropdownChange?.(null);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "8px 12px",
                border: "none",
                background: "transparent",
                color: "var(--text-primary)",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "14px",
                transition: "all 0.2s ease",
                borderRadius: "4px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-tertiary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span>Upload Image</span>
            </button>
            
            <button
              className="dropdown-item"
              onClick={() => {
                onAction("imageUrl");
                onDropdownChange?.(null);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "8px 12px",
                border: "none",
                background: "transparent",
                color: "var(--text-primary)",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "14px",
                transition: "all 0.2s ease",
                borderRadius: "4px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-tertiary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span>Insert from URL</span>
            </button>
          </div>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    );
  };

  const renderColorButton = (option: "textColor" | "backgroundColor") => {
    const ref = option === "textColor" ? textColorButtonRef : backgroundColorButtonRef;
    const label = option === "textColor" ? "Text Color" : "Background Color";
    
    return (
      <div 
        key={option} 
        className="dropdown-container" 
        style={{ position: "relative" }}
      >
        <button
          ref={ref}
          className={`toolbar-button ${isActive[option] ? "active" : ""}`}
          onClick={() => {
            onColorPicker?.(option === "textColor" ? "text" : "background");
          }}
          aria-label={label}
          title={label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            background: "transparent",
            cursor: "pointer",
            color: "var(--text-secondary)",
            transition: "all 0.2s ease",
            position: "relative",
            border: "none",
          }}
        >
          {option === "textColor" ? (
            <TextColorIcon size={16} />
          ) : (
            <BackgroundColorIcon size={16} />
          )}
        </button>
      </div>
    );
  };

  const renderButton = (
    option: ToolbarOption,
    icon: React.ComponentType<CustomIcon>,
    label: string,
    shortcut?: string
  ) => {
    // Special handling for color pickers
    if (option === "textColor" || option === "backgroundColor") {
      return renderColorButton(option);
    }
    
    // Special handling for image button
    if (option === "image") {
      return renderImageButton();
    }

    // Default button rendering
    return (
      <button
        key={option}
        className={`toolbar-button ${isActive[option] ? "active" : ""}`}
        onClick={() => onAction(option)}
        aria-label={label}
        title={`${label}${shortcut ? ` (${shortcut})` : ""}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
          background: "transparent",
          cursor: "pointer",
          color: "var(--text-secondary)",
          transition: "all 0.2s ease",
          position: "relative",
          border: "none",
        }}
      >
        {icon && React.createElement(icon, { size: 16 })}
      </button>
    );
  };

  const renderDropdown = (option: string) => {
    switch (option) {
      case "formatBlock":
        if (toolbarOptions.indexOf("formatBlock") === -1) return null
        return (
          <div key="formatBlock" className="dropdown-container">
            <button
              type="button"
              className={`toolbar-button dropdown-trigger ${activeDropdown === "formatBlock" ? "active" : ""}`}
              onClick={() => onDropdownChange?.(activeDropdown === "formatBlock" ? null : "formatBlock")}
              title="Text Format"
              aria-label="Text Format"
              aria-expanded={activeDropdown === "formatBlock"}
              aria-haspopup="true"
            >
              <Type size={16} />
              <ChevronDown size={12} />
            </button>
            {activeDropdown === "formatBlock" && (
              <div className="dropdown-menu">
                {blockFormats.map((format) => (
                  <button
                    key={format.value}
                    type="button"
                    className={`dropdown-item ${currentBlock === format.value ? "active" : ""}`}
                    onClick={() => {
                      onAction("formatBlock", format.value)
                      onDropdownChange?.(null)
                    }}
                    role="menuitem"
                    tabIndex={-1}
                  >
                    {format.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )

      case "fontSize":
        if (toolbarOptions.indexOf("fontSize") === -1) return null
        return (
          <div key="fontSize" className="dropdown-container">
            <button
              type="button"
              className={`toolbar-button dropdown-trigger ${activeDropdown === "fontSize" ? "active" : ""}`}
              onClick={() => onDropdownChange?.(activeDropdown === "fontSize" ? null : "fontSize")}
              title="Font Size"
              aria-label="Font Size"
              aria-expanded={activeDropdown === "fontSize"}
              aria-haspopup="true"
            >
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>A</span>
              <ChevronDown size={12} />
            </button>
            {activeDropdown === "fontSize" && (
              <div className="dropdown-menu">
                {fontSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      onAction("fontSize", size)
                      onDropdownChange?.(null)
                    }}
                    style={{ fontSize: size }}
                    role="menuitem"
                    tabIndex={-1}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
        )

      case "fontFamily":
        if (toolbarOptions.indexOf("fontFamily") === -1) return null
        return (
          <div key="fontFamily" className="dropdown-container">
            <button
              type="button"
              className={`toolbar-button dropdown-trigger ${activeDropdown === "fontFamily" ? "active" : ""}`}
              onClick={() => onDropdownChange?.(activeDropdown === "fontFamily" ? null : "fontFamily")}
              title="Font Family"
              aria-label="Font Family"
              aria-expanded={activeDropdown === "fontFamily"}
              aria-haspopup="true"
            >
              <span style={{ fontSize: "12px" }}>Aa</span>
              <ChevronDown size={12} />
            </button>
            {activeDropdown === "fontFamily" && (
              <div className="dropdown-menu">
                {fontFamilies.map((family) => (
                  <button
                    key={family}
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      onAction("fontFamily", family)
                      onDropdownChange?.(null)
                    }}
                    style={{ fontFamily: family }}
                    role="menuitem"
                    tabIndex={-1}
                  >
                    {family}
                  </button>
                ))}
              </div>
            )}
          </div>
        )

      case "textColor":
        if (toolbarOptions.indexOf("textColor") === -1) return null
        return (
          <button
            key="textColor"
            type="button"
            className="toolbar-button"
            onClick={() => onColorPicker?.("text")}
            title="Text Color"
            aria-label="Text Color"
          >
            <TextColorIcon size={16} />
          </button>
        )

      case "backgroundColor":
        if (toolbarOptions.indexOf("backgroundColor") === -1) return null
        return (
          <button
            key="backgroundColor"
            type="button"
            className="toolbar-button"
            onClick={() => onColorPicker?.("background")}
            title="Background Color"
            aria-label="Background Color"
          >
            <BackgroundColorIcon size={16} />
          </button>
        )

      default:
        // Check if this option exists in buttonConfig
        if (option in buttonConfig) {
          const config = buttonConfig[option as keyof typeof buttonConfig];
          // Create the icon component properly
          const IconComponent = config.icon;
          return renderButton(
            option as ToolbarOption,
            IconComponent,
            config.label,
            'shortcut' in config ? config.shortcut : undefined
          );
        }
        return null;
    }
  }

  const renderGroup = (group: string[]) => {
    const items = group.map(renderDropdown).filter(Boolean)
    if (items.length === 0) return null

    return (
      <div key={group.join("-")} className="toolbar-group">
        {items}
      </div>
    )
  }

  return (
    <div className={`scrivly-toolbar ${className}`}>
      {buttonGroups.map(renderGroup)}
    </div>
  );
}
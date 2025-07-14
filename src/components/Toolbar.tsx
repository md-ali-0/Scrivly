"use client"

import {
  Code,
  Eraser,
  FileCode,
  ImageIcon,
  Indent,
  Italic,
  Link,
  List,
  ListOrdered,
  LucideIcon,
  Maximize,
  Minimize,
  Moon,
  Outdent,
  Palette,
  Quote,
  RotateCcw,
  RotateCw,
  Smile,
  Strikethrough,
  Subscript,
  Sun,
  Superscript,
  Table,
  Type,
  Underline,
  Video,
} from "lucide-react";

import type React from "react";
import type { BlockFormat, FontFamily, FontSize, ToolbarOption, ToolbarProps } from "../types/editor";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, CheckSquare, ChevronDown } from "./icons";

export type ToolbarConfig = {
  icon: LucideIcon;
  label: string;
  shortcut?: string;
};

export const Toolbar: React.FC<ToolbarProps> = ({
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
}) => {
  const buttonConfig = {
    bold: { icon: Bold, label: "Bold", shortcut: "Ctrl+B" },
    italic: { icon: Italic, label: "Italic", shortcut: "Ctrl+I" },
    underline: { icon: Underline, label: "Underline", shortcut: "Ctrl+U" },
    strikethrough: { icon: Strikethrough, label: "Strikethrough" },
    subscript: { icon: Subscript, label: "Subscript" },
    superscript: { icon: Superscript, label: "Superscript" },
    code: { icon: Code, label: "Inline Code" },
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
    ["bold", "italic", "underline", "strikethrough", "subscript", "superscript"],
    ["textColor", "backgroundColor", "fontSize", "fontFamily"],
    ["formatBlock"],
    ["blockquote", "code", "codeBlock"],
    ["bulletList", "numberList", "checklist"],
    ["alignLeft", "alignCenter", "alignRight", "alignJustify"],
    ["indent", "outdent"],
    ["table", "link", "image", "video", "emoji"],
    ["clear", "darkMode", "fullscreen"],
    // Add custom tool groups
    ...Object.keys(groupedCustomTools).map((group) => groupedCustomTools[group].map((tool) => tool.id)),
  ]

  const renderButton = (option: string) => {
    if (!toolbarOptions.includes(option as ToolbarOption) && option !== "customTool") return null;

    // Handle custom tools
    const customTool = customTools.find((tool) => tool.id === option);
    if (customTool) {
      const Icon = customTool.icon;
      const active = isActive[customTool.id];
      return (
        <button
          key={customTool.id}
          type="button"
          className={`toolbar-button ${active ? "active" : ""}`}
          onClick={() => onAction(customTool.id)}
          title={customTool.tooltip}
        >
          <Icon size={16} />
        </button>
      );
    }

    const config = buttonConfig[option as keyof typeof buttonConfig];
    if (!config) return null;

    const Icon = config.icon;
    const active = isActive[option];
    const disabled = (option === "undo" && !canUndo) || (option === "redo" && !canRedo);
    return (
      <button
        key={option}
        type="button"
        className={`toolbar-button ${active ? "active" : ""} ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && onAction(option)}
        // @ts-ignore
        title={config.shortcut ? `${config.label} (${config.shortcut})` : config.label}
        disabled={disabled}
      >
        <Icon size={16} />
      </button>
    );
  }

  const renderDropdown = (option: string) => {
    switch (option) {
      case "formatBlock":
        if (!toolbarOptions.includes("formatBlock")) return null
        return (
          <div key="formatBlock" className="dropdown-container">
            <button
              type="button"
              className={`toolbar-button dropdown-trigger ${activeDropdown === "formatBlock" ? "active" : ""}`}
              onClick={() => onDropdownChange?.(activeDropdown === "formatBlock" ? null : "formatBlock")}
              title="Text Format"
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
                  >
                    {format.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )

      case "fontSize":
        if (!toolbarOptions.includes("fontSize")) return null
        return (
          <div key="fontSize" className="dropdown-container">
            <button
              type="button"
              className={`toolbar-button dropdown-trigger ${activeDropdown === "fontSize" ? "active" : ""}`}
              onClick={() => onDropdownChange?.(activeDropdown === "fontSize" ? null : "fontSize")}
              title="Font Size"
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
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
        )

      case "fontFamily":
        if (!toolbarOptions.includes("fontFamily")) return null
        return (
          <div key="fontFamily" className="dropdown-container">
            <button
              type="button"
              className={`toolbar-button dropdown-trigger ${activeDropdown === "fontFamily" ? "active" : ""}`}
              onClick={() => onDropdownChange?.(activeDropdown === "fontFamily" ? null : "fontFamily")}
              title="Font Family"
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
                  >
                    {family}
                  </button>
                ))}
              </div>
            )}
          </div>
        )

      case "textColor":
        if (!toolbarOptions.includes("textColor")) return null
        return (
          <button
            key="textColor"
            type="button"
            className="toolbar-button color-button"
            onClick={() => onColorPicker?.("text")}
            title="Text Color"
          >
            <Palette size={16} />
            <div className="color-indicator text-color"></div>
          </button>
        )

      case "backgroundColor":
        if (!toolbarOptions.includes("backgroundColor")) return null
        return (
          <button
            key="backgroundColor"
            type="button"
            className="toolbar-button color-button"
            onClick={() => onColorPicker?.("background")}
            title="Background Color"
          >
            <div style={{ position: "relative" }}>
              <Palette size={16} />
              <div className="color-indicator bg-color"></div>
            </div>
          </button>
        )

      default:
        return renderButton(option)
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

  return <div className={`scrivly-toolbar ${className}`}>{buttonGroups.map(renderGroup)}</div>
}
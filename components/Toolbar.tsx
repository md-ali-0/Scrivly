"use client"

import type React from "react"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Subscript,
  Superscript,
  Quote,
  List,
  ListOrdered,
  CheckSquare,
  FileCode,
  Link,
  ImageIcon,
  Video,
  Smile,
  Table,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  Palette,
  Type,
  RotateCcw,
  RotateCw,
  Eraser,
  Moon,
  Sun,
  Maximize,
  Minimize,
  ChevronDown,
} from "lucide-react"
import type { ToolbarOption, BlockFormat, FontSize, FontFamily } from "../types/editor"

export interface ToolbarProps {
  isActive: Record<string, boolean>
  currentBlock: BlockFormat
  onAction: (action: string, value?: any) => void
  toolbarOptions: ToolbarOption[]
  className?: string
  canUndo?: boolean
  canRedo?: boolean
  isDarkMode?: boolean
  isFullscreen?: boolean
  onColorPicker?: (type: "text" | "background") => void
  onEmojiPicker?: () => void
  activeDropdown?: string | null
  onDropdownChange?: (dropdown: string | null) => void
}

export const Toolbar: React.FC<ToolbarProps> = ({
  isActive,
  currentBlock,
  onAction,
  toolbarOptions,
  className = "",
  canUndo = false,
  canRedo = false,
  isDarkMode = false,
  isFullscreen = false,
  onColorPicker,
  onEmojiPicker,
  activeDropdown,
  onDropdownChange,
}) => {
  // Remove local dropdown states and use the managed ones
  // const [showFormatDropdown, setShowFormatDropdown] = useState(false)
  // const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false)
  // const [showFontFamilyDropdown, setShowFontFamilyDropdown] = useState(false)

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
  ]

  const renderButton = (option: string) => {
    if (!toolbarOptions.includes(option as ToolbarOption)) return null

    const config = buttonConfig[option as keyof typeof buttonConfig]
    if (!config) return null

    const Icon = config.icon
    const active = isActive[option]
    const disabled = (option === "undo" && !canUndo) || (option === "redo" && !canRedo)

    return (
      <button
        key={option}
        type="button"
        className={`toolbar-button ${active ? "active" : ""} ${disabled ? "disabled" : ""}`}
        onClick={() => !disabled && onAction(option)}
        title={`${config.label}${config.shortcut ? ` (${config.shortcut})` : ""}`}
        disabled={disabled}
      >
        <Icon size={16} />
      </button>
    )
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

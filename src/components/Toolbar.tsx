import type { EditorState } from "draft-js"
import { Bold, Code, File, FileCode, Italic, Link, List, ListOrdered, Strikethrough } from "lucide-react"
import type React from "react"

export interface ToolbarProps {
  editorState: EditorState
  onToggleBlockType: (blockType: string) => void
  onToggleInlineStyle: (inlineStyle: string) => void
  className?: string
}

export const Toolbar: React.FC<ToolbarProps> = ({
  editorState,
  onToggleBlockType,
  onToggleInlineStyle,
  className = "",
}) => {
  const currentInlineStyle = editorState.getCurrentInlineStyle()
  const selection = editorState.getSelection()
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType()

  const isActive = (style: string, type: "block" | "inline") => {
    if (type === "inline") {
      return currentInlineStyle.has(style)
    }
    return blockType === style
  }

  // Group buttons for better organization
  const formatButtons = [
    {
      label: "Bold",
      icon: <Bold size={16} />,
      action: () => onToggleInlineStyle("BOLD"),
      isActive: isActive("BOLD", "inline"),
      type: "inline",
    },
    {
      label: "Italic",
      icon: <Italic size={16} />,
      action: () => onToggleInlineStyle("ITALIC"),
      isActive: isActive("ITALIC", "inline"),
      type: "inline",
    },
    {
      label: "Strikethrough",
      icon: <Strikethrough size={16} />,
      action: () => onToggleInlineStyle("STRIKETHROUGH"),
      isActive: isActive("STRIKETHROUGH", "inline"),
      type: "inline",
    },
  ]

  const listButtons = [
    {
      label: "Bullet List",
      icon: <List size={16} />,
      action: () => onToggleBlockType("unordered-list-item"),
      isActive: isActive("unordered-list-item", "block"),
      type: "block",
    },
    {
      label: "Numbered List",
      icon: <ListOrdered size={16} />,
      action: () => onToggleBlockType("ordered-list-item"),
      isActive: isActive("ordered-list-item", "block"),
      type: "block",
    },
  ]

  const codeButtons = [
    {
      label: "Code",
      icon: <Code size={16} />,
      action: () => onToggleInlineStyle("CODE"),
      isActive: isActive("CODE", "inline"),
      type: "inline",
    },
    {
      label: "Code Block",
      icon: <FileCode size={16} />,
      action: () => onToggleBlockType("code-block"),
      isActive: isActive("code-block", "block"),
      type: "block",
    },
  ]

  const renderButton = (button: any) => (
    <button
      key={button.label}
      type="button"
      aria-label={button.label}
      title={button.label}
      className={button.isActive ? "active" : ""}
      onClick={button.action}
    >
      {button.icon}
    </button>
  )

  return (
    <div className={`rich-text-editor-toolbar ${className}`}>
      {formatButtons.map(renderButton)}

      <button
        type="button"
        aria-label="Link"
        title="Link"
        onClick={() => {
          const url = window.prompt("Enter a URL:")
          if (url) {
            // This is a simple implementation - a more robust one would modify the
            // content to include a link entity
            console.log("Link URL:", url)
          }
        }}
      >
        <Link size={16} />
      </button>

      {listButtons.map(renderButton)}
      {codeButtons.map(renderButton)}

      <button
        type="button"
        aria-label="Clear Formatting"
        title="Clear Formatting"
        onClick={() => {
          // This is a placeholder - in a real implementation, you would
          // remove all formatting from the selected text
          console.log("Clear formatting")
        }}
      >
        <File size={16} />
      </button>
    </div>
  )
}


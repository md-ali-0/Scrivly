"use client"

import type { EditorState } from "draft-js"
import { AtomicBlockUtils, EditorState as EditorStateType } from "draft-js"
import {
  Bold,
  Code,
  File,
  FileCode,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
  Video,
} from "lucide-react"
import type React from "react"
import type { ToolbarOption } from "./ScrivlyEditor"

export interface ToolbarProps {
  editorState: EditorState
  onToggleBlockType: (blockType: string) => void
  onToggleInlineStyle: (inlineStyle: string) => void
  onChange: (editorState: EditorState) => void
  toolbarOptions?: ToolbarOption[]
  className?: string
}

export const Toolbar: React.FC<ToolbarProps> = ({
  editorState,
  onToggleBlockType,
  onToggleInlineStyle,
  onChange,
  toolbarOptions = [],
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

  // Insert an image at the current selection
  const insertImage = () => {
    const url = window.prompt("Enter the URL of the image:")
    if (!url) return

    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity("IMAGE", "IMMUTABLE", { src: url, alt: "Image" })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorStateType.set(editorState, { currentContent: contentStateWithEntity })
    onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "))
  }

  // Insert media (video, audio) at the current selection
  const insertMedia = () => {
    const url = window.prompt("Enter the URL of the media (YouTube, Vimeo, etc.):")
    if (!url) return

    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity("MEDIA", "IMMUTABLE", { src: url })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorStateType.set(editorState, { currentContent: contentStateWithEntity })
    onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "))
  }

  // Insert link
  const insertLink = () => {
    const url = window.prompt("Enter a URL:")
    if (!url) return

    // This is a simple implementation - a more robust one would modify the
    // content to include a link entity
    console.log("Link URL:", url)
  }

  // Define all available buttons
  const allButtons = {
    bold: {
      label: "Bold",
      icon: <Bold size={16} />,
      action: () => onToggleInlineStyle("BOLD"),
      isActive: isActive("BOLD", "inline"),
      type: "inline",
    },
    italic: {
      label: "Italic",
      icon: <Italic size={16} />,
      action: () => onToggleInlineStyle("ITALIC"),
      isActive: isActive("ITALIC", "inline"),
      type: "inline",
    },
    strikethrough: {
      label: "Strikethrough",
      icon: <Strikethrough size={16} />,
      action: () => onToggleInlineStyle("STRIKETHROUGH"),
      isActive: isActive("STRIKETHROUGH", "inline"),
      type: "inline",
    },
    underline: {
      label: "Underline",
      icon: <Underline size={16} />,
      action: () => onToggleInlineStyle("UNDERLINE"),
      isActive: isActive("UNDERLINE", "inline"),
      type: "inline",
    },
    link: {
      label: "Link",
      icon: <Link size={16} />,
      action: insertLink,
      isActive: false,
      type: "inline",
    },
    h1: {
      label: "Heading 1",
      icon: <Heading1 size={16} />,
      action: () => onToggleBlockType("header-one"),
      isActive: isActive("header-one", "block"),
      type: "block",
    },
    h2: {
      label: "Heading 2",
      icon: <Heading2 size={16} />,
      action: () => onToggleBlockType("header-two"),
      isActive: isActive("header-two", "block"),
      type: "block",
    },
    h3: {
      label: "Heading 3",
      icon: <Heading3 size={16} />,
      action: () => onToggleBlockType("header-three"),
      isActive: isActive("header-three", "block"),
      type: "block",
    },
    bulletList: {
      label: "Bullet List",
      icon: <List size={16} />,
      action: () => onToggleBlockType("unordered-list-item"),
      isActive: isActive("unordered-list-item", "block"),
      type: "block",
    },
    numberList: {
      label: "Numbered List",
      icon: <ListOrdered size={16} />,
      action: () => onToggleBlockType("ordered-list-item"),
      isActive: isActive("ordered-list-item", "block"),
      type: "block",
    },
    code: {
      label: "Code",
      icon: <Code size={16} />,
      action: () => onToggleInlineStyle("CODE"),
      isActive: isActive("CODE", "inline"),
      type: "inline",
    },
    codeBlock: {
      label: "Code Block",
      icon: <FileCode size={16} />,
      action: () => onToggleBlockType("code-block"),
      isActive: isActive("code-block", "block"),
      type: "block",
    },
    image: {
      label: "Insert Image",
      icon: <Image size={16} />,
      action: insertImage,
      isActive: false,
      type: "media",
    },
    video: {
      label: "Insert Media",
      icon: <Video size={16} />,
      action: insertMedia,
      isActive: false,
      type: "media",
    },
    clear: {
      label: "Clear Formatting",
      icon: <File size={16} />,
      action: () => {
        // This is a placeholder - in a real implementation, you would
        // remove all formatting from the selected text
        console.log("Clear formatting")
      },
      isActive: false,
      type: "utility",
    },
  }

  // Group buttons by type for better organization
  const formatButtons = ["bold", "italic", "strikethrough", "underline"]
  const headingButtons = ["h1", "h2", "h3"]
  const listButtons = ["bulletList", "numberList"]
  const codeButtons = ["code", "codeBlock"]
  const mediaButtons = ["link", "image", "video"]
  const utilityButtons = ["clear"]

  // Function to render a button if it's included in toolbarOptions
  const renderButton = (buttonKey: string) => {
    if (!toolbarOptions.includes(buttonKey as ToolbarOption)) return null

    const button = allButtons[buttonKey as keyof typeof allButtons]
    return (
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
  }

  // Function to render a group of buttons if at least one is included in toolbarOptions
  const renderGroup = (buttonKeys: string[]) => {
    const visibleButtons = buttonKeys.filter((key) => toolbarOptions.includes(key as ToolbarOption))

    if (visibleButtons.length === 0) return null

    return <div className="toolbar-group">{visibleButtons.map((key) => renderButton(key))}</div>
  }

  return (
    <div className={`rich-text-editor-toolbar ${className}`}>
      {renderGroup(formatButtons)}
      {renderGroup(headingButtons)}
      {renderGroup(mediaButtons)}
      {renderGroup(listButtons)}
      {renderGroup(codeButtons)}
      {renderGroup(utilityButtons)}
    </div>
  )
}


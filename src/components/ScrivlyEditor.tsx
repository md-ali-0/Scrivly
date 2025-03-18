import { ContentState, convertToRaw, EditorState, RichUtils } from "draft-js"
import "draft-js/dist/Draft.css"
import type React from "react"
import { useState } from "react"
import { Content } from "./Content"
import { Toolbar } from "./Toolbar"

export interface ScrivlyEditorProps {
  initialContent?: string
  onChange?: (content: string) => void
  className?: string
  placeholder?: string
  toolbarClassName?: string
  contentClassName?: string
}

export const ScrivlyEditor: React.FC<ScrivlyEditorProps> = ({
  initialContent = "",
  onChange,
  className = "",
  placeholder = "Start typing...",
  toolbarClassName = "",
  contentClassName = "",
}) => {
  const [editorState, setEditorState] = useState(() => {
    if (initialContent) {
      return EditorState.createWithContent(ContentState.createFromText(initialContent))
    }
    return EditorState.createEmpty()
  })

  const handleChange = (state: EditorState) => {
    setEditorState(state)

    if (onChange) {
      const contentState = state.getCurrentContent()
      const rawContent = convertToRaw(contentState)
      onChange(JSON.stringify(rawContent))
    }
  }

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      handleChange(newState)
      return "handled"
    }
    return "not-handled"
  }

  const toggleBlockType = (blockType: string) => {
    handleChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  const toggleInlineStyle = (inlineStyle: string) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  return (
    <div className={`rich-text-editor ${className}`}>
      <Toolbar
        editorState={editorState}
        onToggleBlockType={toggleBlockType}
        onToggleInlineStyle={toggleInlineStyle}
        className={toolbarClassName}
      />
      <Content
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
        placeholder={placeholder}
        className={contentClassName}
      />
    </div>
  )
}


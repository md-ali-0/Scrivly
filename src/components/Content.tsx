import { Editor, type DraftHandleValue, type EditorState } from "draft-js"
import type React from "react"

export interface ContentProps {
  editorState: EditorState
  onChange: (editorState: EditorState) => void
  handleKeyCommand: (command: string, editorState: EditorState) => DraftHandleValue
  placeholder?: string
  className?: string
}

export const Content: React.FC<ContentProps> = ({
  editorState,
  onChange,
  handleKeyCommand,
  placeholder,
  className = "",
}) => {
  return (
    <div className={`rich-text-editor-content ${className}`}>
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
        placeholder={placeholder}
        spellCheck
      />
    </div>
  )
}


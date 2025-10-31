import type React from "react"
export type ToolbarOption =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "code"
  | "subscript"
  | "superscript"
  | "textColor"
  | "backgroundColor"
  | "fontSize"
  | "fontFamily"
  | "formatBlock"
  | "blockquote"
  | "bulletList"
  | "numberList"
  | "checklist"
  | "codeBlock"
  | "table"
  | "link"
  | "image"
  | "video"
  | "emoji"
  | "alignLeft"
  | "alignCenter"
  | "alignRight"
  | "alignJustify"
  | "indent"
  | "outdent"
  | "lineHeight"
  | "clear"
  | "undo"
  | "redo"
  | "fullscreen"
  | "darkMode"
  | "highlight"
  | "search"
  | "export"
  | "customTool"

export type BlockFormat = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote" | "pre" | "div"

export type FontSize =
  | "8px"
  | "10px"
  | "12px"
  | "14px"
  | "16px"
  | "18px"
  | "20px"
  | "24px"
  | "28px"
  | "32px"
  | "36px"
  | "48px"
  | "64px"

export type FontFamily =
  | "Arial"
  | "Helvetica"
  | "Times New Roman"
  | "Courier New"
  | "Verdana"
  | "Georgia"
  | "Palatino"
  | "Garamond"
  | "Comic Sans MS"
  | "Trebuchet MS"
  | "Arial Black"
  | "Impact"

export interface TableData {
  rows: number
  cols: number
  data: string[][]
}

export interface VideoData {
  url: string
  width: number
  height: number
  title?: string
}

export interface ImageData {
  url: string
  width: number
  height: number
  alt?: string
  title?: string
}

export interface CustomTool {
  id: string
  name: string
  icon: React.ComponentType<{ size?: number }>
  tooltip: string
  action: (editor: HTMLDivElement | null) => void
  isActive?: (editor: HTMLDivElement | null) => boolean
  group?: string
}

export interface EditorState {
  content: string
  selection?: Range
  activeFormats: Set<string>
  currentBlock: BlockFormat
  isDarkMode: boolean
  isFullscreen: boolean
}

export interface ScrivlyEditorProps {
  value?: string
  onChange?: (content: string) => void
  onStateChange?: (state: EditorState) => void
  toolbarOptions?: ToolbarOption[]
  customTools?: CustomTool[]
  placeholder?: string
  className?: string
  toolbarClassName?: string
  contentClassName?: string
  maxHeight?: string
  minHeight?: string
  readOnly?: boolean
  darkMode?: boolean
  onDarkModeChange?: (isDark: boolean) => void
  showWordCount?: boolean
  showCharCount?: boolean
  autoSave?: boolean
  autoSaveInterval?: number
  spellCheck?: boolean
  allowImageUpload?: boolean
  onImageUpload?: (file: File) => Promise<string>
  allowVideoUpload?: boolean
  onVideoUpload?: (file: File) => Promise<string>
}

export interface ToolbarProps {
  isActive: Record<string, boolean>
  currentBlock: BlockFormat
  onAction: (action: string, value?: any) => void
  toolbarOptions: ToolbarOption[]
  customTools?: CustomTool[]
  className?: string
  canUndo?: boolean
  canRedo?: boolean
  isDarkMode?: boolean
  isFullscreen?: boolean
  onColorPicker?: (type: "text" | "background") => void
  onEmojiPicker?: () => void
  activeDropdown?: string | null
  onDropdownChange?: (dropdown: string | null) => void
  editorRef?: React.RefObject<HTMLDivElement>
}

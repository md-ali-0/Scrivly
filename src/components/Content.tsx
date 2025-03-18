import { Editor, type DraftHandleValue, type EditorState } from "draft-js"
import type React from "react"

export interface ContentProps {
  editorState: EditorState
  onChange: (editorState: EditorState) => void
  handleKeyCommand: (command: string, editorState: EditorState) => DraftHandleValue
  placeholder?: string
  className?: string
}

// Media component for rendering images and videos
const Media = (props: any) => {
  const entity = props.contentState.getEntity(props.entityKey)
  const { src, alt } = entity.getData()
  const type = entity.getType()

  if (type === "IMAGE") {
    return <img src={src || "/placeholder.svg"} alt={alt || ""} style={{ maxWidth: "100%", height: "auto" }} />
  } else if (type === "MEDIA") {
    // Handle different media types (YouTube, Vimeo, etc.)
    // This is a simple implementation - you might want to use a library like react-player
    if (src.includes("youtube.com") || src.includes("youtu.be")) {
      const videoId = src.includes("youtube.com") ? src.split("v=")[1]?.split("&")[0] : src.split("youtu.be/")[1]

      return (
        <div className="media-embed">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )
    } else if (src.includes("vimeo.com")) {
      const videoId = src.split("vimeo.com/")[1]

      return (
        <div className="media-embed">
          <iframe
            src={`https://player.vimeo.com/video/${videoId}`}
            width="560"
            height="315"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )
    }

    // Fallback for other media types
    return (
      <a href={src} target="_blank" rel="noopener noreferrer">
        {src}
      </a>
    )
  }

  return null
}

// Function to determine what to render for a given block
const blockRendererFn = (block: any) => {
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false,
    }
  }
  return null
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
        blockRendererFn={blockRendererFn}
        spellCheck
      />
    </div>
  )
}


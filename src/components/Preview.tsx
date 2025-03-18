import type { ContentBlock, EditorState } from "draft-js"
import "draft-js/dist/Draft.css"
import type React from "react"

export interface PreviewProps {
  editorState: EditorState
  className?: string
}

export const Preview: React.FC<PreviewProps> = ({ editorState, className = "" }) => {
  // Function to determine the element type based on block type
  const getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case "header-one":
        return "text-3xl font-bold my-4"
      case "header-two":
        return "text-2xl font-bold my-3"
      case "header-three":
        return "text-xl font-bold my-2"
      case "unordered-list-item":
        return "list-disc ml-5 my-1"
      case "ordered-list-item":
        return "list-decimal ml-5 my-1"
      case "blockquote":
        return "border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600"
      case "code-block":
        return "bg-gray-100 p-3 rounded font-mono text-sm my-4 overflow-x-auto"
      default:
        return "my-2"
    }
  }

  // Function to apply inline styles
  const styleMap = {
    BOLD: { fontWeight: "bold" },
    ITALIC: { fontStyle: "italic" },
    UNDERLINE: { textDecoration: "underline" },
    STRIKETHROUGH: { textDecoration: "line-through" },
    CODE: {
      backgroundColor: "#f1f5f9",
      padding: "0.1em 0.3em",
      borderRadius: "0.2em",
      fontFamily: "monospace",
      fontSize: "0.9em",
    },
  }

  // Convert content to blocks for rendering
  const contentState = editorState.getCurrentContent()
  const blocks = contentState.getBlocksAsArray()

  // Render each block with its styles
  const renderBlocks = () => {
    return blocks.map((block) => {
      const blockType = block.getType()
      const blockText = block.getText()
      const blockKey = block.getKey()
      const blockStyle = getBlockStyle(block)

      // Get inline styles for each character
      const inlineStyles = Array.from({ length: blockText.length }, (_, i) => {
        const styles = block.getInlineStyleAt(i).toArray()
        return styles
      })

      // Render text with inline styles
      const renderInlineStyles = () => {
        if (blockText.length === 0) return <br />

        // Simple case: no inline styles in the block
        if (inlineStyles.every((styles) => styles.length === 0)) {
          return blockText
        }

        // Complex case: has inline styles
        let lastStylesKey = ""
        const segments: { text: string; styles: string[]; key: string }[] = []
        let currentText = ""

        // Group text by style changes
        for (let i = 0; i < blockText.length; i++) {
          const char = blockText[i]
          const stylesKey = inlineStyles[i].sort().join(",")

          if (stylesKey !== lastStylesKey && i > 0) {
            segments.push({
              text: currentText,
              styles: lastStylesKey ? lastStylesKey.split(",") : [],
              key: `${blockKey}-${i - currentText.length}`,
            })
            currentText = char
          } else {
            currentText += char
          }

          lastStylesKey = stylesKey
        }

        // Add the last segment
        if (currentText) {
          segments.push({
            text: currentText,
            styles: lastStylesKey ? lastStylesKey.split(",") : [],
            key: `${blockKey}-${blockText.length - currentText.length}`,
          })
        }

        // Render each segment with its styles
        return segments.map((segment) => {
          if (segment.styles.length === 0) {
            return <span key={segment.key}>{segment.text}</span>
          }

          // Apply all styles to the segment
          const style = segment.styles.reduce((acc, styleName) => {
            return { ...acc, ...(styleMap[styleName as keyof typeof styleMap] || {}) }
          }, {})

          return (
            <span key={segment.key} style={style}>
              {segment.text}
            </span>
          )
        })
      }

      // Render the appropriate element based on block type
      switch (blockType) {
        case "header-one":
          return (
            <h1 key={blockKey} className={blockStyle}>
              {renderInlineStyles()}
            </h1>
          )
        case "header-two":
          return (
            <h2 key={blockKey} className={blockStyle}>
              {renderInlineStyles()}
            </h2>
          )
        case "header-three":
          return (
            <h3 key={blockKey} className={blockStyle}>
              {renderInlineStyles()}
            </h3>
          )
        case "unordered-list-item":
          return (
            <li key={blockKey} className={blockStyle}>
              {renderInlineStyles()}
            </li>
          )
        case "ordered-list-item":
          return (
            <li key={blockKey} className={blockStyle}>
              {renderInlineStyles()}
            </li>
          )
        case "blockquote":
          return (
            <blockquote key={blockKey} className={blockStyle}>
              {renderInlineStyles()}
            </blockquote>
          )
        case "code-block":
          return (
            <pre key={blockKey} className={blockStyle}>
              <code>{renderInlineStyles()}</code>
            </pre>
          )
        default:
          return (
            <p key={blockKey} className={blockStyle}>
              {renderInlineStyles()}
            </p>
          )
      }
    })
  }

  // Wrap list items in appropriate list elements
  const renderContent = () => {
    const result: React.ReactNode[] = []
    let listItems: JSX.Element[] = []
    let listType: string | null = null

    blocks.forEach((block, i) => {
      const blockType = block.getType()
      const element = renderBlocks()[i]

      if (blockType === "unordered-list-item") {
        if (listType !== "ul") {
          if (listItems.length > 0) {
            result.push(
              listType === "ol" ? (
                <ol key={`ol-${i}`} className="list-decimal ml-5 my-2">
                  {listItems}
                </ol>
              ) : (
                <ul key={`ul-${i}`} className="list-disc ml-5 my-2">
                  {listItems}
                </ul>
              ),
            )
            listItems = []
          }
          listType = "ul"
        }
        listItems.push(element)
      } else if (blockType === "ordered-list-item") {
        if (listType !== "ol") {
          if (listItems.length > 0) {
            result.push(
              listType === "ul" ? (
                <ul key={`ul-${i}`} className="list-disc ml-5 my-2">
                  {listItems}
                </ul>
              ) : (
                <ol key={`ol-${i}`} className="list-decimal ml-5 my-2">
                  {listItems}
                </ol>
              ),
            )
            listItems = []
          }
          listType = "ol"
        }
        listItems.push(element)
      } else {
        if (listItems.length > 0) {
          result.push(
            listType === "ul" ? (
              <ul key={`ul-${i}`} className="list-disc ml-5 my-2">
                {listItems}
              </ul>
            ) : (
              <ol key={`ol-${i}`} className="list-decimal ml-5 my-2">
                {listItems}
              </ol>
            ),
          )
          listItems = []
          listType = null
        }
        result.push(element)
      }
    })

    // Add any remaining list items
    if (listItems.length > 0) {
      result.push(
        listType === "ul" ? (
          <ul key="ul-last" className="list-disc ml-5 my-2">
            {listItems}
          </ul>
        ) : (
          <ol key="ol-last" className="list-decimal ml-5 my-2">
            {listItems}
          </ol>
        ),
      )
    }

    return result
  }

  return <div className={`rich-text-editor-preview ${className}`}>{renderContent()}</div>
}

export default Preview


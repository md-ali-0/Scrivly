"use client"

import type React from "react"
import { useState } from "react"
import type { VideoData } from "../types/editor"
import { XIcon } from "./icons"

interface VideoModalProps {
  onInsertVideo: (videoData: VideoData) => void
  onClose: () => void
}

export const VideoModal: React.FC<VideoModalProps> = ({ onInsertVideo, onClose }) => {
  const [url, setUrl] = useState("")
  const [width, setWidth] = useState(560)
  const [height, setHeight] = useState(315)
  const [title, setTitle] = useState("")

  const handleInsert = () => {
    if (!url.trim()) return

    const videoData: VideoData = { url: url.trim(), width, height, title }
    onInsertVideo(videoData)
  }

  const isValidUrl = (url: string) => {
    return (
      url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com") || url.startsWith("http")
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Insert Video</h3>
          <button onClick={onClose} className="close-button">
            <XIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Video URL *</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
              className={!isValidUrl(url) && url ? "error" : ""}
            />
            <small>Supports YouTube, Vimeo, and direct video URLs</small>
          </div>

          <div className="form-group">
            <label>Title (optional)</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Video title" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min="200"
                max="1200"
              />
            </div>

            <div className="form-group">
              <label>Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                min="150"
                max="800"
              />
            </div>
          </div>

          {url && isValidUrl(url) && (
            <div className="video-preview">
              <p>
                Preview size: {width} × {height}px
              </p>
              <div
                style={{
                  width: Math.min(width, 400),
                  height: Math.min(height, 225),
                  border: "2px dashed #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Video Preview
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="button secondary">
            Cancel
          </button>
          <button onClick={handleInsert} className="button primary" disabled={!url.trim() || !isValidUrl(url)}>
            Insert Video
          </button>
        </div>
      </div>
    </div>
  )
}

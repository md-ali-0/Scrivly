"use client"

import type React from "react"
import { useState } from "react"
import { X, Upload, LinkIcon } from "lucide-react"
import type { ImageData } from "../types/editor"

interface ImageModalProps {
  onInsertImage: (imageData: ImageData) => void
  onClose: () => void
  allowUpload?: boolean
  onImageUpload?: (file: File) => Promise<string>
}

export const ImageModal: React.FC<ImageModalProps> = ({
  onInsertImage,
  onClose,
  allowUpload = false,
  onImageUpload,
}) => {
  const [activeTab, setActiveTab] = useState<"url" | "upload">("url")
  const [url, setUrl] = useState("")
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(300)
  const [alt, setAlt] = useState("")
  const [title, setTitle] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")

  const handleInsert = () => {
    if (!url.trim()) return

    const imageData: ImageData = {
      url: url.trim(),
      width,
      height,
      alt: alt.trim(),
      title: title.trim(),
    }
    onInsertImage(imageData)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !onImageUpload) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file")
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size must be less than 5MB")
      return
    }

    setIsUploading(true)
    setUploadError("")

    try {
      const uploadedUrl = await onImageUpload(file)
      setUrl(uploadedUrl)
      setAlt(file.name.replace(/\.[^/.]+$/, "")) // Remove extension for alt text
      setActiveTab("url") // Switch to URL tab to show the uploaded image
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) || url.includes("data:image/")
    } catch {
      return false
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Insert Image</h3>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {allowUpload && (
            <div className="tab-container">
              <div className="tab-buttons">
                <button
                  className={`tab-button ${activeTab === "url" ? "active" : ""}`}
                  onClick={() => setActiveTab("url")}
                >
                  <LinkIcon size={16} />
                  URL
                </button>
                <button
                  className={`tab-button ${activeTab === "upload" ? "active" : ""}`}
                  onClick={() => setActiveTab("upload")}
                >
                  <Upload size={16} />
                  Upload
                </button>
              </div>
            </div>
          )}

          {activeTab === "url" && (
            <>
              <div className="form-group">
                <label>Image URL *</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={!isValidUrl(url) && url ? "error" : ""}
                />
                <small>Supports JPG, PNG, GIF, WebP, and SVG formats</small>
              </div>

              <div className="form-group">
                <label>Alt Text</label>
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="Describe the image for accessibility"
                />
                <small>Important for screen readers and SEO</small>
              </div>

              <div className="form-group">
                <label>Title (optional)</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Image title" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    min="50"
                    max="1200"
                  />
                </div>

                <div className="form-group">
                  <label>Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min="50"
                    max="800"
                  />
                </div>
              </div>

              {url && isValidUrl(url) && (
                <div className="image-preview">
                  <p>Preview:</p>
                  <div
                    style={{
                      width: Math.min(width, 300),
                      height: Math.min(height, 200),
                      border: "2px dashed #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={url || "/placeholder.svg"}
                      alt={alt || "Preview"}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                        e.currentTarget.parentElement!.innerHTML = "❌ Invalid image URL"
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "upload" && allowUpload && (
            <div className="upload-section">
              <div className="upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="file-input"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="upload-label">
                  <Upload size={48} />
                  <h4>{isUploading ? "Uploading..." : "Choose Image File"}</h4>
                  <p>Or drag and drop an image here</p>
                  <small>Supports JPG, PNG, GIF, WebP (max 5MB)</small>
                </label>
              </div>

              {uploadError && <div className="error-message">❌ {uploadError}</div>}

              {isUploading && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                  <p>Uploading image...</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="button secondary">
            Cancel
          </button>
          <button
            onClick={handleInsert}
            className="button primary"
            disabled={!url.trim() || !isValidUrl(url) || isUploading}
          >
            Insert Image
          </button>
        </div>
      </div>
    </div>
  )
}

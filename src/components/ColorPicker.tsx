"use client"

import type React from "react"
import { X } from "lucide-react"

interface ColorPickerProps {
  type: "text" | "background"
  onColorSelect: (color: string) => void
  onClose: () => void
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ type, onColorSelect, onClose }) => {
  const colors = [
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#CCCCCC",
    "#FFFFFF",
    "#FF0000",
    "#FF6600",
    "#FFCC00",
    "#FFFF00",
    "#CCFF00",
    "#66FF00",
    "#00FF00",
    "#00FF66",
    "#00FFCC",
    "#00FFFF",
    "#00CCFF",
    "#0066FF",
    "#0000FF",
    "#6600FF",
    "#CC00FF",
    "#FF00FF",
    "#FF00CC",
    "#FF0066",
    "#8B4513",
    "#A0522D",
    "#CD853F",
    "#DEB887",
    "#F4A460",
    "#D2691E",
    "#FF69B4",
    "#FF1493",
    "#DC143C",
    "#B22222",
    "#8B0000",
    "#800000",
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="color-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{type === "text" ? "Text Color" : "Background Color"}</h3>
          <button onClick={onClose} className="close-button">
            <X size={16} />
          </button>
        </div>

        <div className="color-grid">
          {colors.map((color) => (
            <button
              key={color}
              className="color-swatch"
              style={{ backgroundColor: color }}
              onClick={() => onColorSelect(color)}
              title={color}
            />
          ))}
        </div>

        <div className="custom-color">
          <label>Custom Color:</label>
          <input type="color" onChange={(e) => onColorSelect(e.target.value)} className="color-input" />
        </div>
      </div>
    </div>
  )
}

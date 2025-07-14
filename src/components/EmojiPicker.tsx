"use client"

import type React from "react"
import { XIcon } from "./icons"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  onClose: () => void
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, onClose }) => {
  const emojiCategories = {
    Smileys: [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "😅",
      "😂",
      "🤣",
      "😊",
      "😇",
      "🙂",
      "🙃",
      "😉",
      "😌",
      "😍",
      "🥰",
      "😘",
      "😗",
      "😙",
      "😚",
      "😋",
      "😛",
      "😝",
      "😜",
      "🤪",
      "🤨",
      "🧐",
      "🤓",
      "😎",
      "🤩",
      "🥳",
    ],
    Gestures: [
      "👍",
      "👎",
      "👌",
      "🤌",
      "🤏",
      "✌️",
      "🤞",
      "🤟",
      "🤘",
      "🤙",
      "👈",
      "👉",
      "👆",
      "🖕",
      "👇",
      "☝️",
      "👋",
      "🤚",
      "🖐️",
      "✋",
      "🖖",
      "👏",
      "🙌",
      "🤲",
      "🤝",
      "🙏",
    ],
    Objects: [
      "❤️",
      "🧡",
      "💛",
      "💚",
      "💙",
      "💜",
      "🖤",
      "🤍",
      "🤎",
      "💔",
      "❣️",
      "💕",
      "💞",
      "💓",
      "💗",
      "💖",
      "💘",
      "💝",
      "💟",
      "☮️",
      "✝️",
      "☪️",
      "🕉️",
      "☸️",
      "✡️",
      "🔯",
      "🕎",
      "☯️",
      "☦️",
    ],
    Nature: [
      "🌱",
      "🌿",
      "🍀",
      "🌾",
      "🌵",
      "🌲",
      "🌳",
      "🌴",
      "🌸",
      "🌺",
      "🌻",
      "🌹",
      "🥀",
      "🌷",
      "💐",
      "🌼",
      "🌙",
      "🌛",
      "🌜",
      "🌚",
      "🌕",
      "🌖",
      "🌗",
      "🌘",
      "🌑",
      "🌒",
      "🌓",
      "🌔",
      "⭐",
      "🌟",
    ],
    Food: [
      "🍎",
      "🍊",
      "🍋",
      "🍌",
      "🍉",
      "🍇",
      "🍓",
      "🫐",
      "🍈",
      "🍒",
      "🍑",
      "🥭",
      "🍍",
      "🥥",
      "🥝",
      "🍅",
      "🍆",
      "🥑",
      "🥦",
      "🥬",
      "🥒",
      "🌶️",
      "🫑",
      "🌽",
      "🥕",
      "🫒",
      "🧄",
      "🧅",
      "🥔",
      "🍠",
    ],
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="emoji-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Insert Emoji</h3>
          <button onClick={onClose} className="close-button">
            <XIcon size={16} />
          </button>
        </div>

        <div className="emoji-categories">
          {Object.entries(emojiCategories).map(([category, emojis]) => (
            <div key={category} className="emoji-category">
              <h4>{category}</h4>
              <div className="emoji-grid">
                {emojis.map((emoji) => (
                  <button key={emoji} className="emoji-button" onClick={() => onEmojiSelect(emoji)} title={emoji}>
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

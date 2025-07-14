"use client";

import { ScrivlyEditor } from "@/src/components/ScrivlyEditor";
import { useState } from "react";

export default function Home() {
    const [content, setContent] = useState(`
    <h1>🚀 Scrivly Editor v2.0 - Ultimate Rich Text Editor</h1>
    <p>Welcome to the most feature-rich rich text editor for React! This editor includes:</p>
    
    <h2>✨ Core Features</h2>
    <ul>
      <li><strong>Dark Mode Support</strong> - Toggle between light and dark themes</li>
      <li><em>Advanced Typography</em> - Multiple fonts, sizes, and formatting options</li>
      <li><u>Rich Formatting</u> - Bold, italic, underline, strikethrough, and more</li>
      <li><code>Code Support</code> - Inline code and code blocks</li>
    </ul>

    <h2>🎨 Advanced Styling</h2>
    <p>You can change <span style="color: #ff0000;">text colors</span> and <span style="background-color: #ffff00;">background colors</span> easily!</p>

    <h2>📊 Tables</h2>
    <p>Create and edit tables with full control:</p>
    <table style="border-collapse: collapse; width: 100%; margin: 1rem 0;">
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px; min-width: 100px;"><strong>Feature</strong></td>
        <td style="border: 1px solid #ccc; padding: 8px; min-width: 100px;"><strong>Status</strong></td>
      </tr>
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px; min-width: 100px;">Add/Remove Rows</td>
        <td style="border: 1px solid #ccc; padding: 8px; min-width: 100px;">✅ Available</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px; min-width: 100px;">Add/Remove Columns</td>
        <td style="border: 1px solid #ccc; padding: 8px; min-width: 100px;">✅ Available</td>
      </tr>
    </table>

    <h2>🎬 Media Support</h2>
    <p>Insert videos, images, and more with resize capabilities!</p>

    <blockquote>
      This editor provides a professional writing experience with modern features and beautiful design.
    </blockquote>

    <h2>⌨️ Keyboard Shortcuts</h2>
    <ul>
      <li><strong>Ctrl+B</strong> - Bold</li>
      <li><strong>Ctrl+I</strong> - Italic</li>
      <li><strong>Ctrl+U</strong> - Underline</li>
      <li><strong>Ctrl+K</strong> - Insert Link</li>
      <li><strong>Ctrl+Z</strong> - Undo</li>
      <li><strong>Ctrl+Shift+Z</strong> - Redo</li>
    </ul>
  `);

    const [isDarkMode, setIsDarkMode] = useState(false); 

    return (
        <div className="app-container">
            <div className="header">
                <h1>🎯 Scrivly Editor</h1>
                <p>
                    The Ultimate Rich Text Editor with Dark Mode & Advanced
                    Features
                </p>
            </div>

            <div className="editor-wrapper">
                <ScrivlyEditor
                    value={content}
                    onChange={setContent}
                    placeholder="Start creating something amazing..."
                    maxHeight="700px"
                    minHeight="400px"
                    darkMode={isDarkMode}
                    onDarkModeChange={setIsDarkMode}
                    autoSave={true}
                    autoSaveInterval={3000}
                    showWordCount={true}
                    showCharCount={true}
                    spellCheck={true}
                />
            </div>

            <div className="features-showcase">
                <h2>🎁 New Features Added</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>🌙 Dark Mode</h3>
                        <p>Beautiful dark theme with smooth transitions</p>
                    </div>
                    <div className="feature-card">
                        <h3>📊 Advanced Tables</h3>
                        <p>Create, resize, add/remove rows and columns</p>
                    </div>
                    <div className="feature-card">
                        <h3>🎬 Video Support</h3>
                        <p>Embed YouTube, Vimeo videos with resize handles</p>
                    </div>
                    <div className="feature-card">
                        <h3>🎨 Color Picker</h3>
                        <p>Text and background color customization</p>
                    </div>
                    <div className="feature-card">
                        <h3>📝 Format Selector</h3>
                        <p>Dropdown for H1, H2, H3, paragraphs, and more</p>
                    </div>
                    <div className="feature-card">
                        <h3>😊 Emoji Picker</h3>
                        <p>Insert emojis with categorized picker</p>
                    </div>
                    <div className="feature-card">
                        <h3>🔤 Typography</h3>
                        <p>Font family and size selection</p>
                    </div>
                    <div className="feature-card">
                        <h3>📱 Responsive</h3>
                        <p>Works perfectly on all devices</p>
                    </div>
                    <div className="feature-card">
                        <h3>⚡ Auto-save</h3>
                        <p>Automatic content saving every 3 seconds</p>
                    </div>
                    <div className="feature-card">
                        <h3>🔍 Fullscreen</h3>
                        <p>Distraction-free writing mode</p>
                    </div>
                    <div className="feature-card">
                        <h3>✅ Checklists</h3>
                        <p>Interactive todo lists and checkboxes</p>
                    </div>
                    <div className="feature-card">
                        <h3>🎯 TypeScript</h3>
                        <p>Full TypeScript support with proper types</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

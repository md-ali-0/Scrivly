# 🚀 Scrivly Editor

A powerful, feature-rich rich text editor for React with TypeScript support. Built with modern React patterns and designed for professional applications.

[![npm version](https://badge.fury.io/js/scrivly-editor.svg)](https://badge.fury.io/js/scrivly-editor)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🎨 **Rich Formatting**
- **Text Styling**: Bold, italic, underline, strikethrough, subscript, superscript
- **Code Support**: Inline code and syntax-highlighted code blocks
- **Typography**: Multiple font families and sizes
- **Colors**: Text and background color picker
- **Alignment**: Left, center, right, and justify alignment

### 📝 **Content Structure**
- **Headings**: H1 through H6 with dropdown selector
- **Lists**: Bullet lists, numbered lists, and interactive checklists
- **Quotes**: Beautiful blockquotes with styling
- **Tables**: Full table support with context menu operations
- **Media**: Image and video embedding with resize handles

### 🛠️ **Advanced Features**
- **Dark Mode**: Beautiful dark/light theme toggle
- **Fullscreen**: Distraction-free writing mode
- **Undo/Redo**: 50-state history management
- **Auto-save**: Configurable auto-save functionality
- **Word Count**: Live word and character counting
- **Custom Tools**: Extensible toolbar with custom tool support

### 🎯 **User Experience**
- **Keyboard Shortcuts**: Standard shortcuts (Ctrl+B, Ctrl+I, etc.)
- **Context Menus**: Right-click table operations
- **Drag & Resize**: Resizable images and videos
- **Smart Dropdowns**: Intelligent dropdown management
- **Responsive**: Works on desktop, tablet, and mobile

### 🔧 **Developer Experience**
- **TypeScript**: Full TypeScript support with proper types
- **Customizable**: Extensive customization options
- **Accessible**: WCAG compliant with screen reader support
- **Modern**: Built with React hooks and modern patterns

## 📦 Installation

\`\`\`bash
npm install scrivly-editor
# or
yarn add scrivly-editor
# or
pnpm add scrivly-editor
\`\`\`

## 🚀 Quick Start

\`\`\`tsx
import React, { useState } from 'react'
import { ScrivlyEditor } from 'scrivly-editor'
import 'scrivly-editor/dist/style.css' // Import styles

function App() {
  const [content, setContent] = useState('<p>Start writing...</p>')

  return (
    <ScrivlyEditor
      value={content}
      onChange={setContent}
      placeholder="Start writing something amazing..."
      showWordCount={true}
      showCharCount={true}
      darkMode={false}
    />
  )
}

export default App
\`\`\`

## 🎛️ Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`string\` | \`""\` | HTML content of the editor |
| \`onChange\` | \`(content: string) => void\` | - | Callback when content changes |
| \`placeholder\` | \`string\` | \`"Start writing..."\` | Placeholder text |
| \`readOnly\` | \`boolean\` | \`false\` | Make editor read-only |

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`className\` | \`string\` | \`""\` | CSS class for editor container |
| \`toolbarClassName\` | \`string\` | \`""\` | CSS class for toolbar |
| \`contentClassName\` | \`string\` | \`""\` | CSS class for content area |
| \`maxHeight\` | \`string\` | \`"600px"\` | Maximum height of editor |
| \`minHeight\` | \`string\` | \`"300px"\` | Minimum height of editor |

### Feature Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`toolbarOptions\` | \`ToolbarOption[]\` | All options | Which toolbar buttons to show |
| \`customTools\` | \`CustomTool[]\` | \`[]\` | Custom toolbar tools |
| \`darkMode\` | \`boolean\` | \`false\` | Enable dark mode |
| \`showWordCount\` | \`boolean\` | \`true\` | Show word count |
| \`showCharCount\` | \`boolean\` | \`true\` | Show character count |
| \`autoSave\` | \`boolean\` | \`false\` | Enable auto-save |
| \`autoSaveInterval\` | \`number\` | \`5000\` | Auto-save interval (ms) |
| \`spellCheck\` | \`boolean\` | \`true\` | Enable spell checking |

### Upload Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`allowImageUpload\` | \`boolean\` | \`false\` | Enable image upload |
| \`onImageUpload\` | \`(file: File) => Promise<string>\` | - | Handle image upload |
| \`allowVideoUpload\` | \`boolean\` | \`false\` | Enable video upload |
| \`onVideoUpload\` | \`(file: File) => Promise<string>\` | - | Handle video upload |

### Event Props

| Prop | Type | Description |
|------|------|-------------|
| \`onStateChange\` | \`(state: EditorState) => void\` | Called when editor state changes |
| \`onDarkModeChange\` | \`(isDark: boolean) => void\` | Called when dark mode toggles |

## 🛠️ Custom Tools

You can extend the editor with custom tools:

\`\`\`tsx
import { ScrivlyEditor, CustomTool } from 'scrivly-editor'
import { Highlighter } from 'lucide-react'

const customTools: CustomTool[] = [
  {
    id: 'highlight',
    name: 'Highlight',
    icon: Highlighter,
    tooltip: 'Highlight text',
    group: 'formatting', // Optional grouping
    action: (editor) => {
      // Your custom action
      document.execCommand('hiliteColor', false, '#ffff00')
    },
    isActive: (editor) => {
      // Return true if tool should appear active
      return document.queryCommandState('hiliteColor')
    }
  }
]

function App() {
  return (
    <ScrivlyEditor
      customTools={customTools}
      toolbarOptions={['bold', 'italic', 'customTool']} // Include 'customTool' to show custom tools
    />
  )
}
\`\`\`

## 🎨 Toolbar Options

Available toolbar options:

\`\`\`tsx
type ToolbarOption = 
  | "bold" | "italic" | "underline" | "strikethrough"
  | "code" | "subscript" | "superscript"
  | "textColor" | "backgroundColor" 
  | "fontSize" | "fontFamily" | "formatBlock"
  | "blockquote" | "bulletList" | "numberList" | "checklist"
  | "codeBlock" | "table" | "link" | "image" | "video" | "emoji"
  | "alignLeft" | "alignCenter" | "alignRight" | "alignJustify"
  | "indent" | "outdent" | "lineHeight" | "clear"
  | "undo" | "redo" | "fullscreen" | "darkMode"
\`\`\`

## 📸 Image Upload Example

\`\`\`tsx
import { ScrivlyEditor } from 'scrivly-editor'

function App() {
  const handleImageUpload = async (file: File): Promise<string> => {
    // Upload to your server/cloud storage
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    
    const { url } = await response.json()
    return url
  }

  return (
    <ScrivlyEditor
      allowImageUpload={true}
      onImageUpload={handleImageUpload}
    />
  )
}
\`\`\`

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| \`Ctrl+B\` | Bold |
| \`Ctrl+I\` | Italic |
| \`Ctrl+U\` | Underline |
| \`Ctrl+K\` | Insert Link |
| \`Ctrl+Z\` | Undo |
| \`Ctrl+Shift+Z\` | Redo |

## 🎨 Styling

The editor comes with beautiful default styles, but you can customize them:

\`\`\`css
/* Custom editor styling */
.scrivly-editor {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.scrivly-toolbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.scrivly-editor-content {
  font-family: 'Georgia', serif;
  line-height: 1.8;
}
\`\`\`

## 🌙 Dark Mode

The editor supports beautiful dark mode:

\`\`\`tsx
import { ScrivlyEditor } from 'scrivly-editor'
import { useState } from 'react'

function App() {
  const [isDark, setIsDark] = useState(false)

  return (
    <ScrivlyEditor
      darkMode={isDark}
      onDarkModeChange={setIsDark}
      toolbarOptions={['darkMode', 'bold', 'italic']} // Include darkMode button
    />
  )
}
\`\`\`

## 📱 Responsive Design

The editor is fully responsive and works great on:
- 🖥️ Desktop computers
- 📱 Mobile phones  
- 📟 Tablets
- 💻 Laptops

## ♿ Accessibility

Scrivly Editor is built with accessibility in mind:
- **Screen Reader Support**: Proper ARIA labels and roles
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Works with high contrast modes
- **Focus Management**: Proper focus indicators

## 🔧 TypeScript Support

Full TypeScript support with comprehensive type definitions:

\`\`\`tsx
import { ScrivlyEditor, ScrivlyEditorProps, EditorState } from 'scrivly-editor'

const editorProps: ScrivlyEditorProps = {
  value: '<p>Hello World</p>',
  onChange: (content: string) => console.log(content),
  onStateChange: (state: EditorState) => console.log(state),
  toolbarOptions: ['bold', 'italic', 'underline'],
  darkMode: true
}
\`\`\`

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Inspired by modern text editors

## 📞 Support

- 📧 Email: support@scrivly-editor.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/scrivly-editor/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/scrivly-editor/discussions)

---

Made with ❤️ by the Scrivly Editor team

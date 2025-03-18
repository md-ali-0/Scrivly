# React Simple Rich Text Editor

A lightweight, customizable rich text editor for React applications built on **Draft.js**.

![React Simple Rich Text Editor](https://via.placeholder.com/800x400?text=React+Simple+Rich+Text+Editor)

## 🚀 Features

- 📝 **Basic text formatting** (Bold, Italic, Strikethrough)
- 🔤 **Heading support** (H1, H2, H3)
- 📋 **Lists** (Ordered and Unordered)
- 🔗 **Link insertion**
- 📷 **Image embedding** from URL
- 🎬 **Media embedding** (YouTube, Vimeo)
- 💻 **Code and Code Block formatting**
- 🎨 **Customizable styling**
- 📱 **Responsive design**
- ⚡ **Lightweight and performant**

## 📦 Installation

```bash
# Using npm
npm install scrivly

# Using yarn
yarn add scrivly

# Using pnpm
pnpm add scrivly
```

## 🛠 Usage

```jsx
import React, { useState } from "react";
import { ScrivlyEditor } from "scrivly";

const App = () => {
  const [content, setContent] = useState("");

  return (
    <div>
      <h2>Rich Text Editor</h2>
      <ScrivlyEditor value={content} onChange={setContent} />
      <h3>Preview:</h3>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default App;
```

## 🎨 Customization

You can customize the editor using props:

```jsx
<ScrivlyEditor
  value={content}
  onChange={setContent}
  toolbarOptions={["bold", "italic", "underline", "link", "image"]}
  placeholder="Start typing..."
  className="custom-editor"
/>
```

## 🛡️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to submit a PR or open an issue.

## 📧 Contact

For any questions or feedback, reach out via [GitHub Issues](https://github.com/your-username/scrivly-editor/issues).


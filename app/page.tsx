"use client";

import { ScrivlyEditor } from "@/src/components/ScrivlyEditor";
import { useEffect, useState } from "react";

export default function Home() {
    const [content, setContent] = useState("");
    
    const [isDarkMode, setIsDarkMode] = useState(true); 
    
    // Set default content and dark mode on initial load
    useEffect(() => {
        // Set dark mode as default
        document.documentElement.setAttribute("data-theme", "dark");
        
        // Set default content
        const defaultContent = `
        <h1>Welcome to Scrivly</h1>
        <p>A beautifully simple rich text editor</p>
        
        <h2>✨ Features</h2>
        <ul>
          <li>🌙 Dark mode by default</li>
          <li>⚡ Clean, minimalist design</li>
          <li>📝 Full rich text formatting</li>
          <li>📊 Tables and media support</li>
          <li>⌨️ Keyboard shortcuts</li>
        </ul>
        
        <blockquote>
          Start writing something amazing...
        </blockquote>
      `;
      
        setContent(defaultContent);
    }, []);

    return (
        <div className="app-container">
            <div className="header">
                <h1>Scrivly Editor</h1>
                <p>A clean, beautiful rich text editor with dark mode</p>
            </div>

            <div className="editor-wrapper">
                <ScrivlyEditor
                    value={content}
                    onChange={setContent}
                    placeholder="Start writing something amazing..."
                    maxHeight="600px"
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
                <h2>Why Scrivly?</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>🌙 Dark by Default</h3>
                        <p>Elegant dark theme for comfortable writing</p>
                    </div>
                    <div className="feature-card">
                        <h3>✨ Minimal Design</h3>
                        <p>Clean interface that stays out of your way</p>
                    </div>
                    <div className="feature-card">
                        <h3>⚡ Fast & Light</h3>
                        <p>Optimized performance for smooth editing</p>
                    </div>
                    <div className="feature-card">
                        <h3>📱 Fully Responsive</h3>
                        <p>Works beautifully on all devices</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
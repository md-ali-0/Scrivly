"use client";

import React, { useState } from "react";
import { RichTextEditor } from "../src";
import "../src/styles.css";

const App = () => {
    const [content, setContent] = useState("");

    const handleChange = (newContent: string) => {
        setContent(newContent);
        console.log("Content changed:", newContent);
    };

    return (
        <div
            className="app"
            style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}
        >
            <h1
                style={{
                    marginBottom: "1.5rem",
                    color: "#1e293b",
                    fontSize: "2rem",
                }}
            >
                Rich Text Editor
            </h1>

            <RichTextEditor
                initialContent="Start editing here..."
                onChange={handleChange}
                placeholder="Type something beautiful..."
            />

            <div
                style={{
                    marginTop: "2rem",
                    padding: "1.5rem",
                    backgroundColor: "#f8fafc",
                    borderRadius: "0.5rem",
                    border: "1px solid #e2e8f0",
                }}
            >
                <h2
                    style={{
                        marginBottom: "1rem",
                        color: "#334155",
                        fontSize: "1.25rem",
                    }}
                >
                    Content Preview (Raw JSON):
                </h2>
                <pre
                    style={{
                        padding: "1rem",
                        backgroundColor: "#f1f5f9",
                        borderRadius: "0.375rem",
                        overflow: "auto",
                        fontSize: "0.875rem",
                        fontFamily: "monospace",
                    }}
                >
                    {content ||
                        "// Content will appear here when you start typing..."}
                </pre>
            </div>
        </div>
    );
};

export default App;

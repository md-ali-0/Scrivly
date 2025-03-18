"use client";

import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import type React from "react";
import { useEffect, useState } from "react";
import { Content } from "./Content";
import { Toolbar } from "./Toolbar";

// Define the available toolbar options
export type ToolbarOption =
    | "bold"
    | "italic"
    | "strikethrough"
    | "underline"
    | "link"
    | "h1"
    | "h2"
    | "h3"
    | "bulletList"
    | "numberList"
    | "code"
    | "codeBlock"
    | "image"
    | "video"
    | "clear";

export interface ScrivlyEditorProps {
    value?: string;
    onChange?: (content: string) => void;
    toolbarOptions?: ToolbarOption[];
    placeholder?: string;
    className?: string;
    toolbarClassName?: string;
    contentClassName?: string;
}

export const ScrivlyEditor: React.FC<ScrivlyEditorProps> = ({
    value = "",
    onChange,
    toolbarOptions = [
        "bold",
        "italic",
        "strikethrough",
        "underline",
        "link",
        "h1",
        "h2",
        "h3",
        "bulletList",
        "numberList",
        "code",
        "codeBlock",
        "image",
        "video",
        "clear",
    ],
    placeholder = "Start typing...",
    className = "",
    toolbarClassName = "",
    contentClassName = "",
}) => {
    const [editorState, setEditorState] = useState(() => {
        if (value) {
            try {
                // Try to parse the value as JSON (for Draft.js raw content)
                const rawContent = JSON.parse(value);
                const contentState = convertFromRaw(rawContent);
                return EditorState.createWithContent(contentState);
            } catch (e) {
                // If parsing fails, treat it as plain text
                return EditorState.createWithContent(
                    ContentState.createFromText(value)
                );
            }
        }
        return EditorState.createEmpty();
    });

    useEffect(() => {
        // Update editor state when value prop changes
        if (value) {
            try {
                // Try to parse the value as JSON (for Draft.js raw content)
                const rawContent = JSON.parse(value);
                const contentState = convertFromRaw(rawContent);
                setEditorState(EditorState.createWithContent(contentState));
            } catch (e) {
                // If parsing fails, treat it as plain text
                setEditorState(
                    EditorState.createWithContent(
                        ContentState.createFromText(value)
                    )
                );
            }
        }
    }, [value]);

    const handleChange = (state: EditorState) => {
        setEditorState(state);

        if (onChange) {
            const contentState = state.getCurrentContent();
            const rawContent = convertToRaw(contentState);
            onChange(JSON.stringify(rawContent));
        }
    };

    const handleKeyCommand = (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            handleChange(newState);
            return "handled";
        }
        return "not-handled";
    };

    const toggleBlockType = (blockType: string) => {
        handleChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    const toggleInlineStyle = (inlineStyle: string) => {
        handleChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    return (
        <div className={`rich-text-editor ${className}`}>
            <Toolbar
                editorState={editorState}
                onToggleBlockType={toggleBlockType}
                onToggleInlineStyle={toggleInlineStyle}
                onChange={handleChange}
                toolbarOptions={toolbarOptions}
                className={toolbarClassName}
            />
            <Content
                editorState={editorState}
                onChange={handleChange}
                handleKeyCommand={handleKeyCommand}
                placeholder={placeholder}
                className={contentClassName}
            />
        </div>
    );
};

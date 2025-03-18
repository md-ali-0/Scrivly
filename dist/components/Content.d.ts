import { type DraftHandleValue, type EditorState } from "draft-js";
import type React from "react";
export interface ContentProps {
    editorState: EditorState;
    onChange: (editorState: EditorState) => void;
    handleKeyCommand: (command: string, editorState: EditorState) => DraftHandleValue;
    placeholder?: string;
    className?: string;
}
export declare const Content: React.FC<ContentProps>;

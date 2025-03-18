import type { EditorState } from "draft-js";
import type React from "react";
export interface ToolbarProps {
    editorState: EditorState;
    onToggleBlockType: (blockType: string) => void;
    onToggleInlineStyle: (inlineStyle: string) => void;
    className?: string;
}
export declare const Toolbar: React.FC<ToolbarProps>;

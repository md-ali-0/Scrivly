import type { EditorState } from "draft-js";
import type React from "react";
import type { ToolbarOption } from "./ScrivlyEditor";
export interface ToolbarProps {
    editorState: EditorState;
    onToggleBlockType: (blockType: string) => void;
    onToggleInlineStyle: (inlineStyle: string) => void;
    onChange: (editorState: EditorState) => void;
    toolbarOptions?: ToolbarOption[];
    className?: string;
}
export declare const Toolbar: React.FC<ToolbarProps>;

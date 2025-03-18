import "draft-js/dist/Draft.css";
import type React from "react";
export interface RichTextEditorProps {
    initialContent?: string;
    onChange?: (content: string) => void;
    className?: string;
    placeholder?: string;
    toolbarClassName?: string;
    contentClassName?: string;
}
export declare const RichTextEditor: React.FC<RichTextEditorProps>;

export type CustomIcon = React.SVGProps<SVGSVGElement> & {
    size?: number | string;
};

export const AlignCenter = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-align-center-icon lucide-align-center"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M17 12H7M19 18H5M21 6H3"></path>
    </svg>
);

export const AlignJustify = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-align-justify-icon lucide-align-justify"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M3 12h18M3 18h18M3 6h18"></path>
    </svg>
);

export const AlignLeft = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-align-left-icon lucide-align-left"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M15 12H3M17 18H3M21 6H3"></path>
    </svg>
);

export const AlignRight = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-align-right-icon lucide-align-right"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M21 12H9M21 18H7M21 6H3"></path>
    </svg>
);

export const Bold = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-bold-icon lucide-bold"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"></path>
    </svg>
);

export const CheckSquare = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-square-check-big-icon lucide-square-check-big"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"></path>
        <path d="m9 11 3 3L22 4"></path>
    </svg>
);

export const ChevronDown = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-chevron-down-icon lucide-chevron-down"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        {...props}
    >
        <path d="m6 9 6 6 6-6"></path>
    </svg>
);

export const Code = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-code-icon lucide-code"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
);

export const Eraser = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-eraser-icon lucide-eraser"
        viewBox="0 0 24 24"
    >
        <path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21M5.082 11.09l8.828 8.828"></path>
    </svg>
);

export const FileCode = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-file-code-icon lucide-file-code"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m10 13-2 2 2 2" />
        <path d="m14 17 2-2-2-2" />
    </svg>
);

export const ImageIcon = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-image-icon lucide-image"
        viewBox="0 0 24 24"
        {...props}
    >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
    </svg>
);

export const Indent = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-indent-icon lucide-indent"
        viewBox="0 0 24 24"
        {...props}
    >
        <polyline points="3 8 7 12 3 16" />
        <line x1="21" x2="11" y1="12" y2="12" />
        <line x1="21" x2="11" y1="6" y2="6" />
        <line x1="21" x2="11" y1="18" y2="18" />
    </svg>
);

export const Italic = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-italic-icon lucide-italic"
        viewBox="0 0 24 24"
        {...props}
    >
        <line x1="19" x2="10" y1="4" y2="4" />
        <line x1="14" x2="5" y1="20" y2="20" />
        <line x1="15" x2="9" y1="4" y2="20" />
    </svg>
);

export const Link = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-link-icon lucide-link"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);

export const List = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-list-icon lucide-list"
        viewBox="0 0 24 24"
    >
        <path d="M3 12h.01M3 18h.01M3 6h.01M8 12h13M8 18h13M8 6h13"></path>
    </svg>
);

export const ListOrdered = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-list-ordered-icon lucide-list-ordered"
        viewBox="0 0 24 24"
        {...props}
    >
        <line x1="10" x2="21" y1="6" y2="6" />
        <line x1="10" x2="21" y1="12" y2="12" />
        <line x1="10" x2="21" y1="18" y2="18" />
        <path d="M4 6h1v4" />
        <path d="M4 10h2" />
        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
);

export const Maximize = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-maximize-icon lucide-maximize"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
);

export const Minimize = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-minimize-icon lucide-minimize"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
    </svg>
);

export const Moon = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-moon-icon lucide-moon"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
    </svg>
);

export const Outdent = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-outdent-icon lucide-outdent"
        viewBox="0 0 24 24"
        {...props}
    >
        <polyline points="7 8 3 12 7 16" />
        <line x1="21" x2="11" y1="12" y2="12" />
        <line x1="21" x2="11" y1="6" y2="6" />
        <line x1="21" x2="11" y1="18" y2="18" />
    </svg>
);

export const Palette = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-palette-icon lucide-palette"
        viewBox="0 0 24 24"
    >
        <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"></path>
        <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"></circle>
        <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"></circle>
        <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"></circle>
        <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"></circle>
    </svg>
);

export const Quote = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-quote-icon lucide-quote"
        viewBox="0 0 24 24"
    >
        <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2zM5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
    </svg>
);

export const RotateCcw = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
    </svg>
);

export const RotateCw = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-rotate-cw-icon lucide-rotate-cw"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
    </svg>
);

export const Smile = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-smile-icon lucide-smile"
        viewBox="0 0 24 24"
        {...props}
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
);

export const Strikethrough = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-strikethrough-icon lucide-strikethrough"
        viewBox="0 0 24 24"
    >
        <path d="M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6M4 12h16"></path>
    </svg>
);

export const Subscript = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-subscript-icon lucide-subscript"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="m4 5 8 8" />
        <path d="m12 5 8 8" />
        <path d="M20 19h-4c0-1.5.44-2 1.5-2s1.5.5 1.5 2Z" />
    </svg>
);

export const Sun = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-sun-icon lucide-sun"
        viewBox="0 0 24 24"
        {...props}
    >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" x2="12" y1="1" y2="3" />
        <line x1="12" x2="12" y1="21" y2="23" />
        <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
        <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
        <line x1="1" x2="3" y1="12" y2="12" />
        <line x1="21" x2="23" y1="12" y2="12" />
        <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
        <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
    </svg>
);

export const Superscript = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-superscript-icon lucide-superscript"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="m4 19 8-8" />
        <path d="m12 19 8-8" />
        <path d="M20 7h-4c0-1.5.44-2 1.5-2s1.5.5 1.5 2Z" />
    </svg>
);

export const Table = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-table-icon lucide-table"
        width={size}
        height={size}
        viewBox="0 0 24 24"
    >
        <path d="M12 3v18"></path>
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M3 9h18M3 15h18"></path>
    </svg>
);

export const Type = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-type-icon lucide-type"
        viewBox="0 0 24 24"
        {...props}
    >
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" x2="15" y1="20" y2="20" />
        <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
);

export const Underline = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-underline-icon lucide-underline"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M6 4v6a6 6 0 0 0 12 0V4" />
        <line x1="4" x2="20" y1="20" y2="20" />
    </svg>
);

export const Video = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-video-icon lucide-video"
        viewBox="0 0 24 24"
    >
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
        <rect width="14" height="12" x="2" y="6" rx="2"></rect>
    </svg>
);

export const XIcon = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-x-icon lucide-x"
        viewBox="0 0 24 24"
    >
        <path d="M18 6 6 18M6 6l12 12"></path>
    </svg>
);

export const Highlighter = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-highlighter-icon lucide-highlighter"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="m9 11-6 6v3h9l3-3" />
        <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
    </svg>
);

export const Search = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-search-icon lucide-search"
        viewBox="0 0 24 24"
        {...props}
    >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);

export const Download = ({ size = 16, ...props }: CustomIcon) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="lucide lucide-download-icon lucide-download"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
);

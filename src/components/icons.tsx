type IconProps = React.SVGProps<SVGSVGElement> & {
    size?: number | string;
};

export const AlignCenter = ({ size = 16, ...props }: IconProps) => (
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

export const AlignJustify = ({ size = 16, ...props }: IconProps) => (
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

export const AlignLeft = ({ size = 16, ...props }: IconProps) => (
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

export const AlignRight = ({ size = 16, ...props }: IconProps) => (
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

export const Bold = ({ size = 16, ...props }: IconProps) => (
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

export const CheckSquare = ({ size = 16, ...props }: IconProps) => (
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

export const ChevronDown = ({ size = 16, ...props }: IconProps) => (
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

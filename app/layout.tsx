import type { Metadata } from "next";
import type React from "react";
import "./../src/styles.css";

export const metadata: Metadata = {
    title: {
        default: "Scrivly Editor - Powerful Rich Text Editor for React",
        template: "%s | Scrivly Editor",
    },
    description:
        "A powerful, feature-rich rich text editor for React with TypeScript support. Built with modern React patterns and designed for professional applications.",
    keywords: [
        "rich text editor",
        "react editor",
        "typescript editor",
        "wysiwyg editor",
        "text editor",
        "markdown editor",
        "react component",
        "typescript",
        "javascript",
        "web editor",
        "content editor",
        "document editor",
        "scrivly",
        "react rich text",
        "html editor",
    ],
    authors: [
        {
            name: "Ali",
            url: "https://github.com/md-ali-0",
        },
    ],
    creator: "Ali",
    publisher: "Scrivly",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://scrivly.vercel.app"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://scrivly.vercel.app",
        title: "Scrivly Editor - Powerful Rich Text Editor for React",
        description:
            "A powerful, feature-rich rich text editor for React with TypeScript support. Built with modern React patterns and designed for professional applications.",
        siteName: "Scrivly Editor",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Scrivly Editor - Rich Text Editor for React",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Scrivly Editor - Powerful Rich Text Editor for React",
        description:
            "A powerful, feature-rich rich text editor for React with TypeScript support. Built with modern React patterns and designed for professional applications.",
        images: ["/twitter-image.png"],
        creator: "@your_twitter_handle",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "your-google-verification-code"
    },
    category: "technology",
    classification: "Software Development Tool",
    referrer: "origin-when-cross-origin",
    generator: "Next.js",
    applicationName: "Scrivly Editor",
    appleWebApp: {
        capable: true,
        title: "Scrivly Editor",
        statusBarStyle: "default",
    },
    manifest: "/manifest.json",
    icons: {
        icon: [
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: [
            {
                url: "/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
        other: [
            {
                rel: "mask-icon",
                url: "/safari-pinned-tab.svg",
                color: "#6366f1",
            },
        ],
    },
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
    ],
    colorScheme: "light dark",
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
    other: {
        "msapplication-TileColor": "#6366f1",
        "msapplication-config": "/browserconfig.xml",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Additional meta tags that can't be set via Metadata API */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <meta name="theme-color" content="#6366f1" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta
                    name="format-detection"
                    content="telephone=no, date=no, email=no, address=no"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}

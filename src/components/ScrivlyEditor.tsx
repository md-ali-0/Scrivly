"use client";

import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
    BlockFormat,
    FontFamily,
    FontSize,
    ScrivlyEditorProps,
    TableData,
    VideoData,
} from "../types/editor";
import { ColorPicker } from "./ColorPicker";
import { EmojiPicker } from "./EmojiPicker";
import { TableModal } from "./TableModal";
import { Toolbar } from "./Toolbar";
import { VideoModal } from "./VideoModal";

export const ScrivlyEditor: React.FC<ScrivlyEditorProps> = ({
    value = "",
    onChange,
    onStateChange,
    toolbarOptions = [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "code",
        "textColor",
        "backgroundColor",
        "fontSize",
        "fontFamily",
        "formatBlock",
        "blockquote",
        "bulletList",
        "numberList",
        "checklist",
        "table",
        "link",
        "image",
        "video",
        "emoji",
        "alignLeft",
        "alignCenter",
        "alignRight",
        "alignJustify",
        "indent",
        "outdent",
        "lineHeight",
        "codeBlock",
        "undo",
        "redo",
        "clear",
        "fullscreen",
        "darkMode",
    ],
    placeholder = "Start writing something amazing...",
    className = "",
    toolbarClassName = "",
    contentClassName = "",
    maxHeight = "600px",
    minHeight = "300px",
    readOnly = false,
    darkMode = false,
    onDarkModeChange,
    showWordCount = true,
    showCharCount = true,
    autoSave = false,
    autoSaveInterval = 5000,
    spellCheck = true,
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState<Record<string, boolean>>({});
    const [currentBlock, setCurrentBlock] = useState<BlockFormat>("p");
    const [history, setHistory] = useState<string[]>([value]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(darkMode);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showTableModal, setShowTableModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState<
        "text" | "background" | null
    >(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(
        null
    );
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [selectedTable, setSelectedTable] = useState<HTMLTableElement | null>(
        null
    );
    const [tableContextMenu, setTableContextMenu] = useState<{
        show: boolean;
        x: number;
        y: number;
        element: HTMLElement | null;
    }>({ show: false, x: 0, y: 0, element: null });

    // Auto-save functionality
    useEffect(() => {
        if (!autoSave || !onChange) return;

        const interval = setInterval(() => {
            if (editorRef.current) {
                const content = editorRef.current.innerHTML;
                onChange(content);
            }
        }, autoSaveInterval);

        return () => clearInterval(interval);
    }, [autoSave, autoSaveInterval, onChange]);

    // Dark mode effect
    useEffect(() => {
        setIsDarkMode(darkMode);
        document.documentElement.setAttribute(
            "data-theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    // Initialize editor content
    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value;
            updateStats();
        }
    }, [value]);

    // Update statistics
    const updateStats = useCallback(() => {
        if (!editorRef.current) return;

        const text = editorRef.current.textContent || "";
        const words = text
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0);
        setWordCount(words.length);
        setCharCount(text.length);
    }, []);

    // Update active states and current block
    const updateActiveStates = useCallback(() => {
        if (!editorRef.current) return;

        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const activeStates: Record<string, boolean> = {};

        // Check inline styles
        activeStates.bold = document.queryCommandState("bold");
        activeStates.italic = document.queryCommandState("italic");
        activeStates.underline = document.queryCommandState("underline");
        activeStates.strikethrough =
            document.queryCommandState("strikeThrough");
        activeStates.subscript = document.queryCommandState("subscript");
        activeStates.superscript = document.queryCommandState("superscript");

        // Check alignment
        activeStates.alignLeft = document.queryCommandState("justifyLeft");
        activeStates.alignCenter = document.queryCommandState("justifyCenter");
        activeStates.alignRight = document.queryCommandState("justifyRight");
        activeStates.alignJustify = document.queryCommandState("justifyFull");

        // Check lists
        activeStates.bulletList = document.queryCommandState(
            "insertUnorderedList"
        );
        activeStates.numberList =
            document.queryCommandState("insertOrderedList");

        // Check block format
        const formatBlock = document
            .queryCommandValue("formatBlock")
            .toLowerCase();
        setCurrentBlock((formatBlock || "div") as BlockFormat);

        // Check for special elements
        const range = selection.getRangeAt(0);
        let node: Node | null = range.commonAncestorContainer;

        activeStates.code = false;
        activeStates.codeBlock = false;
        activeStates.blockquote = false;

        while (node && node !== editorRef.current) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                if (element.tagName === "CODE") activeStates.code = true;
                if (element.tagName === "PRE") activeStates.codeBlock = true;
                if (element.tagName === "BLOCKQUOTE")
                    activeStates.blockquote = true;
            }
            node = node.parentNode;
        }

        setIsActive(activeStates);
    }, []);

    // Handle content change
    const handleInput = useCallback(() => {
        if (!editorRef.current) return;

        const content = editorRef.current.innerHTML;
        onChange?.(content);
        updateStats();
        updateActiveStates();

        // Add to history
        setHistory((prev) => {
            const newHistory = prev.slice(0, historyIndex + 1);
            newHistory.push(content);
            return newHistory.slice(-50);
        });
        setHistoryIndex((prev) => prev + 1);

        // Emit state change
        onStateChange?.({
            content,
            activeFormats: new Set(
                Object.keys(isActive).filter((key) => isActive[key])
            ),
            currentBlock,
            isDarkMode,
            isFullscreen,
        });
    }, [
        onChange,
        historyIndex,
        isActive,
        currentBlock,
        isDarkMode,
        isFullscreen,
        onStateChange,
        updateStats,
        updateActiveStates,
    ]);

    // Execute command with focus restoration
    const execCommand = useCallback(
        (command: string, value?: string) => {
            if (!editorRef.current) return;

            editorRef.current.focus();
            document.execCommand(command, false, value);
            updateActiveStates();
            handleInput();
        },
        [updateActiveStates, handleInput]
    );

    // Insert HTML content
    const insertHTML = useCallback(
        (html: string) => {
            if (!editorRef.current) return;

            editorRef.current.focus();
            document.execCommand("insertHTML", false, html);
            handleInput();
        },
        [handleInput]
    );

    // Create table
    const createTable = useCallback(
        (tableData: TableData) => {
            const { rows, cols } = tableData;
            let tableHTML =
                '<table class="editor-table" style="border-collapse: collapse; width: 100%; margin: 1rem 0;">';

            for (let i = 0; i < rows; i++) {
                tableHTML += "<tr>";
                for (let j = 0; j < cols; j++) {
                    const cellContent = tableData.data?.[i]?.[j] || "";
                    tableHTML += `<td style="border: 1px solid #ccc; padding: 8px; min-width: 100px;" contenteditable="true">${cellContent}</td>`;
                }
                tableHTML += "</tr>";
            }
            tableHTML += "</table>";

            insertHTML(tableHTML);
            setShowTableModal(false);
        },
        [insertHTML]
    );

    // Insert video
    const insertVideo = useCallback(
        (videoData: VideoData) => {
            const { url, width, height, title } = videoData;
            let embedUrl = url;

            // Convert YouTube URLs
            if (url.includes("youtube.com") || url.includes("youtu.be")) {
                const videoId = url.includes("youtube.com")
                    ? url.split("v=")[1]?.split("&")[0]
                    : url.split("youtu.be/")[1];
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            }
            // Convert Vimeo URLs
            else if (url.includes("vimeo.com")) {
                const videoId = url.split("vimeo.com/")[1];
                embedUrl = `https://player.vimeo.com/video/${videoId}`;
            }

            const videoHTML = `
      <div class="video-container" style="position: relative; margin: 1rem 0; resize: both; overflow: hidden; width: ${width}px; height: ${height}px; border: 2px dashed #ccc;">
        <iframe 
          src="${embedUrl}" 
          width="100%" 
          height="100%" 
          frameborder="0" 
          allowfullscreen
          title="${title || "Video"}"
          style="display: block;">
        </iframe>
        <div class="resize-handle" style="position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; background: #666; cursor: se-resize;"></div>
      </div>
    `;

            insertHTML(videoHTML);
            setShowVideoModal(false);
        },
        [insertHTML]
    );

    // Toolbar actions
    const toolbarActions = useMemo(
        () => ({
            bold: () => execCommand("bold"),
            italic: () => execCommand("italic"),
            underline: () => execCommand("underline"),
            strikethrough: () => execCommand("strikeThrough"),
            subscript: () => execCommand("subscript"),
            superscript: () => execCommand("superscript"),
            code: () => {
                const selection = window.getSelection();
                if (!selection || selection.rangeCount === 0) return;
                const range = selection.getRangeAt(0);
                if (range.collapsed) return;

                const code = document.createElement("code");
                code.style.backgroundColor = "#f1f5f9";
                code.style.padding = "0.2rem 0.4rem";
                code.style.borderRadius = "4px";
                code.style.fontFamily = "monospace";

                try {
                    range.surroundContents(code);
                    handleInput();
                } catch (e) {
                    console.warn("Could not apply code formatting");
                }
            },
            formatBlock: (format: BlockFormat) =>
                execCommand("formatBlock", format),
            blockquote: () => execCommand("formatBlock", "blockquote"),
            bulletList: () => execCommand("insertUnorderedList"),
            numberList: () => execCommand("insertOrderedList"),
            checklist: () => {
                const listHTML = `
        <ul style="list-style: none; padding-left: 0;">
          <li style="margin: 0.5rem 0;">
            <input type="checkbox" style="margin-right: 0.5rem;"> 
            <span contenteditable="true">New task</span>
          </li>
        </ul>
      `;
                insertHTML(listHTML);
            },
            codeBlock: () => {
                const codeHTML = `
        <pre style="background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 8px; overflow-x: auto; font-family: monospace;"><code contenteditable="true">// Your code here</code></pre>
      `;
                insertHTML(codeHTML);
            },
            alignLeft: () => execCommand("justifyLeft"),
            alignCenter: () => execCommand("justifyCenter"),
            alignRight: () => execCommand("justifyRight"),
            alignJustify: () => execCommand("justifyFull"),
            indent: () => execCommand("indent"),
            outdent: () => execCommand("outdent"),
            fontSize: (size: FontSize) => {
                execCommand("fontSize", "7");
                execCommand("fontName", size);
            },

            fontFamily: (family: FontFamily) => execCommand("fontName", family),
            textColor: (color: string) => execCommand("foreColor", color),
            backgroundColor: (color: string) => execCommand("backColor", color),
            link: () => {
                const url = prompt("Enter URL:");
                if (url) execCommand("createLink", url);
            },
            image: () => {
                const url = prompt("Enter image URL:");
                if (url) {
                    const imageHTML = `
      <div class="image-container" style="position: relative; display: inline-block; margin: 1rem 0; resize: both; overflow: hidden; max-width: 100%;">
        <img src="${url}" alt="Image" style="width: 100%; height: 100%; object-fit: contain; display: block; border-radius: 8px;" 
             onload="this.parentElement.style.width = Math.min(this.naturalWidth, 600) + 'px'; this.parentElement.style.height = Math.min(this.naturalHeight, 400) + 'px';" />
        <div class="resize-handle" style="position: absolute; bottom: 0; right: 0; width: 20px; height: 20px; background: #666; cursor: se-resize; opacity: 0; transition: opacity 0.2s;"></div>
      </div>
    `;
                    insertHTML(imageHTML);
                }
            },
            table: () => setShowTableModal(true),
            video: () => setShowVideoModal(true),
            emoji: () => setShowEmojiPicker(true),
            clear: () => execCommand("removeFormat"),
            undo: () => {
                if (historyIndex > 0) {
                    const newIndex = historyIndex - 1;
                    const content = history[newIndex];
                    if (editorRef.current) {
                        editorRef.current.innerHTML = content;
                        onChange?.(content);
                        setHistoryIndex(newIndex);
                        updateStats();
                    }
                }
            },
            redo: () => {
                if (historyIndex < history.length - 1) {
                    const newIndex = historyIndex + 1;
                    const content = history[newIndex];
                    if (editorRef.current) {
                        editorRef.current.innerHTML = content;
                        onChange?.(content);
                        setHistoryIndex(newIndex);
                        updateStats();
                    }
                }
            },
            darkMode: () => {
                const newDarkMode = !isDarkMode;
                setIsDarkMode(newDarkMode);
                onDarkModeChange?.(newDarkMode);
                document.documentElement.setAttribute(
                    "data-theme",
                    newDarkMode ? "dark" : "light"
                );
            },
            fullscreen: () => {
                setIsFullscreen(!isFullscreen);
            },
        }),
        [
            execCommand,
            insertHTML,
            handleInput,
            historyIndex,
            history,
            onChange,
            updateStats,
            isDarkMode,
            onDarkModeChange,
            isFullscreen,
        ]
    );

    // Handle selection change
    useEffect(() => {
        const handleSelectionChange = () => {
            if (document.activeElement === editorRef.current) {
                updateActiveStates();
            }
        };

        document.addEventListener("selectionchange", handleSelectionChange);
        return () =>
            document.removeEventListener(
                "selectionchange",
                handleSelectionChange
            );
    }, [updateActiveStates]);

    // Handle paste
    const handlePaste = useCallback(
        (e: React.ClipboardEvent) => {
            e.preventDefault();
            const text = e.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, text);
            handleInput();
        },
        [handleInput]
    );

    // Handle key shortcuts
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case "b":
                        e.preventDefault();
                        toolbarActions.bold();
                        break;
                    case "i":
                        e.preventDefault();
                        toolbarActions.italic();
                        break;
                    case "u":
                        e.preventDefault();
                        toolbarActions.underline();
                        break;
                    case "z":
                        e.preventDefault();
                        if (e.shiftKey) {
                            toolbarActions.redo();
                        } else {
                            toolbarActions.undo();
                        }
                        break;
                    case "k":
                        e.preventDefault();
                        toolbarActions.link();
                        break;
                }
            }
        },
        [toolbarActions]
    );

    // Handle table operations
    const handleTableOperation = useCallback(
        (operation: string, element?: HTMLElement) => {
            if (!element) return;

            const table = element.closest("table");
            if (!table) return;

            const cell = element.closest("td, th");
            const row = element.closest("tr");

            switch (operation) {
                case "addRowAbove":
                    if (row) {
                        const newRow = table.insertRow(row.rowIndex);
                        const colCount = row.cells.length;
                        for (let i = 0; i < colCount; i++) {
                            const cell = newRow.insertCell();
                            cell.style.cssText =
                                "border: 1px solid var(--border-color); padding: 12px; min-width: 100px;";
                            cell.contentEditable = "true";
                            cell.innerHTML = "&nbsp;";
                        }
                    }
                    break;

                case "addRowBelow":
                case "addRow":
                    if (row) {
                        const newRow = table.insertRow(row.rowIndex + 1);
                        const colCount = row.cells.length;
                        for (let i = 0; i < colCount; i++) {
                            const cell = newRow.insertCell();
                            cell.style.cssText =
                                "border: 1px solid var(--border-color); padding: 12px; min-width: 100px;";
                            cell.contentEditable = "true";
                            cell.innerHTML = "&nbsp;";
                        }
                    } else {
                        const newRow = table.insertRow();
                        const colCount = table.rows[0]?.cells.length || 1;
                        for (let i = 0; i < colCount; i++) {
                            const cell = newRow.insertCell();
                            cell.style.cssText =
                                "border: 1px solid var(--border-color); padding: 12px; min-width: 100px;";
                            cell.contentEditable = "true";
                            cell.innerHTML = "&nbsp;";
                        }
                    }
                    break;

                case "addColumnLeft":
                    if (cell) {
                        const cellIndex = Array.from(row!.cells).indexOf(
                            cell as HTMLTableCellElement
                        );
                        Array.from(table.rows).forEach((row) => {
                            const newCell = row.insertCell(cellIndex);
                            newCell.style.cssText =
                                "border: 1px solid var(--border-color); padding: 12px; min-width: 100px;";
                            newCell.contentEditable = "true";
                            newCell.innerHTML = "&nbsp;";
                        });
                    }
                    break;

                case "addColumnRight":
                case "addColumn":
                    if (cell) {
                        const cellIndex = Array.from(row!.cells).indexOf(
                            cell as HTMLTableCellElement
                        );
                        Array.from(table.rows).forEach((row) => {
                            const newCell = row.insertCell(cellIndex + 1);
                            newCell.style.cssText =
                                "border: 1px solid var(--border-color); padding: 12px; min-width: 100px;";
                            newCell.contentEditable = "true";
                            newCell.innerHTML = "&nbsp;";
                        });
                    } else {
                        Array.from(table.rows).forEach((row) => {
                            const newCell = row.insertCell();
                            newCell.style.cssText =
                                "border: 1px solid var(--border-color); padding: 12px; min-width: 100px;";
                            newCell.contentEditable = "true";
                            newCell.innerHTML = "&nbsp;";
                        });
                    }
                    break;

                case "deleteRow":
                    if (row && table.rows.length > 1) {
                        row.remove();
                    }
                    break;

                case "deleteColumn":
                    if (cell) {
                        const cellIndex = Array.from(row!.cells).indexOf(
                            cell as HTMLTableCellElement
                        );
                        if (table.rows[0]?.cells.length > 1) {
                            Array.from(table.rows).forEach((row) => {
                                if (row.cells[cellIndex]) {
                                    row.deleteCell(cellIndex);
                                }
                            });
                        }
                    }
                    break;
            }

            handleInput();

            // Add visual feedback
            const cells = table.querySelectorAll("td, th");
            cells.forEach((cell) => {
                (cell as HTMLElement).style.transition =
                    "background-color 0.3s ease";
                (cell as HTMLElement).style.backgroundColor =
                    "var(--accent-primary)";
                setTimeout(() => {
                    (cell as HTMLElement).style.backgroundColor = "";
                }, 300);
            });
        },
        [handleInput]
    );

    // Handle context menu for tables
    const handleContextMenu = useCallback((e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const table = target.closest("table");

        if (table) {
            e.preventDefault();
            setSelectedTable(table as HTMLTableElement);
            setTableContextMenu({
                show: true,
                x: e.clientX,
                y: e.clientY,
                element: target,
            });
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            // Close dropdowns if clicking outside
            if (!target.closest(".dropdown-container")) {
                setActiveDropdown(null);
            }

            // Close table context menu if clicking outside
            if (
                !target.closest(".table-context-menu") &&
                !target.closest("table")
            ) {
                setTableContextMenu({ show: false, x: 0, y: 0, element: null });
            }

            // Close other modals
            if (
                !target.closest(".modal-content") &&
                !target.closest(".color-picker-modal") &&
                !target.closest(".emoji-picker-modal")
            ) {
                setShowColorPicker(null);
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className={`scrivly-editor ${className} ${
                isDarkMode ? "dark" : ""
            } ${isFullscreen ? "fullscreen" : ""}`}
        >
            <Toolbar
                isActive={isActive}
                currentBlock={currentBlock}
                onAction={(action, value) => {
                    if (
                        typeof toolbarActions[
                            action as keyof typeof toolbarActions
                        ] === "function"
                    ) {
                        (
                            toolbarActions[
                                action as keyof typeof toolbarActions
                            ] as Function
                        )(value);
                    }
                }}
                toolbarOptions={toolbarOptions}
                className={toolbarClassName}
                canUndo={historyIndex > 0}
                canRedo={historyIndex < history.length - 1}
                isDarkMode={isDarkMode}
                isFullscreen={isFullscreen}
                onColorPicker={(type) => setShowColorPicker(type)}
                onEmojiPicker={() => setShowEmojiPicker(true)}
                activeDropdown={activeDropdown}
                onDropdownChange={setActiveDropdown}
            />

            <div
                className="scrivly-editor-container"
                style={{
                    maxHeight: isFullscreen ? "100vh" : maxHeight,
                    minHeight,
                }}
            >
                <div
                    ref={editorRef}
                    contentEditable={!readOnly}
                    className={`scrivly-editor-content ${contentClassName}`}
                    onInput={handleInput}
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                    onContextMenu={handleContextMenu}
                    data-placeholder={placeholder}
                    spellCheck={spellCheck}
                    suppressContentEditableWarning
                />
            </div>

            {(showWordCount || showCharCount || tableContextMenu.show) && (
                <div className="scrivly-editor-footer">
                    <div className="scrivly-editor-stats">
                        {showWordCount && <span>{wordCount} words</span>}
                        {showCharCount && <span>{charCount} characters</span>}
                    </div>

                    {selectedTable && (
                        <div className="table-info">
                            <span>
                                Table selected - Right-click for options
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Enhanced Table Context Menu */}
            {tableContextMenu.show && (
                <div
                    className="table-context-menu"
                    style={{
                        position: "fixed",
                        top: tableContextMenu.y,
                        left: tableContextMenu.x,
                        zIndex: 10000,
                    }}
                >
                    <div className="context-menu-content">
                        <button
                            className="context-menu-item"
                            onClick={() => {
                                handleTableOperation(
                                    "addRowAbove",
                                    tableContextMenu.element!
                                );
                                setTableContextMenu({
                                    show: false,
                                    x: 0,
                                    y: 0,
                                    element: null,
                                });
                            }}
                        >
                            ➕ Add Row Above
                        </button>
                        <button
                            className="context-menu-item"
                            onClick={() => {
                                handleTableOperation(
                                    "addRowBelow",
                                    tableContextMenu.element!
                                );
                                setTableContextMenu({
                                    show: false,
                                    x: 0,
                                    y: 0,
                                    element: null,
                                });
                            }}
                        >
                            ➕ Add Row Below
                        </button>
                        <button
                            className="context-menu-item"
                            onClick={() => {
                                handleTableOperation(
                                    "addColumnLeft",
                                    tableContextMenu.element!
                                );
                                setTableContextMenu({
                                    show: false,
                                    x: 0,
                                    y: 0,
                                    element: null,
                                });
                            }}
                        >
                            ➕ Add Column Left
                        </button>
                        <button
                            className="context-menu-item"
                            onClick={() => {
                                handleTableOperation(
                                    "addColumnRight",
                                    tableContextMenu.element!
                                );
                                setTableContextMenu({
                                    show: false,
                                    x: 0,
                                    y: 0,
                                    element: null,
                                });
                            }}
                        >
                            ➕ Add Column Right
                        </button>
                        <div className="context-menu-divider"></div>
                        <button
                            className="context-menu-item danger"
                            onClick={() => {
                                handleTableOperation(
                                    "deleteRow",
                                    tableContextMenu.element!
                                );
                                setTableContextMenu({
                                    show: false,
                                    x: 0,
                                    y: 0,
                                    element: null,
                                });
                            }}
                        >
                            🗑️ Delete Row
                        </button>
                        <button
                            className="context-menu-item danger"
                            onClick={() => {
                                handleTableOperation(
                                    "deleteColumn",
                                    tableContextMenu.element!
                                );
                                setTableContextMenu({
                                    show: false,
                                    x: 0,
                                    y: 0,
                                    element: null,
                                });
                            }}
                        >
                            🗑️ Delete Column
                        </button>
                        <button
                            className="context-menu-item danger"
                            onClick={() => {
                                if (
                                    confirm(
                                        "Are you sure you want to delete this table?"
                                    )
                                ) {
                                    selectedTable?.remove();
                                    handleInput();
                                }
                                setTableContextMenu({
                                    show: false,
                                    x: 0,
                                    y: 0,
                                    element: null,
                                });
                            }}
                        >
                            🗑️ Delete Table
                        </button>
                    </div>
                </div>
            )}

            {showTableModal && (
                <TableModal
                    onCreateTable={createTable}
                    onClose={() => setShowTableModal(false)}
                />
            )}

            {showVideoModal && (
                <VideoModal
                    onInsertVideo={insertVideo}
                    onClose={() => setShowVideoModal(false)}
                />
            )}

            {showColorPicker && (
                <ColorPicker
                    type={showColorPicker}
                    onColorSelect={(color) => {
                        if (showColorPicker === "text") {
                            toolbarActions.textColor(color);
                        } else {
                            toolbarActions.backgroundColor(color);
                        }
                        setShowColorPicker(null);
                    }}
                    onClose={() => setShowColorPicker(null)}
                />
            )}

            {showEmojiPicker && (
                <EmojiPicker
                    onEmojiSelect={(emoji) => {
                        insertHTML(emoji);
                        setShowEmojiPicker(false);
                    }}
                    onClose={() => setShowEmojiPicker(false)}
                />
            )}
        </div>
    );
};

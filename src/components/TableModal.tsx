"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import type { TableData } from "../types/editor"

interface TableModalProps {
  onCreateTable: (tableData: TableData) => void
  onClose: () => void
}

export const TableModal: React.FC<TableModalProps> = ({ onCreateTable, onClose }) => {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)
  const [data, setData] = useState<string[][]>([])

  const handleCreate = () => {
    const tableData: TableData = { rows, cols, data }
    onCreateTable(tableData)
  }

  const previewGrid = Array.from({ length: rows }, (_, i) => Array.from({ length: cols }, (_, j) => `${i}-${j}`))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Insert Table</h3>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Rows: {rows}</label>
            <input type="range" min="1" max="10" value={rows} onChange={(e) => setRows(Number(e.target.value))} />
          </div>

          <div className="form-group">
            <label>Columns: {cols}</label>
            <input type="range" min="1" max="10" value={cols} onChange={(e) => setCols(Number(e.target.value))} />
          </div>

          <div className="table-preview">
            <div
              className="preview-grid"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: "2px",
                border: "1px solid #ccc",
                padding: "4px",
              }}
            >
              {previewGrid.map((row) =>
                row.map((cell) => (
                  <div
                    key={cell}
                    className="preview-cell"
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      minHeight: "30px",
                      backgroundColor: "#f9f9f9",
                    }}
                  />
                )),
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="button secondary">
            Cancel
          </button>
          <button onClick={handleCreate} className="button primary">
            Create Table
          </button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Plus, Table, Trash2 } from "lucide-react"
import type React from "react"

interface TableContextMenuProps {
  show: boolean
  x: number
  y: number
  onAction: (action: string) => void
  onClose: () => void
}

export const TableContextMenu: React.FC<TableContextMenuProps> = ({ show, x, y, onAction, onClose }) => {
  if (!show) return null

  const menuItems = [
    { action: "addRowAbove", label: "Add Row Above", icon: Plus, color: "success" },
    { action: "addRowBelow", label: "Add Row Below", icon: Plus, color: "success" },
    { action: "addColumnLeft", label: "Add Column Left", icon: Plus, color: "success" },
    { action: "addColumnRight", label: "Add Column Right", icon: Plus, color: "success" },
    { action: "divider", label: "", icon: null, color: "" },
    { action: "deleteRow", label: "Delete Row", icon: Trash2, color: "danger" },
    { action: "deleteColumn", label: "Delete Column", icon: Trash2, color: "danger" },
    { action: "deleteTable", label: "Delete Table", icon: Table, color: "danger" },
  ]

  return (
    <div
      className="table-context-menu"
      style={{
        position: "fixed",
        top: y,
        left: x,
        zIndex: 10000,
      }}
    >
      <div className="context-menu-content">
        {menuItems.map((item, index) => {
          if (item.action === "divider") {
            return <div key={index} className="context-menu-divider" />
          }

          const Icon = item.icon!
          return (
            <button
              key={item.action}
              className={`context-menu-item ${item.color}`}
              onClick={() => {
                onAction(item.action)
                onClose()
              }}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

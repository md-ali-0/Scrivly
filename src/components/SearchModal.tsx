"use client";

import React, { useState } from "react";
import { XIcon } from "./icons";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchTerm: string, replaceTerm?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [replaceTerm, setReplaceTerm] = useState("");
  const [isReplaceMode, setIsReplaceMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, isReplaceMode ? replaceTerm : undefined);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="search-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-modal-header">
          <h3>{isReplaceMode ? "Find and Replace" : "Find"}</h3>
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Close"
          >
            <XIcon size={20} />
          </button>
        </div>
        
        <form className="search-modal-body" onSubmit={handleSubmit}>
          <div className="search-form">
            <div className="search-group">
              <label htmlFor="search-term">Find</label>
              <input
                id="search-term"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter text to find..."
                autoFocus
              />
            </div>
            
            {isReplaceMode && (
              <div className="search-group">
                <label htmlFor="replace-term">Replace with</label>
                <input
                  id="replace-term"
                  type="text"
                  value={replaceTerm}
                  onChange={(e) => setReplaceTerm(e.target.value)}
                  placeholder="Enter replacement text..."
                />
              </div>
            )}
          </div>
          
          <div className="search-modal-footer">
            <button
              type="button"
              className="button secondary"
              onClick={() => setIsReplaceMode(!isReplaceMode)}
            >
              {isReplaceMode ? "Find Only" : "Replace Mode"}
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => {
                setSearchTerm("");
                setReplaceTerm("");
              }}
            >
              Clear
            </button>
            <button type="submit" className="button primary">
              {isReplaceMode ? "Replace All" : "Find"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
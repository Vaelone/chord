import React, { useState, useRef, useEffect } from 'react';
import './CheckboxDropdown.css';

const CheckboxDropdown = ({ 
  label, 
  options, 
  selectedValues, 
  onChange, 
  allOptionLabel = "All" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (value) => {
    // If clicking "All", toggle all options
    if (value === allOptionLabel) {
      if (selectedValues.length === options.length) {
        // If all selected, deselect all
        onChange([]);
      } else {
        // Select all
        onChange([...options]);
      }
      return;
    }

    // Regular option toggle
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const allSelected = selectedValues.length === options.length;
  const displayText = allSelected 
    ? allOptionLabel 
    : selectedValues.length === 0 
      ? 'None' 
      : selectedValues.length === 1
        ? selectedValues[0]
        : `${selectedValues.length} selected`;

  return (
    <div className="checkbox-dropdown" ref={dropdownRef}>
      <button 
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>{label}: {displayText}</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {/* "All" option */}
          <label className="dropdown-item all-option">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => handleToggle(allOptionLabel)}
            />
            <span>{allOptionLabel}</span>
          </label>
          
          <div className="dropdown-divider"></div>

          {/* Individual options */}
          {options.map(option => (
            <label key={option} className="dropdown-item">
              <input
                type="checkbox"
                checked={selectedValues.includes(option)}
                onChange={() => handleToggle(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;
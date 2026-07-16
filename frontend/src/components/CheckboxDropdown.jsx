import React, { useState, useRef, useEffect } from 'react';
import './CheckboxDropdown.css';

const ChevronIcon = ({ open }) => (
  <svg
    className={`dropdown-chevron ${open ? 'open' : ''}`}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg className="dropdown-check-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 12l5 5L19 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckboxDropdown = ({
  label,
  options,
  selectedValues,
  onChange,
  allOptionLabel = 'All',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    if (value === allOptionLabel) {
      if (selectedValues.length === options.length) {
        onChange([]);
      } else {
        onChange([...options]);
      }
      return;
    }

    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const allSelected = selectedValues.length === options.length;
  const isFiltered = selectedValues.length > 0 && !allSelected;
  const orderedSelected = options.filter((option) => selectedValues.includes(option));
  const displayText = allSelected
    ? allOptionLabel
    : selectedValues.length === 0
      ? 'None'
      : orderedSelected.join(', ');

  const renderOption = (option, checked, isAllOption = false) => (
    <label
      key={option}
      className={`dropdown-item ${isAllOption ? 'all-option' : ''} ${checked ? 'is-checked' : ''}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleToggle(option)}
      />
      <span className="dropdown-check" aria-hidden="true">
        {checked ? <CheckIcon /> : null}
      </span>
      <span className="dropdown-item-label">{option}</span>
    </label>
  );

  return (
    <div
      className={`checkbox-dropdown ${isOpen ? 'is-open' : ''} ${isFiltered ? 'is-filtered' : ''}`}
      ref={dropdownRef}
    >
      <button
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="dropdown-toggle-text">
          <span className="dropdown-toggle-label">{label}</span>
          <span className="dropdown-toggle-value">{displayText}</span>
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      {isOpen && (
        <div className="dropdown-menu" role="listbox">
          {renderOption(allOptionLabel, allSelected, true)}
          <div className="dropdown-divider" />
          {options.map((option) =>
            renderOption(option, selectedValues.includes(option))
          )}
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;

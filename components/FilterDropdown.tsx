
import React from 'react';

interface FilterDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  defaultOptionLabel?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  defaultOptionLabel = `All ${label}s`,
}) => {
  return (
    <div>
      <label htmlFor={label.toLowerCase().replace(' ', '-')} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <select
        id={label.toLowerCase().replace(' ', '-')}
        value={selectedValue}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full px-4 py-3 border border-slate-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
      >
        <option value="">{defaultOptionLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;

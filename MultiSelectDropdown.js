import React, { useState } from 'react';

function MultiSelectDropdown({ response }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' },
  ];

  const handleSelect = (option) => {
    const isSelected = selectedOptions.includes(option.value);
    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option.value));
    } else {
      setSelectedOptions([...selectedOptions, option.value]);
    }
  };

  const filteredResponse = response.filter((item) => {
    if (selectedOptions.includes('Alphabets') && item.type === 'alphabet') return true;
    if (selectedOptions.includes('Numbers') && item.type === 'number') return true;
    if (selectedOptions.includes('Highest lowercase alphabet') && item.type === 'alphabet' && item.value === item.value.toLowerCase()) return true;
    return false;
  });

  return (
    <div>
      <select multiple value={selectedOptions} onChange={(event) => handleSelect(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ul>
        {filteredResponse.map((item) => (
          <li key={item.value}>{item.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default MultiSelectDropdown;
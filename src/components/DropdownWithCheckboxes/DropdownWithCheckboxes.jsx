import { useState } from 'react'; 
import './DropdownWithCheckboxes.css'
import { PiCaretDownBold } from "react-icons/pi";

const DropdownWithCheckboxes = ({ id, title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown">
      <button onClick={handleToggle} className="dropdown-btn">
        {selectedOptions.length > 0
          ? selectedOptions.join(', ')
          : title}
        <i><PiCaretDownBold /></i>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <label key={option} className="dropdown-item">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownWithCheckboxes;

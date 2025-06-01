import { useState } from 'react';
import './PriceFilter.css'

const PriceFilter = ({ onFilterChange }) => {
  const [price, setPrice] = useState(50); // Default price value

  const handleChange = (e) => {
    const newPrice = Number(e.target.value);
    setPrice(newPrice);
    onFilterChange(newPrice);
  };

  return (
    <div className="price-filter">
      <label>Price: ${price}</label>
      <input
        type="range"
        min="12"
        max="100"
        value={price}
        onChange={handleChange}
        className="price-slider"
      />
    </div>
  );
};

export default PriceFilter;

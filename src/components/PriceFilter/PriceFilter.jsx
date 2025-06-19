// import { useState } from 'react';
// import './PriceFilter.css'

// const PriceFilter = ({ onFilterChange }) => {
//   const [price, setPrice] = useState(50); // Default price value

//   const handleChange = (e) => {
//     const newPrice = Number(e.target.value);
//     setPrice(newPrice);
//     onFilterChange(newPrice);
//   };

//   return (
//     <div className="price-filter">
//       <label>Price: ${price}</label>
//       <input
//         type="range"
//         min="12"
//         max="100"
//         value={price}
//         onChange={handleChange}
//         className="price-slider"
//       />
//     </div>
//   );
// };

// export default PriceFilter;


// import React, { useState } from 'react';
// import { Range } from 'react-range';
// import './PriceFilter.css';

// const MIN = 12;
// const MAX = 60;

// const PriceFilter = ({ onFilterChange }) => {
//   const [values, setValues] = useState([12, 59]);

//   const handleChange = (newValues) => {
//     setValues(newValues);
//     onFilterChange(newValues);
//   };

//   return (
//     <div className="price-filter">
//       <div className="price-bubble">
//         ${values[0]} – ${values[1]}
//       </div>
//       <Range
//         step={1}
//         min={MIN}
//         max={MAX}
//         values={values}
//         onChange={handleChange}
//         renderTrack={({ props, children }) => (
//           <div
//             {...props}
//             className="slider-track"
//             style={{
//               ...props.style,
//             }}
//           >
//             {children}
//           </div>
//         )}
//         renderThumb={({ props }) => (
//           <div {...props} className="slider-thumb" />
//         )}
//       />
//     </div>
//   );
// };

// export default PriceFilter;



// import React, { useState } from 'react';
// import { Range, getTrackBackground } from 'react-range';
// import './PriceFilter.css';

// const MIN = 12;
// const MAX = 100;

// const PriceFilter = ({ onFilterChange }) => {
//   const [values, setValues] = useState([12, 59]);

//   const handleChange = (newValues) => {
//     setValues(newValues);
//     onFilterChange(newValues);
//   };

//   return (
//     <div className="price-filter">
//       <div className="price-bubble">
//         ${values[0]} – ${values[1]}
//       </div>
//       <Range
//         step={1}
//         min={MIN}
//         max={MAX}
//         values={values}
//         onChange={handleChange}
//         renderTrack={({ props, children }) => (
//           <div
//             {...props}
//             className="slider-track"
//             style={{
//               background: getTrackBackground({
//                 values,
//                 colors: ['#ccc', '#4CAF50', '#ccc'],
//                 min: MIN,
//                 max: MAX,
//               }),
//               height: '6px',
//               width: '300px',
//               borderRadius: '4px',
//               display: 'flex',
//               alignItems: 'center',
//             }}
//           >
//             {children}
//           </div>
//         )}
//         renderThumb={({ props }) => (
//           <div
//             {...props}
//             className="slider-thumb"
//             style={{
//               ...props.style,
//             }}
//           />
//         )}
//       />
//     </div>
//   );
// };

// export default PriceFilter;



// Example PriceFilter.jsx
import React, { useState } from 'react';
// import './PriceFilter.css'; // Your CSS for PriceFilter

const PriceFilter = ({ onFilterChange, currentRate = 0 }) => {
  const [rateValue, setRateValue] = useState(currentRate);

  const handleChange = (e) => {
    const newRate = parseInt(e.target.value, 10);
    setRateValue(newRate);
    if (onFilterChange) {
      onFilterChange(newRate); // Pass the new rate back to the parent
    }
  };

  return (
    <div className="priceFilter">
      <input
        type="range"
        min="0"
        max="5" // Assuming rating from 0 to 5
        step="0.5" // Allows for half-star ratings
        value={rateValue}
        onChange={handleChange}
      />
      <p>Min. Rating: {rateValue.toFixed(1)}</p>
    </div>
  );
};

export default PriceFilter;
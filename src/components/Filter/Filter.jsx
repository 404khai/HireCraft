// import React, {useState} from 'react'
// import './Filter.css'
// import { IoFilter } from "react-icons/io5";
// import DropdownWithCheckboxes from '../DropdownWithCheckboxes/DropdownWithCheckboxes';
// import PriceFilter from '../PriceFilter/PriceFilter';

// const Filter = () => {
//   const categoryOptions = ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'];
//   const statusOptions = ['Idle', 'Loading', 'Loaded', 'Delivering', 'Delivered', 'Returning',];

//   const [filteredPrice, setFilteredPrice] = useState(100);

//   const handleFilterChange = (price) => {
//     setFilteredPrice(price);
//     console.log(`Filtered price: $${price}`);
//   };

//   return (
//     <div className='filterSideNav'>

//       <div className="filterDiv">
//         <label htmlFor="">Name</label>
//         <input type="text" placeholder='Search by name...' className='filterSearch'/>
//       </div>

//       <div className="filterDiv">
//         <label htmlFor="">Filter by Occupation</label>
//         <input type="text" placeholder='Search by occupation...' className='filterSearch'/>
//       </div>

//       <div className="filterDiv">
//         <label htmlFor="">Filter by Skills</label>
//         <input type="text" placeholder='Search for a skill...' className='filterSearch'/>
//       </div>
      
//       <div className="filterDiv">
//         <label htmlFor="">Region</label>
//         <input type="text" placeholder='e.g Chicago, California...' className='filterSearch'/>
//       </div>
       
//       <div className='priceFilterBox'>
//         <label htmlFor="">Filter by Rates</label>
//         <PriceFilter onFilterChange={handleFilterChange} />
//       </div>
//     </div>
//   )
// }

// export default Filter


// import React, { useState } from 'react';
// import './Filter.css'
// import PriceFilter from '../PriceFilter/PriceFilter';

// const Filter = ({ onFilter }) => {
//   const [name, setName] = useState('');
//   const [occupation, setOccupation] = useState('');
//   const [skills, setSkills] = useState('');
//   const [region, setRegion] = useState('');
//   const [rate, setRate] = useState(100);

//   const handleFilter = () => {
//     onFilter({ name, occupation, skills, region, rate });
//   };

//   return (
//     <div className='filterSideNav'>
//       <div className="filterDiv">
//         <label htmlFor="">Name</label>
//         <input type="text" placeholder='Search by name...' className='filterSearch'/>
//       </div>

//       <div className="filterDiv">
//         <label htmlFor="">Filter by Occupation</label>
//         <input type="text" placeholder='Search by occupation...' className='filterSearch'/>
//       </div>

//       <div className="filterDiv">
//         <label htmlFor="">Filter by Skills</label>
//         <input type="text" placeholder='Search for a skill...' className='filterSearch'/>
//       </div>
      
//       <div className="filterDiv">
//         <label htmlFor="">Region</label>
//         <input type="text" placeholder='e.g Chicago, California...' className='filterSearch'/>
//       </div>
       
//       <div className='priceFilterBox'>
//         <label htmlFor="">Filter by Rates</label>
//         {/* <PriceFilter onFilterChange={handleFilterChange} /> */}
//         <PriceFilter/>
//       </div>
//       <button onClick={handleFilter}>Apply Filters</button>
//     </div>
//   );
// };

// export default Filter;


import React, { useState } from 'react';
import './Filter.css'; // Ensure your CSS file is correctly linked
import PriceFilter from '../PriceFilter/PriceFilter'; // Assuming PriceFilter is designed to pass back a value

const Filter = ({ onFilter }) => {
  // State for each filter criterion
  const [occupation, setOccupation] = useState('');
  const [skills, setSkills] = useState(''); // Comma-separated string for now
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  // Renamed for clarity if PriceFilter truly controls min rating
  const [minRating, setMinRating] = useState(0);

  // Handler for PriceFilter to update the minRating
  const handleMinRatingChange = (newRating) => {
    // Assuming newRating directly corresponds to minRating
    setMinRating(newRating);
  };

  // Function to gather all filter states and call the onFilter prop
  const handleApplyFilters = () => {
    const filtersToApply = {
      occupation: occupation.trim() || undefined, // Use undefined to omit empty strings
      skills: skills.trim() || undefined,
      city: city.trim() || undefined,
      state: state.trim() || undefined,
      country: country.trim() || undefined,
      minRating: minRating > 0 ? minRating : undefined, // Only send if greater than 0
    };

    // Call the onFilter prop with the collected filters
    // The parent component (BrowseFreelancers) will then fetch data
    onFilter(filtersToApply);
  };

  return (
    <div className='filterSideNav'>
      {/* Search by Occupation */}
      <div className="filterDiv">
        <label htmlFor="occupation">Occupation</label>
        <input
          type="text"
          id="occupation"
          placeholder='e.g., "Software Engineer"'
          className='filterSearch'
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />
      </div>

      {/* Search by Skills */}
      <div className="filterDiv">
        <label htmlFor="skills">Skills (comma-separated)</label>
        <input
          type="text"
          id="skills"
          placeholder='e.g., "Java, React, SQL"'
          className='filterSearch'
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      {/* Filter by Location - City */}
      <div className="filterDiv">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          placeholder='e.g., "Port Harcourt"'
          className='filterSearch'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* Filter by Location - State */}
      <div className="filterDiv">
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          placeholder='e.g., "Rivers"'
          className='filterSearch'
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>

      {/* Filter by Location - Country */}
      <div className="filterDiv">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          placeholder='e.g., "Nigeria"'
          className='filterSearch'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      {/* Filter by Minimum Rating */}
      <div className='priceFilterBox'>
        <label htmlFor="minRating">Minimum Rating</label>
        {/* Pass handleMinRatingChange to PriceFilter to capture the value */}
        <PriceFilter onFilterChange={handleMinRatingChange} currentRate={minRating} />
      </div>

      <button className="applyFiltersBtn" onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filter;

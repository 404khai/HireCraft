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


import React, { useState } from 'react';

const Filter = ({ onFilter }) => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [skills, setSkills] = useState('');
  const [region, setRegion] = useState('');
  const [rate, setRate] = useState(100);

  const handleFilter = () => {
    onFilter({ name, occupation, skills, region, rate });
  };

  return (
    <div className='filterSideNav'>
      <div className="filterDiv">
        <label htmlFor="">Name</label>
        <input type="text" placeholder='Search by name...' className='filterSearch'/>
      </div>

      <div className="filterDiv">
        <label htmlFor="">Filter by Occupation</label>
        <input type="text" placeholder='Search by occupation...' className='filterSearch'/>
      </div>

      <div className="filterDiv">
        <label htmlFor="">Filter by Skills</label>
        <input type="text" placeholder='Search for a skill...' className='filterSearch'/>
      </div>
      
      <div className="filterDiv">
        <label htmlFor="">Region</label>
        <input type="text" placeholder='e.g Chicago, California...' className='filterSearch'/>
      </div>
       
      <div className='priceFilterBox'>
        <label htmlFor="">Filter by Rates</label>
        <PriceFilter onFilterChange={handleFilterChange} />
      </div>
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default Filter;
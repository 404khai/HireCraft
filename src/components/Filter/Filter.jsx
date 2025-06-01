import React, {useState} from 'react'
import './Filter.css'
import { IoFilter } from "react-icons/io5";
import DropdownWithCheckboxes from '../DropdownWithCheckboxes/DropdownWithCheckboxes';
import PriceFilter from '../PriceFilter/PriceFilter';

const Filter = () => {
  const categoryOptions = ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'];
  const statusOptions = ['Idle', 'Loading', 'Loaded', 'Delivering', 'Delivered', 'Returning',];

  const [filteredPrice, setFilteredPrice] = useState(100);

  const handleFilterChange = (price) => {
    setFilteredPrice(price);
    console.log(`Filtered price: $${price}`);
  };

  return (
    <div className='filterSideNav'>

      <div className="filterDiv">
        <label htmlFor="">Name</label>
        <input type="text" placeholder='Search by name...' className='filterSearch'/>
      </div>

      <div className="filterDiv">
        <label htmlFor="">Filter by Category</label>
        <DropdownWithCheckboxes 
          id="category"
          title="Filter by Category"
          options={categoryOptions}
        />
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
                <PriceFilter onFilterChange={handleFilterChange} />
                <p>Selected Price: ${filteredPrice}</p>
            </div>
    </div>
  )
}

export default Filter
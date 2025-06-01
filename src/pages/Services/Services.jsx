import React from 'react'
import './Services.css'
import Filter from '../../components/Filter/Filter'

const Services = () => {
  const images = import.meta.glob('../../assets/*', { eager: true });

  const getImage = (filename) => {
    const entry = Object.entries(images).find(([key]) => key.includes(filename));
    return entry ? entry[1].default : '';
  };

  return (
    <div className='services'>
      <div className="servicesBanner">
        <h2>Browse Freelancers</h2>
      </div>
      {/* <h1>Browse through our services, discover exceptional talents</h1> */}
      <div className="servicesShowcase">
        <div className="freelancerFilter">
          <Filter></Filter>
        </div>
        
        <div className="freelancers">

        </div>
      </div>
    </div>
  )
}

export default Services
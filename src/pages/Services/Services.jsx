import React from 'react'
import './Services.css'
import popularServices from '../../json/popularServices.json'

const Services = () => {
  const images = import.meta.glob('../../assets/*', { eager: true });

  const getImage = (filename) => {
    const entry = Object.entries(images).find(([key]) => key.includes(filename));
    return entry ? entry[1].default : '';
  };

  return (
    <div className='services'>
      {/* <div className="servicesBanner">
        <p>Browse through our services</p>
        <p>Discover exceptional talents</p>
      </div> */}
      <h1>Browse through our services, discover exceptional talents</h1>
      <div className="servicesShowcase">
        {popularServices.map((popularService, key) => (
          <div className="servicesBox" key={key}>
            <p>{popularService.name}</p>
            <img src={getImage(popularService.image)} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
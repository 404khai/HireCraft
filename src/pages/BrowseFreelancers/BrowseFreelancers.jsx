// import React from 'react'
// import './BrowseFreelancers.css'
// import Filter from '../../components/Filter/Filter'
// import FreelancerProfile from '../../components/FreelancerProfile/FreelancerProfile'

// const BrowseFreelancers = () => {
//   const images = import.meta.glob('../../assets/*', { eager: true });

//   const getImage = (filename) => {
//     const entry = Object.entries(images).find(([key]) => key.includes(filename));
//     return entry ? entry[1].default : '';
//   };

//   return (
//     <div className='services'>
//       <div className="servicesBanner">
//         <h2>Browse Freelancers</h2>
//       </div>
//       {/* <h1>Browse through our services, discover exceptional talents</h1> */}
//       <div className="servicesShowcase">
//         <div className="freelancerFilter">
//           <Filter></Filter>
//         </div>
        
//         <div className="freelancers">
//           <FreelancerProfile></FreelancerProfile>
//           <FreelancerProfile></FreelancerProfile>
//           <FreelancerProfile></FreelancerProfile>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BrowseFreelancers

import React, { useState, useEffect } from 'react';
import Filter from '../../components/Filter/Filter'
import FreelancerProfile from '../../components/FreelancerProfile/FreelancerProfile';
import './BrowseFreelancers.css'

const BrowseFreelancers = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`/api/providers?${params}`);
      const data = await response.json();
      setProviders(data);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  const handleFilterChange = (filters) => {
    fetchProviders(filters);
  };

    fetchProviders();
  }, []);

  return (
    <div className='services'>
      <div className="servicesBanner">
        <h2>Browse Freelancers</h2>
      </div>
      <div className="servicesShowcase">
        <div className="freelancerFilter">
          {/* <Filter onFilter={handleFilterChange}/> */}
          <Filter/>
        </div>
        <div className="freelancers">
          {providers.map(provider => (
            <FreelancerProfile key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseFreelancers;
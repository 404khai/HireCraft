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




// import React, { useState, useEffect } from 'react';
// import Filter from '../../components/Filter/Filter'
// import FreelancerProfile from '../../components/FreelancerProfile/FreelancerProfile';
// import './BrowseFreelancers.css'

// const BrowseFreelancers = () => {
//   const [providers, setProviders] = useState([]);

//   useEffect(() => {
//     const fetchProviders = async (filters = {}) => {
//     try {
//       const params = new URLSearchParams(filters);
//       const response = await fetch(`/api/providers?${params}`);
//       const data = await response.json();
//       setProviders(data);
//     } catch (error) {
//       console.error('Error fetching providers:', error);
//     }
//   };

//   const handleFilterChange = (filters) => {
//     fetchProviders(filters);
//   };

//     fetchProviders();
//   }, []);

//   return (
//     <div className='services'>
//       <div className="servicesBanner">
//         <h2>Browse Providers</h2>
//       </div>
//       <div className="servicesShowcase">
//         <div className="freelancerFilter">
//           {/* <Filter onFilter={handleFilterChange}/> */}
//           <Filter/>
//         </div>
//         <div className="freelancers">
//           {providers.map(provider => (
//             <FreelancerProfile key={provider.id} provider={provider} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrowseFreelancers;


import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import Filter from '../../components/Filter/Filter';
import FreelancerProfile from '../../components/FreelancerProfile/FreelancerProfile';
import './BrowseFreelancers.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:9090/api/v1/users';

const BrowseFreelancers = () => {
  const { token } = useContext(AuthContext); // <--- Get the token from AuthContext

  const [providers, setProviders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProviders = async (currentFilters = filters, page = currentPage) => {
    setIsLoading(true);
    setError(null);

    // Check if token exists before making the request
    if (!token) {
      setError('Authentication required to view providers.');
      setIsLoading(false);
      console.warn('Attempted to fetch providers without a token.');
      return; // Stop the function if no token is present
    }

    try {
      const params = new URLSearchParams();

      if (currentFilters.occupation) params.append('occupation', currentFilters.occupation);
      if (currentFilters.skills) {
        currentFilters.skills.split(',').forEach(skill => {
          if (skill.trim()) params.append('skills', skill.trim());
        });
      }
      if (currentFilters.city) params.append('city', currentFilters.city);
      if (currentFilters.state) params.append('state', currentFilters.state);
      if (currentFilters.country) params.append('country', currentFilters.country);
      if (currentFilters.minRating && currentFilters.minRating > 0) {
        params.append('minRating', currentFilters.minRating);
      }

      params.append('page', page);
      params.append('size', 10);
      params.append('sort', 'createdAt,desc');

      const response = await fetch(`${API_BASE_URL}/providers?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Assuming JSON body if you were sending one, good practice
          'Authorization': `Bearer ${token}` // <--- INCLUDE THE TOKEN HERE!
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        // If the error indicates authentication failure, provide a specific message
        if (response.status === 401 || response.status === 403) {
            throw new Error('You are not authorized to view this resource. Please log in.');
        }
        throw new Error(errorData.message || `Failed to fetch providers. Status: ${response.status}`);
      }

      const data = await response.json();
      setProviders(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.number);

    } catch (err) {
      console.error('Error fetching providers:', err.message);
      setError(err.message || 'Failed to load providers. Please try again later.'); // Show specific error message
      setProviders([]);
      setTotalPages(0);
      setCurrentPage(0);
    } finally {
      setIsLoading(false);
    }
  };

  // The initial fetch should now depend on 'token' to ensure it's available
  // when the component first tries to load data.
  useEffect(() => {
    if (token) { // Only fetch if a token is available
      fetchProviders(filters, currentPage);
    } else {
        // If no token on initial mount, set an error
        setError('Please log in to view service providers.');
    }
  }, [token]); // Add token to dependency array

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(0);
    fetchProviders(newFilters, 0);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
      fetchProviders(filters, pageNumber);
    }
  };

  return (
    <div className='services'>
      <div className="servicesBanner">
        <h2>Browse Providers</h2>
      </div>
      <div className="servicesShowcase">
        <div className="freelancerFilter">
          <Filter onFilter={handleFilterChange} />
        </div>

        <div className="freelancers">
          {/* Display loading message */}
          {isLoading && <p>Loading service providers...</p>}

          {/* Display error message */}
          {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

          {/* Display providers or "no results" message */}
          {!isLoading && !error && (
            providers.length > 0 ? (
              providers.map(provider => (
                <FreelancerProfile key={provider.id} provider={provider} />
              ))
            ) : (
              <p>No service providers found matching your criteria.</p>
            )
          )}

          {/* Pagination controls */}
          {!isLoading && !error && totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                <FaChevronLeft /> Previous
              </button>
              <span>Page {currentPage + 1} of {totalPages}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              >
                Next <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseFreelancers;

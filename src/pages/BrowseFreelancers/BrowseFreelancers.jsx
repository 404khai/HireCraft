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


import React, { useState, useEffect } from 'react';
import Filter from '../../components/Filter/Filter';
import FreelancerProfile from '../../components/FreelancerProfile/FreelancerProfile';
import './BrowseFreelancers.css'; // Ensure your CSS file is correctly linked
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // For pagination arrows

const API_BASE_URL = 'http://localhost:9090/api/v1/users'; // Centralized API URL

const BrowseFreelancers = () => {
  const [providers, setProviders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Spring Data JPA pages are 0-indexed
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({}); // State to hold current filters
  const [isLoading, setIsLoading] = useState(false); // New: Loading state
  const [error, setError] = useState(null); // New: Error state

  // Function to fetch providers from the API
  const fetchProviders = async (currentFilters = filters, page = currentPage) => {
    setIsLoading(true); // Set loading to true before fetching
    setError(null); // Clear any previous errors

    try {
      const params = new URLSearchParams();

      // Add filters to URLSearchParams
      if (currentFilters.occupation) params.append('occupation', currentFilters.occupation);
      if (currentFilters.skills) {
        // Assuming skills are comma-separated from the input
        currentFilters.skills.split(',').forEach(skill => {
          if (skill.trim()) params.append('skills', skill.trim());
        });
      }
      if (currentFilters.city) params.append('city', currentFilters.city);
      if (currentFilters.state) params.append('state', currentFilters.state);
      if (currentFilters.country) params.append('country', currentFilters.country);
      // Ensure minRating is only sent if greater than 0
      if (currentFilters.minRating && currentFilters.minRating > 0) {
        params.append('minRating', currentFilters.minRating);
      }

      // Add pagination parameters
      params.append('page', page);
      params.append('size', 10); // You can adjust the page size as needed
      params.append('sort', 'createdAt,desc'); // Default sort order

      const response = await fetch(`${API_BASE_URL}/providers?${params.toString()}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch providers. Status: ${response.status}`);
      }

      const data = await response.json();
      setProviders(data.content); // Assuming the API returns a Page object with 'content'
      setTotalPages(data.totalPages);
      setCurrentPage(data.number); // Update currentPage with the actual page number from response

    } catch (err) {
      console.error('Error fetching providers:', err.message);
      setError('Failed to load providers. Please try again later.'); // User-friendly error message
      setProviders([]); // Clear providers on error
      setTotalPages(0);
      setCurrentPage(0);
    } finally {
      setIsLoading(false); // Always set loading to false after fetch attempt
    }
  };

  // Initial fetch when component mounts or filters/page change
  // The 'filters' and 'currentPage' dependencies are crucial for re-fetching
  // when these values are explicitly updated by the filter or pagination handlers.
  // The initial useEffect below runs once on mount.
  useEffect(() => {
    fetchProviders(filters, currentPage);
  }, []); // Empty dependency array means this runs once on mount for the initial load

  // Handle filter changes from the Filter component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // Update the filters state
    setCurrentPage(0); // Reset to first page when filters change
    fetchProviders(newFilters, 0); // Fetch with new filters, starting from page 0
  };

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber); // This update will trigger a re-render
      fetchProviders(filters, pageNumber); // Fetch with current filters, new page number
    }
  };

  return (
    <div className='services'>
      <div className="servicesBanner">
        <h2>Browse Providers</h2>
      </div>
      <div className="servicesShowcase">
        <div className="freelancerFilter">
          {/* Pass the handleFilterChange function to the Filter component */}
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
                // Pass the entire provider object to FreelancerProfile
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

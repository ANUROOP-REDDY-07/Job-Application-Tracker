import { useState, useEffect } from 'react';
import axios from 'axios';

function Jobsearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    fetchJobListings();
  }, []);

  const fetchJobListings = async (search = '') => {
    try {
      const response = await axios.get(`http://localhost:5002/api/job-listings?search=${search}`);
      setJobListings(response.data);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobListings(searchTerm);
  };

  return (
    <div className='h-screen'>
      <h2 className="text-teal-dark text-3xl font-semibold mb-6">Job Search</h2>

      <form onSubmit={handleSearch} className="max-w-md mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pl-3">
            <svg
              className="w-4 h-4 text-gray"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-[#888] border border-gray-light rounded-md bg-white focus:border-teal outline-none"
            placeholder="Search job roles and companies"
            required
          />
          <button type="submit" className="absolute right-2 top-2 bg-teal text-white px-3 py-1 rounded">Search</button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobListings.map((job) => (
          <div key={job.id} className="bg-white border border-gray-light rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-teal mb-2">{job.title}</h3>
            <p className="text-gray-600 mb-1">{job.company}</p>
            <p className="text-sm text-gray-500 mb-1">{job.location}</p>
            <p className="text-sm text-green-600 font-medium mb-2">{job.salary}</p>
            <p className="text-xs text-gray-400 mb-2">{job.type}</p>
            <p className="text-sm text-gray-700 line-clamp-3">{job.description}</p>
            <p className="text-xs text-gray-400 mt-2">Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobsearch;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { LuSearch, LuFilter } from "react-icons/lu";

function Jobsearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [companyTerm, setCompanyTerm] = useState('');
  const [skillsTerm, setSkillsTerm] = useState('');

  const [jobListings, setJobListings] = useState([]);
  const [isSmartLoading, setIsSmartLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobListings();
  }, []);

  const fetchJobListings = async () => {
    try {
      const query = new URLSearchParams({
        search: searchTerm,
        location: locationTerm,
        company: companyTerm,
        skills: skillsTerm
      }).toString();
      
      const response = await axios.get(`http://localhost:5002/api/job-listings?${query}`);
      setJobListings(response.data);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobListings();
  };

  const fetchRecommendations = async () => {
    setIsSmartLoading(true);
    try {
      const response = await axios.post('http://localhost:5002/api/ai/recommend', {
        profileInfo: "A software engineer looking for dynamic development roles."
      });
      setJobListings(response.data);
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
      alert('Failed to load recommendations.');
    } finally {
      setIsSmartLoading(false);
    }
  };

  return (
    <div className='min-h-screen pb-12'>
      <h2 className="text-3xl font-semibold mb-6">Job Search</h2>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative group">
              <div className="absolute inset-y-0 start-0 flex items-center pl-4">
                <LuSearch className="w-5 h-5 text-gray group-focus-within:text-brand transition-colors" />
              </div>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full p-4 pl-12 text-sm text-primary-text border border-white/40 rounded-full bg-surface-glass backdrop-blur-md shadow-sm outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                placeholder="Search job roles..."
              />
              <button type="submit" className="absolute right-2 top-2 bg-gradient-to-r from-brand to-brand-dark text-white shadow-md px-5 py-2 rounded-full font-medium hover:scale-[1.02] transition-transform">Search</button>
            </div>
          </form>

          <button 
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-5 py-4 rounded-full font-semibold text-sm border shadow-sm transition-all duration-300 flex justify-center items-center gap-2 ${showFilters ? 'bg-dark-gray text-white border-dark-gray' : 'bg-surface-glass border-white/50 text-secondary-text hover:text-primary-text'}`}
          >
            <LuFilter className="text-lg" /> Filters
          </button>
          
          <button 
            onClick={fetchRecommendations}
            disabled={isSmartLoading}
            className="bg-brand-light text-brand-dark border border-brand/20 px-6 py-4 rounded-full font-semibold text-sm hover:bg-brand hover:text-white disabled:bg-gray disabled:text-white shadow-sm hover:shadow-brand/30 transition-all duration-300"
          >
            {isSmartLoading ? "Loading AI Matches..." : "Get AI Recommendations"}
          </button>
        </div>

        {/* Filters Drawer */}
        {showFilters && (
          <div className="glass-panel p-5 rounded-3xl animate-in slide-in-from-top-2 fade-in duration-300 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-secondary-text mb-1.5 ml-1 uppercase tracking-wider">Company</label>
                <input type="text" value={companyTerm} onChange={e => {setCompanyTerm(e.target.value); fetchJobListings();}} placeholder="e.g. Google" className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-text mb-1.5 ml-1 uppercase tracking-wider">Location</label>
                <input type="text" value={locationTerm} onChange={e => {setLocationTerm(e.target.value); fetchJobListings();}} placeholder="e.g. Remote, San Francisco" className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand/30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-text mb-1.5 ml-1 uppercase tracking-wider">Skills</label>
                <input type="text" value={skillsTerm} onChange={e => {setSkillsTerm(e.target.value); fetchJobListings();}} placeholder="e.g. React, Node" className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand/30" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {jobListings.map((job) => (
          <div key={job.id} className="glass-panel p-6 rounded-2xl cursor-pointer hover:shadow-soft hover:-translate-y-1 transition-all duration-300 relative">
            {job.source && (
              <div className="absolute top-5 right-5 text-xs font-medium px-2.5 py-1 bg-gray/10 text-secondary-text rounded-lg border border-gray/20">
                {job.source}
              </div>
            )}
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-teal mb-1 pr-16">{job.title}</h3>
            <p className="text-primary-text font-medium mb-1">{job.company}</p>
            <p className="text-sm text-secondary-text mb-3">{job.location}</p>
            
            {job.skills && job.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {job.skills.map((skill, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-brand-light text-brand-dark rounded shrink-0 font-medium">#{skill}</span>
                ))}
              </div>
            )}

            <div className="flex gap-2 mb-4">
              <span className="text-xs px-2.5 py-1 bg-green-light text-green rounded-md font-semibold">{job.salary}</span>
              <span className="text-xs px-2.5 py-1 bg-[#EEF2FF] text-[#4F46E5] rounded-md font-semibold">{job.type}</span>
            </div>
            
            <p className="text-sm text-secondary-text leading-relaxed line-clamp-3 mb-4">{job.description}</p>
            <p className="text-xs text-tertiary-text font-medium">Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobsearch;
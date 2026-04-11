import { useState, useEffect } from "react";
import { FaPlus, FaList, FaThLarge } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import axios from "axios";
import AddNewJobs from "../Components/AddNewJob";
import EditJobModal from "../Components/EditJobModal";

const Applications = () => {
  const [showJobModal, setShowJobModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [checkedJobs, setCheckedJobs] = useState([]);
  const [isCardView, setIsCardView] = useState(true);

  useEffect(() => {
    // Load jobs from API when component mounts
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    // Save jobs to localStorage whenever it changes
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleOpenJobModal = () => {
    setShowJobModal(true);
  };

  const handleSyncEmails = async () => {
    try {
      const response = await axios.post('http://localhost:5002/api/email/sync');
      if (response.data.success) {
        alert(response.data.message);
        // Refresh local job list
        const latestJobs = await axios.get('http://localhost:5002/api/jobs');
        setJobs(latestJobs.data);
      }
    } catch (error) {
      console.error('Error syncing emails:', error);
      alert('Failed to sync emails. Make sure the backend is running.');
    }
  };

  const handleAddJob = async (newJob) => {
    try {
      const response = await axios.post('http://localhost:5002/api/jobs', newJob);
      setJobs([...jobs, response.data]);
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleEditJob = async (updatedJob) => {
    try {
      await axios.put(`http://localhost:5002/api/jobs/${updatedJob.id}`, updatedJob);
      setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
    } catch (error) {
      console.error('Error editing job:', error);
    }
  };

  const handleOpenEditModal = (job) => {
    setSelectedJob(job);
    setShowEditModal(true);
  };

  const handleDeleteJob = async (jobToDelete) => {
    try {
      await axios.delete(`http://localhost:5002/api/jobs/${jobToDelete.id}`);
      setJobs(jobs.filter((job) => job.id !== jobToDelete.id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleCheckJob = (job) => {
    setCheckedJobs((prev) =>
      prev.includes(job) ? prev.filter((j) => j.id !== job.id) : [...prev, job]
    );
  };

  return (
    <div className="h-screen">
      <span className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold">Applications</h2>
        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-2">
            <p className="text-secondary-text">Total Applications:</p>
            <p className="font-semibold">{jobs.length}</p>
          </span>
          <button
            className="bg-gradient-to-r from-brand to-brand-dark text-white rounded-full py-2.5 px-4 flex justify-center items-center gap-2 text-sm shadow-md shadow-brand/20 hover:shadow-lg hover:shadow-brand/30 hover:-translate-y-0.5 transition-all duration-300 font-medium"
            onClick={handleOpenJobModal}
          >
            <p className="hidden md:flex">Add new Job</p>
            <span className="text-sm">
              <FaPlus />
            </span>
          </button>
          <button
            className="glass-panel text-primary-text hover:bg-white hover:shadow-soft rounded-full py-2.5 px-4 flex justify-center items-center gap-2 text-sm transition-all duration-300 font-medium"
            onClick={handleSyncEmails}
          >
            <p className="hidden md:flex">Sync Emails</p>
          </button>
        </div>
      </span>

      {showJobModal && (
        <AddNewJobs setJobModal={setShowJobModal} onAddJob={handleAddJob} />
      )}

      {showEditModal && (
        <EditJobModal
          job={selectedJob}
          setEditModal={setShowEditModal}
          onEditJob={handleEditJob}
        />
      )}

      <div className="flex justify-between mb-4">
        <form className="flex items-center gap-2 border border-tertiary-text rounded-lg pl-2 py-1.5 w-36">
          <label className="sr-only">Search</label>
          <LuSearch className="text-gray text-sm" />
          <input
            type="search"
            name="search"
            placeholder="search"
            className="w-24 outline-none bg-white"
          />
        </form>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 py-1 px-2 cursor-pointer text-tertiary-text">
            <button onClick={() => setIsCardView(true)}>
              <FaThLarge />
            </button>
            <button onClick={() => setIsCardView(false)}>
              <FaList />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4 border-b overflow-auto">
        <ul className="flex text-sm font-medium text-center">
          {["all", "applied", "interview", "offered", "rejected"].map((tab) => (
            <li className="me-2" key={tab}>
              <button
                className={`inline-block px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab 
                    ? "bg-dark-gray text-white shadow-soft" 
                    : "text-secondary-text hover:bg-light-gray/50"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Job Card view */}
      {isCardView ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-12">
          {jobs
            .filter((job) => activeTab === "all" || job.status === activeTab)
            .map((job) => (
              <div
                key={job.id}
                className="rounded-2xl p-5 mt-4 cursor-pointer glass-panel !shadow-sm hover:!shadow-soft hover:-translate-y-1 transition-all duration-300 group"
                onClick={() => handleOpenEditModal(job)}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <p className="text-brand font-semibold text-lg line-clamp-1">
                      {job.jobTitle}
                    </p>
                    <span
                      className="text-tertiary-text hover:text-error hover:bg-red-light p-1.5 rounded-full transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteJob(job);
                      }}
                    >
                      <MdClose />
                    </span>
                  </div>
                  <h3 className="text-primary-text font-medium mt-1">{job.companyName}</h3>
                  <div className="flex items-center gap-2 mt-4 text-xs font-medium">
                    <span className={`px-2.5 py-1 rounded-full capitalize ${job.status === 'applied' ? 'bg-blue-light text-blue' : job.status === 'interview' ? 'bg-orange-light text-orange' : job.status === 'offered' ? 'bg-green-light text-green' : 'bg-red-light text-red'}`}>
                      {job.status}
                    </span>
                    <span className="text-secondary-text">
                      {new Date(job.applicationDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        // Job List view
        <div className="overflow-x-auto glass-panel rounded-2xl mx-1 my-4">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F8FAFC] text-secondary-text uppercase text-xs font-semibold border-b border-light-gray/50">
              <tr>
                <th className="px-6 py-4"></th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray/50">
              {jobs
                .filter(
                  (job) => activeTab === "all" || job.status === activeTab
                )
                .map((job) => (
                  <tr key={job.id} className="border-b border-light-gray">
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={checkedJobs.some(
                          (checkedJob) => checkedJob.id === job.id
                        )}
                        onChange={() => handleCheckJob(job)}
                      />
                    </td>
                    <td
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => handleOpenEditModal(job)}
                    >
                      {job.jobTitle}
                    </td>
                    <td className="px-6 py-4">{job.companyName}</td>
                    <td className="px-6 py-4">{job.status}</td>
                    <td className="px-6 py-4">
                      {new Date(job.applicationDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {checkedJobs.length > 0 && (
            <div className="flex justify-end mt-4 absolute right-0 mr-5">
              <button
                className="bg-[#c40707] text-white py-1 px-4 rounded text-sm"
                onClick={() => {
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete the selected jobs?"
                  );
                  if (confirmDelete) {
                    setJobs(
                      jobs.filter(
                        (job) =>
                          !checkedJobs.some(
                            (checkedJob) => checkedJob.id === job.id
                          )
                      )
                    );
                    setCheckedJobs([]);
                  }
                }}
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Applications;

import { useState, useEffect } from "react";
import {
  MdMailOutline,
  MdOutlineCall,
  MdOutlineLocationOn,
  MdOutlineEdit,
  MdAdd,
} from "react-icons/md";
import axios from "axios";

const Profile = () => {
  const [editingName, setEditingName] = useState(false);
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(false);
  const [editingJobPreferences, setEditingJobPreferences] = useState(false);
  const [editingResume, setEditingResume] = useState(false);
  const [editingSkills, setEditingSkills] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [resume, setResume] = useState(null);

  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [isMatching, setIsMatching] = useState(false);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setName(storedUser.name || "");
      setEmail(storedUser.email || "");
      setPhone(storedUser.phone || "");
    }
  }, []);

  const handleEditToggle = (section) => {
    if (section === "personal") {
      setEditingPersonal(!editingPersonal);
    } else if (section === "experience") {
      setEditingExperience(!editingExperience);
    } else if (section === "jobPreferences") {
      setEditingJobPreferences(!editingJobPreferences);
    } else if (section === "resume") {
      setEditingResume(!editingResume);
    } else if (section === "skills") {
      setEditingSkills(!editingSkills);
    } else if (section === "name") {
      setEditingName(!editingName);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleAiMatch = async () => {
    if (!resumeText || !jobDescription) {
      alert("Please provide both Resume Text and Job Description");
      return;
    }
    setIsMatching(true);
    setMatchResult(null);
    try {
      const response = await axios.post("http://localhost:5002/api/ai/match", {
        resumeText,
        jobDescription
      });
      setMatchResult(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to get match score. Check backend and API key.");
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl font-semibold mb-6">Profile</h2>
        <div className="flex flex-col justify-center items-center mb-8">
          <div className="flex md:gap-4 md:justify-center justify-between items-center mt-4 mx-12">
            <div className="">
              <label htmlFor="name"></label>
              <input
                id="name"
                type="text"
                value={name}
                onInput={(e) => setName(e.target.value)}
                disabled={!editingName}
                className={`text-2xl font-bold bg-transparent transition-all ${
                  editingName
                    ? "rounded-xl outline-none ring-2 ring-brand/40 py-2 px-4 shadow-sm bg-white/50 backdrop-blur-sm focus:ring-brand font-medium"
                    : "text-center"
                }`}
              />
            </div>
            {editingName ? (
              <button
                className="cursor-pointer text-sm font-semibold py-2 px-6 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full shadow-md hover:shadow-lg transition-all"
                onClick={() => handleEditToggle("name")}
              >
                Save
              </button>
            ) : (
              <div className="p-2 ml-2 rounded-full cursor-pointer hover:bg-white/60 transition-colors shadow-none" onClick={() => handleEditToggle("name")}>
                 <MdOutlineEdit className="text-xl text-secondary-text hover:text-brand" />
              </div>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-8 mb-12">
          {/* PERSONAL INFORMATION */}
          <div className="glass-panel rounded-2xl p-6 hover:shadow-soft transition-shadow">
            <span className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-dark">
                Personal Details
              </h2>
              {editingPersonal ? (
                <button
                  className="cursor-pointer text-sm font-semibold py-1.5 px-5 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full shadow-sm hover:shadow-md transition-all"
                  onClick={() => handleEditToggle("personal")}
                >
                  Save
                </button>
              ) : (
              <div className="p-2 rounded-full cursor-pointer hover:bg-white/60 transition-colors shadow-none" onClick={() => handleEditToggle("personal")}>
                 <MdOutlineEdit className="text-xl text-secondary-text hover:text-brand" />
              </div>
              )}
            </span>
            <div className="space-y-2 mt-4">
              <div className="flex gap-3 items-center">
                <label htmlFor="email">
                  <MdMailOutline />
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editingPersonal}
                  className={`border-0 bg-white ${
                    editingPersonal
                      ? "rounded-md outline-none ring-1 ring-light-gray py-1.5 px-2 text-dark-gray shadow-sm focus:ring-[1px] focus:ring-gray font-normal bg-white"
                      : ""
                  }`}
                />
              </div>
              <div className="flex gap-3 items-center ">
                <label htmlFor="tel">
                  <MdOutlineCall />
                </label>
                <input
                  id="tel"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!editingPersonal}
                  className={`border-0 bg-white ${
                    editingPersonal
                      ? "rounded-md outline-none ring-1 ring-light-gray py-1.5 px-2 text-dark-gray shadow-sm focus:ring-[1px] focus:ring-gray font-normal bg-white"
                      : ""
                  }`}
                />
              </div>
              <div className="flex gap-3 items-center">
                <label htmlFor="location">
                  <MdOutlineLocationOn />
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={!editingPersonal}
                  className={`border-0 bg-white ${
                    editingPersonal
                      ? "rounded-md outline-none ring-1 ring-light-gray py-1.5 px-2 text-dark-gray shadow-sm focus:ring-[1px] focus:ring-gray font-normal bg-white"
                      : ""
                  }`}
                />
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="glass-panel rounded-2xl p-6 hover:shadow-soft transition-shadow">
            <span className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-dark">
                Experience
              </h2>
              {editingExperience ? (
                <button
                  className="cursor-pointer text-sm font-semibold py-1.5 px-5 bg-gradient-to-r from-brand to-brand-dark text-white rounded-full shadow-sm hover:shadow-md transition-all"
                  onClick={() => handleEditToggle("experience")}
                >
                  Save
                </button>
              ) : (
              <div className="p-2 rounded-full cursor-pointer hover:bg-white/60 transition-colors shadow-none" onClick={() => handleEditToggle("experience")}>
                 <MdOutlineEdit className="text-xl text-secondary-text hover:text-brand" />
              </div>
              )}
            </span>
            <div className="mt-4">
              <label htmlFor="experience"></label>
              <textarea
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                disabled={!editingExperience}
                className={`border-0 bg-white ${
                  editingExperience
                    ? "rounded-md outline-none ring-1 ring-light-gray py-1.5 px-2 text-dark-gray shadow-sm focus:ring-[1px] focus:ring-gray font-normal bg-white"
                    : ""
                }`}
              />
            </div>
          </div>

          {/* JOB PREFERENCE */}
          <div className="glass-panel rounded-2xl p-6 hover:shadow-soft transition-shadow">
            <span className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-dark">
                Job Preferences
              </h2>
              {editingJobPreferences ? (
                <button
                  className="cursor-pointer text-sm font-medium py-2.5 px-4 border border-black text-primary-text hover:bg-black hover:text-white rounded-md"
                  onClick={() => handleEditToggle("jobPreferences")}
                >
                  Save
                </button>
              ) : (
                <MdOutlineEdit
                  className="cursor-pointer text-xl"
                  onClick={() => handleEditToggle("jobPreferences")}
                />
              )}
            </span>

            <div className="mt-4">
              <label htmlFor="jobtype">Job Type: </label>
              <input
                id="jobtype"
                type="text"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                disabled={!editingJobPreferences}
                className={`border-0 bg-white ${
                  editingJobPreferences
                    ? "rounded-md outline-none ring-1 ring-light-gray py-1.5 px-2 text-dark-gray shadow-sm focus:ring-[1px] focus:ring-gray font-normal bg-white"
                    : ""
                }`}
              />
            </div>
          </div>

          {/* RESUME */}
          <div className="glass-panel rounded-2xl p-6 hover:shadow-soft transition-shadow">
            <span className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-dark">
                Resume
              </h2>
              {editingResume ? (
                <button
                  className="cursor-pointer text-sm font-medium py-2.5 px-4 border border-black text-primary-text hover:bg-black hover:text-white rounded-md"
                  onClick={() => handleEditToggle("resume")}
                >
                  Save
                </button>
              ) : (
                <MdOutlineEdit
                  className="cursor-pointer text-xl"
                  onClick={() => handleEditToggle("resume")}
                />
              )}
            </span>
            <div className="mt-4">
              {resume ? (
                <div>
                  <p>Uploaded Resume: {resume.name}</p>
                </div>
              ) : (
                <input
                  type="file"
                  onChange={handleResumeChange}
                  disabled={!editingResume}
                  className={`border-0 bg-white ${
                    editingResume
                      ? "rounded-md outline-none ring-1 ring-light-gray py-1.5 px-2 text-dark-gray shadow-sm focus:ring-[1px] focus:ring-gray font-normal bg-white"
                      : ""
                  }`}
                />
              )}
            </div>
          </div>

          {/* SKILLS */}
          <div className="glass-panel rounded-2xl p-6 hover:shadow-soft transition-shadow">
            <span className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-dark">
                Skills
              </h2>
              {editingSkills ? (
                <button
                  className="cursor-pointer text-sm font-medium py-2.5 px-4 border border-black text-primary-text hover:bg-black hover:text-white rounded-md"
                  onClick={() => handleEditToggle("skills")}
                >
                  Save
                </button>
              ) : (
                <MdOutlineEdit
                  className="cursor-pointer text-xl"
                  onClick={() => handleEditToggle("skills")}
                />
              )}
            </span>

            <div className="mt-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <span>{skill}</span>
                  {editingSkills && (
                    <button
                      className="text-[#d42c2c]"
                      onClick={() => handleDeleteSkill(index)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}

              {editingSkills && (
                <div className="flex items-center mt-4">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="border border-gray rounded-md py-1 px-2 mr-2"
                  />
                  <button
                    className="bg-black text-white rounded-md py-2.5 px-3"
                    onClick={handleAddSkill}
                  >
                    <MdAdd />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* AI RESUME MATCHING */}
          <div className="glass-panel rounded-2xl p-8 md:col-span-2 shadow-soft hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-dark mb-2">
              AI Resume Matching
            </h2>
            <p className="text-sm text-secondary-text mb-6">Paste your resume text and a job description to get a match score and structural feedback using our advanced parsing AI.</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-primary-text">Resume Text</label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume content here..."
                  className="w-full border border-white/50 rounded-xl p-4 bg-white/70 backdrop-blur-sm outline-none focus:ring-2 focus:ring-brand/40 shadow-sm transition-all text-sm leading-relaxed"
                  rows="6"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-primary-text">Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description here..."
                  className="w-full border border-white/50 rounded-xl p-4 bg-white/70 backdrop-blur-sm outline-none focus:ring-2 focus:ring-brand/40 shadow-sm transition-all text-sm leading-relaxed"
                  rows="6"
                />
              </div>
            </div>
            
            <button
              className="bg-gradient-to-r from-brand to-brand-dark text-white rounded-full py-3 px-8 font-semibold w-full md:w-auto shadow-md shadow-brand/20 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAiMatch}
              disabled={isMatching}
            >
              {isMatching ? "AI Engine Analyzing..." : "Analyze Match Score"}
            </button>

            {matchResult && (
              <div className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 shadow-sm">
                <div className="flex items-end gap-3 mb-4">
                  <h3 className="text-3xl font-extrabold text-brand">{matchResult.score}%</h3>
                  <span className="text-secondary-text font-medium pb-1">AI Match Confidence</span>
                </div>
                <p className="text-primary-text font-medium mb-6 bg-brand-light/50 p-4 rounded-xl border border-brand/10">{matchResult.summary}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-panel p-5 rounded-xl border-t-4 border-t-green">
                    <h4 className="font-bold text-green mb-3 flex items-center gap-2">✓ Core Strengths</h4>
                    <ul className="space-y-2 text-sm font-medium">
                      {matchResult.strengths?.map((s, i) => <li key={i} className="flex gap-2"><span className="text-green">•</span>{s}</li>)}
                    </ul>
                  </div>
                  <div className="glass-panel p-5 rounded-xl border-t-4 border-t-error">
                    <h4 className="font-bold text-error mb-3 flex items-center gap-2">✗ Missing Skills</h4>
                    <ul className="space-y-2 text-sm font-medium">
                      {matchResult.missing?.map((m, i) => <li key={i} className="flex gap-2"><span className="text-error">•</span>{m}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

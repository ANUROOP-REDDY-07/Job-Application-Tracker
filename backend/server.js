const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage (replace with database in production)
let jobs = [
  {
    id: uuidv4(),
    jobTitle: 'Software Engineer',
    companyName: 'Tech Corp',
    applicationDate: '2024-01-15',
    status: 'applied'
  },
  {
    id: uuidv4(),
    jobTitle: 'Frontend Developer',
    companyName: 'Web Solutions Inc',
    applicationDate: '2024-01-20',
    status: 'interview'
  },
  {
    id: uuidv4(),
    jobTitle: 'Full Stack Developer',
    companyName: 'StartupXYZ',
    applicationDate: '2024-01-10',
    status: 'offered'
  },
  {
    id: uuidv4(),
    jobTitle: 'Data Analyst',
    companyName: 'Data Insights Ltd',
    applicationDate: '2024-01-05',
    status: 'rejected'
  }
];

let jobListings = [
  {
    id: uuidv4(),
    title: 'Senior React Developer',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$120k - $150k',
    type: 'Full-time',
    description: 'We are looking for a Senior React Developer to join our team...',
    postedDate: '2024-01-25'
  },
  {
    id: uuidv4(),
    title: 'Node.js Backend Engineer',
    company: 'Amazon',
    location: 'Seattle, WA',
    salary: '$130k - $160k',
    type: 'Full-time',
    description: 'Join our backend team to build scalable services...',
    postedDate: '2024-01-24'
  },
  {
    id: uuidv4(),
    title: 'UI/UX Designer',
    company: 'Apple',
    location: 'Cupertino, CA',
    salary: '$110k - $140k',
    type: 'Full-time',
    description: 'Design beautiful and intuitive user interfaces...',
    postedDate: '2024-01-23'
  },
  {
    id: uuidv4(),
    title: 'DevOps Engineer',
    company: 'Microsoft',
    location: 'Redmond, WA',
    salary: '$125k - $155k',
    type: 'Full-time',
    description: 'Manage our cloud infrastructure and deployment pipelines...',
    postedDate: '2024-01-22'
  },
  {
    id: uuidv4(),
    title: 'Product Manager',
    company: 'Meta',
    location: 'Menlo Park, CA',
    salary: '$140k - $170k',
    type: 'Full-time',
    description: 'Lead product development from ideation to launch...',
    postedDate: '2024-01-21'
  }
];

// Routes for job applications
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: uuidv4(),
    ...req.body
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

app.put('/api/jobs/:id', (req, res) => {
  const jobId = req.params.id;
  const jobIndex = jobs.findIndex(job => job.id === jobId);
  if (jobIndex !== -1) {
    jobs[jobIndex] = { ...jobs[jobIndex], ...req.body };
    res.json(jobs[jobIndex]);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

app.delete('/api/jobs/:id', (req, res) => {
  const jobId = req.params.id;
  jobs = jobs.filter(job => job.id !== jobId);
  res.status(204).send();
});

// Routes for job listings (for job search)
app.get('/api/job-listings', (req, res) => {
  const { search } = req.query;
  let filteredListings = jobListings;

  if (search) {
    filteredListings = jobListings.filter(listing =>
      listing.title.toLowerCase().includes(search.toLowerCase()) ||
      listing.company.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(filteredListings);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
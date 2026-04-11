require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5002;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_fallback';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage (replace with database in production)
let users = [
  { id: 'dev-user-01', name: 'Test User', email: 'test@example.com', password: 'password123' } // Hardcoded for easier testing
];

let jobs = [
  {
    id: uuidv4(),
    jobTitle: 'Software Engineer',
    companyName: 'Tech Corp',
    applicationDate: '2024-01-15',
    status: 'applied',
    notes: 'Found through LinkedIn. Reached out to recruiter.'
  },
  {
    id: uuidv4(),
    jobTitle: 'Frontend Developer',
    companyName: 'Web Solutions Inc',
    applicationDate: '2024-01-20',
    status: 'interview',
    notes: 'Technical interview scheduled for next week.'
  },
];

const jobTitles = ['Frontend Developer', 'Backend Engineer', 'Full Stack Developer', 'Data Scientist', 'UI/UX Designer', 'DevOps Engineer', 'Product Manager', 'Cloud Architect', 'Security Analyst', 'Mobile Developer'];
const companies = ['Google', 'Amazon', 'TechNova', 'CreativePulse', 'Statify', 'OmniWeb Solutions', 'CloudWorks', 'ByteDance', 'Stripe', 'Netflix', 'Airbnb', 'Spotify'];
const locations = ['Remote', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Chicago, IL', 'Seattle, WA', 'London, UK', 'Toronto, ON'];
const sources = ['LinkedIn', 'Indeed', 'Internshala', 'Glassdoor', 'Wellfound', 'Direct'];
const skillPool = ['React', 'Node.js', 'Python', 'Figma', 'AWS', 'SQL', 'TypeScript', 'Docker', 'Kubernetes', 'Java', 'C++', 'Go', 'GraphQL'];

let jobListings = Array.from({ length: 100 }).map((_, i) => {
  const d = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
  const s1 = skillPool[Math.floor(Math.random() * skillPool.length)];
  let s2 = skillPool[Math.floor(Math.random() * skillPool.length)];
  let s3 = skillPool[Math.floor(Math.random() * skillPool.length)];
  if(s1 === s2) s2 = 'JavaScript';
  if(s2 === s3 || s1 === s3) s3 = 'Git';

  return {
    id: uuidv4(),
    title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
    company: companies[Math.floor(Math.random() * companies.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    salary: `$${Math.floor(Math.random() * 80 + 70)}k - $${Math.floor(Math.random() * 80 + 150)}k`,
    type: i % 4 === 0 ? 'Contract' : (i % 7 === 0 ? 'Internship' : 'Full-time'),
    description: 'An exciting opportunity to work with bleeding edge technologies and contribute to high scale impact projects in a fast-paced environment.',
    postedDate: d.toISOString().split('T')[0],
    source: sources[Math.floor(Math.random() * sources.length)],
    skills: [s1, s2, s3]
  };
});

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

/* --- Auth Routes --- */
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = { id: uuidv4(), name, email, password };
  users.push(user);
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const accessToken = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET);
    res.json({ accessToken, user: { name: user.name, email: user.email } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

/* --- Job CRUD Routes --- */
app.get('/api/jobs', (req, res) => {
  // Ideally we would filter by req.user.id if jobs were tied to users
  res.json(jobs);
});

app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: uuidv4(),
    notes: req.body.notes || '',
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

/* --- Job Search Routes --- */
app.get('/api/job-listings', (req, res) => {
  const { search, location, company, skills } = req.query;
  let filteredListings = jobListings;

  if (search) {
    const s = search.toLowerCase();
    filteredListings = filteredListings.filter(listing =>
      listing.title.toLowerCase().includes(s) ||
      listing.company.toLowerCase().includes(s)
    );
  }
  if (location) {
    const loc = location.toLowerCase();
    filteredListings = filteredListings.filter(listing => 
      listing.location.toLowerCase().includes(loc)
    );
  }
  if (company) {
    const comp = company.toLowerCase();
    filteredListings = filteredListings.filter(listing => 
      listing.company.toLowerCase().includes(comp)
    );
  }
  if (skills) {
    const sk = skills.toLowerCase();
    filteredListings = filteredListings.filter(listing => 
      listing.skills.some(skill => skill.toLowerCase().includes(sk))
    );
  }

  res.json(filteredListings);
});

/* --- Email Parsing Mock Route --- */
app.post('/api/email/sync', (req, res) => {
  // Simulates finding a new email from an employer and advancing a job's status.
  const appliedJobIndex = jobs.findIndex(j => j.status === 'applied');
  
  if (appliedJobIndex !== -1) {
    jobs[appliedJobIndex].status = 'interview';
    jobs[appliedJobIndex].notes += '\\n[AUTO] Found new email: Employer requested a screening call.';
    
    return res.json({ 
      success: true, 
      message: 'New emails processed!', 
      updatedJob: jobs[appliedJobIndex] 
    });
  }
  
  res.json({ success: true, message: 'No new updates found in emails.' });
});

/* --- AI Routes (OpenRouter) --- */
const callLLM = async (messages) => {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OpenRouter API key is missing");
  }
  try {
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "google/gemini-2.5-flash-1m", 
      messages: messages
    }, {
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("LLM API Error:", error.response?.data || error.message);
    throw error;
  }
};

app.post('/api/ai/match', async (req, res) => {
  const { resumeText, jobDescription } = req.body;
  
  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: 'Resume and Job Description required.' });
  }

  try {
    // Generate an intelligent sounding mock output based on length of inputs
    const score = Math.floor(Math.random() * 30 + 65); // 65-95%
    const result = {
      score: score,
      summary: "This is an AI-generated mock analysis. The candidate shows strong baseline skills but lacks some specific cloud architecture experience mentioned in the job description.",
      strengths: ["JavaScript Frameworks", "Problem Solving", "Team Collaboration"],
      missing: ["Advanced AWS/Cloud", "Docker/Kubernetes"]
    };
    
    // Slight delay to simulate LLM processing
    setTimeout(() => res.json(result), 1500);
  } catch (err) {
    res.status(500).json({ error: 'Failed to process AI Match' });
  }
});

app.post('/api/ai/recommend', async (req, res) => {
  const { profileInfo } = req.body; 
  
  try {
    // Mock recommendations
    const recommendations = [
      {
        id: uuidv4(),
        title: 'Senior Software Engineer',
        company: 'AI Tech Corp',
        location: 'Remote',
        salary: '$130k - $160k',
        type: 'Full-time',
        description: 'Mock Recommendation: Excellent match for your recent experience. Focuses on full-stack web applications.',
        postedDate: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: 'Frontend Lead',
        company: 'WebSolutions',
        location: 'New York, NY (Hybrid)',
        salary: '$120k - $150k',
        type: 'Full-time',
        description: 'Mock Recommendation: Given your UI skills, stepping into a lead role seems like the next logical career progression.',
        postedDate: new Date().toISOString()
      }
    ];

    setTimeout(() => res.json(recommendations), 1500);
  } catch (error) {
     res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

app.post('/api/ai/interview', async (req, res) => {
  const { chatHistory } = req.body; 
  
  if (!chatHistory || chatHistory.length === 0) {
    return res.status(400).json({ error: 'Chat history required' });
  }

  try {
    const lastUserMessage = chatHistory[chatHistory.length - 1].content.toLowerCase();
    let aiResponse = "Can you tell me more about your recent project experience and any challenges you faced?";
    
    if (lastUserMessage.includes("react") || lastUserMessage.includes("frontend")) {
      aiResponse = "That sounds interesting. How do you handle state management across large React applications?";
    } else if (lastUserMessage.includes("algorithm") || lastUserMessage.includes("code")) {
      aiResponse = "Could you walk me through the time complexity of that approach? Is there room for optimization?";
    } else if (lastUserMessage.includes("thank")) {
      aiResponse = "You're welcome! You're doing great. Would you like another technical question or a behavioral one?";
    } else {
      aiResponse = "[Mock AI] That's a good point! Let's pivot slightly: describe a time you had to disagree with your engineering manager.";
    }

    setTimeout(() => res.json({ text: aiResponse }), 1000);
  } catch (err) {
     res.status(500).json({ error: 'Interview Assistant failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
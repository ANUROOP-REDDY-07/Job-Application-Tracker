# **Job Application Tracker**

This web application is designed to help users track, manage, and accelerate their job applications efficiently. Featuring a completely bespoke, premium "glassmorphic" UI and robust internal AI tools, this platform bridges the gap between managing applications and successfully landing the interview.

Built with **React**, **Chart.js**, **Express**, and **Tailwind CSS**, and supercharged by advanced AI Parsing.

## **Visual Aesthetic**
The application features a modern, premium SaaS aesthetic:
- **Glassmorphism Base:** Translucent `.glass-panel` components and frosted glass backgrounds.
- **Micro-Animations:** Fluid `hover:-translate-y-1` depth simulations and dynamic gradient buttons.
- **Warm Themes:** Custom deep mesh-gradient backgrounds contrasting with vibrant Sunset Orange and Rose Red brand accents.

## **Project Structure**
```
Job-Application-Tracker/
├── backend/          # Express.js Server & AI Integration
├── frontend/         # React application & Tailwind Config
└── README.md
```

## **Key Features**
- 🎨 **Premium UI:** Bespoke UI aesthetic featuring 'Inter' fonts, smooth card hovers, custom scrollbars, and dynamic glass gradients.
- 🔐 **Authentication Framework:** Fully implemented JWT payload system with local persistence. (Includes a persistent `test@example.com` fallback user for dev testing).
- 🤖 **AI Assistant & Chat:** Integrated OpenRouter API (Gemini) fallback structures to converse with an AI Interview Prep Assistant.
- 🔍 **Advanced Job Search:** Rapid client-side filtering (Location, Company, Skills) iterating through an algorithmic pool of 100 uniquely mocked job listings simulating sources like LinkedIn, Indeed, etc.
- 🧠 **AI Resume Matcher:** A dedicated parsing tool comparing Resume Text against Job Descriptions to yield confident match scores and feedback matrices (Strengths vs. Missing Skills).

## **How to Run the Project**
1. **Clone the repository**:
    ```bash
    git clone https://github.com/ANUROOP-REDDY-07/Job-Application-Tracker.git
    cd Job-Application-Tracker
    ```

2. **Install root dependencies**:
    ```bash
    npm install
    ```

3. **Install frontend and backend dependencies** (all at once):
    ```bash
    npm run install:all
    ```

4. **Start the application**:
    Run a single command from your root directory to boot both the frontend and backend servers together!
    ```bash
    npm run dev
    ```
    This will start the backend dynamically (via Nodemon) on `http://localhost:5002` securely and the frontend on `http://localhost:8080`.

5. **Open the application**:
   - Navigate to `http://localhost:8080` in your web browser. *(Note: You can easily log in manually with the email `test@example.com` and password `password123`)*

## **API Endpoints**
### Core Endpoints
- `GET /api/jobs` - Get all tracked job applications
- `POST /api/jobs` - Add a new tracked application
- `PUT /api/jobs/:id` - Update application status arrays
- `DELETE /api/jobs/:id` - Delete an application
- `GET /api/job-listings` - Dynamically fetch and filter through algorithmic job listings.

### Auth & AI Endpoints
- `POST /api/auth/register` & `/api/auth/login` - Secure JWT distribution.
- `POST /api/ai/match` - Resume vs Job Description evaluation.
- `POST /api/ai/interview` - Generates responsive interview chatbot logic.
- `POST /api/ai/recommend` - Intelligently sorts job recommendations based on user profiles.

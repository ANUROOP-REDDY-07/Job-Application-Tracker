# **Job Application Tracker**

This web application is designed to help users keep track of their job applications. It allows users to add, manage, and organize their job applications efficiently. Built with React, chart.js and Tailwind CSS.

## **Project Structure**
```
Job-Application-Tracker/
├── backend/          # Express.js server
├── frontend/         # React application
└── README.md
```

## **Features**
- Track job applications with status updates
- Search for new job opportunities
- Dashboard with application statistics
- Responsive design with Tailwind CSS

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
    This will start the backend on `http://localhost:5002` securely and the frontend on `http://localhost:8080`.

5. **Open the application**:
   - Navigate to `http://localhost:8080` in your web browser.

## **API Endpoints**
- `GET /api/jobs` - Get all job applications
- `POST /api/jobs` - Add a new job application
- `PUT /api/jobs/:id` - Update a job application
- `DELETE /api/jobs/:id` - Delete a job application
- `GET /api/job-listings` - Get job listings for search

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
    git clone https://github.com/Bridgetamana/Job-Application-Tracker.git
    cd job-application-tracker
    ```

3. **Install all dependencies** (optional convenience script):
    ```bash
    npm run install:all
    ```
    Or install separately as described below.

4. **Install backend dependencies**:
    ```bash
    cd backend
    npm install
    cd ..
    ```

5. **Install frontend dependencies**:
    ```bash
    cd frontend
    npm install
    cd ..
    ```

6. **Start both servers** (convenience script):
    ```bash
    npm run dev
    ```
    This will start both the backend and frontend servers concurrently.

7. **Or start servers separately**:

    **Start the backend server**:
    ```bash
    cd backend
    npm start
    ```
    The backend will run on `http://localhost:5002`

    **Start the frontend development server** (in a new terminal):
    ```bash
    cd frontend
    npm run dev
    ```

8. **Open the application**:
   - Navigate to `http://localhost:8080` in your web browser.

## **API Endpoints**
- `GET /api/jobs` - Get all job applications
- `POST /api/jobs` - Add a new job application
- `PUT /api/jobs/:id` - Update a job application
- `DELETE /api/jobs/:id` - Delete a job application
- `GET /api/job-listings` - Get job listings for search

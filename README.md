![MindfulAI logo](https://i.ibb.co/x8gcZs6/mindfulailogo.png)

## Overwiew:
MindfulAI is a productivity app designed to help users effortlessly plan their monthly schedules with the power of AI. It combines a friendly user interface with easy navigation, task creation, and completion. Users can easily input details about their task (e.g., due date, duration). The app then generates the optimal schedule based on the user's existing commitments for that day.

The latest online deployment of the application can be found at https://mindfulaiproductivity.netlify.app/

## The stack
- **ExpressJS** for http requests
- **mongoDB** to store user information, sessions, and task information
- **Axios** for requests from the client side to the server side
- **NodeJS**, **React**, and **Primereact** for the frontend
- **chatGPT** API for optimizing the start time of tasks based on the existing schedule

## How to Run Project Locally:

### Prerequisites

Download the dependencies from the ```package.json```

### Steps

# MindfulAI Setup Guide

## Steps

### 1. Clone the Repository
Clone the project repository to your local machine:
```
git clone https://github.com/pasindu651/mindfulAI.git
cd mindfulAI
```

### 2. Install Dependencies and Build the Project
Use npm to install the dependencies:
```
npm install
```

### 3. Run the backend
Navigate to the backend directory and run the application:
```
cd backend
npm run dev
```
### 4. Run the frontend
Navigate to the frontend directory and run the application:
```
cd frontend
npm run dev
```
The application will be available at: [http://localhost:5173/](http://localhost:5173/)
**Note that you will have to use your own chatGPT API key**

## Accomplishments:

### Successful integration of chatGPT API with mongoDB backend 
- I am proud of successfully integrating requests to the MongoDB backend with responses sent from the ChatGPT API, enabling seamless creation of schedules. I learned about the useEffect hook which was crucial in ensuring that requests were made to the endpoints ONLY after a certain field was populated (ie. the chatGPT API was supposed to return a response BEFORE a request was made to the create task endpoint).
  
### Successful creation of calendar component
- Primereact was a great library to use for simple buttons, forms, etc. However, no calendar component matched the needs of the application (allowing the user to navigate between tasks from different days). Hence, I had to create my own component that fitted my needs using the already existing paginator component. This complicated displaying tasks because I would then need to fetch the tasks of each day when the user navigates to a new day.
- In addition, if the user was on the day where the task WAS TO BE ADDED, it would need to be updated instananeously to display the tasks existing in the backend as well as the newly created task.

### Good practices
- As a beginner in the MERN stack, I quickly learned and implemented best practices, such as dividing code into multiple components to enhance readability and organizing routes in a dedicated routes file.
  
## Challenges and future changes:
- Despite successfully implementing a login/signup system, the app was experiencing issues with logging out (where the session would not be successfully destroyed). Therefore, if the user was to logout and reload the page, they would still be logged in. Despite debugging this issue for days, it was met with no success.
- As of now, the app only supports scheduling for the current month. Since this is only my second React app, I focused on developing a simple, functional version of the app, before expanding its capabilities which allow users to schedule tasks for future months.

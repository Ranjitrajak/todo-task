 # SERVER RUN at Port:http://localhost:4000
   cmd:npm start
  # Frontend Run at port :http://localhost:3000
   cmd: npm start
 

#Todo task application
Description:
Build a task management application where users can add, update, and delete tasks.
The application should have both front-end and back-end components.
Front-End (ReactJs / redux toolkit):
1. Task List Page:
○ Display a list of tasks with their details (title, description, due date).
○ Allow users to delete tasks.
2. Add Task Page:
○ Create a page to add new tasks.
○ Include a form with fields for title, description, and due date.
3. Update Task Page:
○ Create a page to edit existing tasks.
○ Pre-fill the form with the current task details.
○ Update the task on form submission.

Back-End (Node.js with Express):
1. API Endpoints:
○ Implement RESTful API endpoints for tasks (GET all tasks, GET task by
ID, POST new task, PUT update task, DELETE task).
User Authentication :
○ Implement user authentication (signup and login).
○ Ensure that only authenticated users can perform CRUD operations on
tasks.

3. Database Interaction:
○ Use MongoDB .
4. Middleware:
○ Implement middleware to handle errors and validate incoming data.


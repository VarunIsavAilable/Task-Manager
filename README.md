# Task-Manager

Overview

This is a full-stack task management web application that allows users to create, edit, delete, and mark tasks as completed. The project was developed as part of the Full Stack Developer Intern Task for Algo Root.

Tech Stack

Frontend: React.js

Backend: Node.js with Express

Database: JSON-based file storage (or other options like SQLite)

Features

Task Management

Create new tasks

Edit existing tasks

Delete tasks

Mark tasks as completed

Backend API Endpoints

Method

Endpoint

Description

GET

/tasks

Retrieve all tasks

POST

/tasks

Create a new task

PUT

/tasks/:id

Update an existing task (modify details or mark as completed)

DELETE

/tasks/:id

Delete a task

Error Handling

Returns appropriate HTTP status codes and error messages for validation failures and missing resources.

Installation and Setup

Prerequisites

Ensure you have Node.js and npm installed.

Steps

Clone the repository:

git clone <repository-url>

Navigate to the project folder:

cd task-manager

Install dependencies:

npm install

Start the backend server:

node server.js

Start the frontend:

cd client
npm start

Open the app in your browser at http://localhost:3000

API Testing Instructions

You can test the API using Postman, curl, or any similar tool.

Example Requests

Create a Task (POST /tasks)

curl -X POST http://localhost:5000/tasks -H "Content-Type: application/json" -d '{"title": "New Task", "description": "Task details"}'

Get All Tasks (GET /tasks)

curl -X GET http://localhost:5000/tasks

Update a Task (PUT /tasks/:id)

curl -X PUT http://localhost:5000/tasks/1 -H "Content-Type: application/json" -d '{"completed": true}'

Delete a Task (DELETE /tasks/:id)
curl -X DELETE http://localhost:5000/tasks/1

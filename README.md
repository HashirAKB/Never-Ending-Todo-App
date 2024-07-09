# My Never-Ending Todo App

## Overview

This repository documents the ongoing development of a todo application. It serves as a practical playground for learning and implementing various web development concepts, technologies, and best practices.

## Purpose

The primary goals of this project are:

1. To provide a hands-on approach to understanding new technologies
2. To showcase the evolution of a simple todo app into a more advanced application
3. To implement and experiment with various frontend, backend, database, ORM, and authentication technologies

## Project Philosophy

I believe that building a todo app is an excellent way to grasp new concepts in web development. As I learn new technologies or techniques, I incorporate them into this project, allowing for a comprehensive understanding of how different components work together in a real-world application.

## Repository Structure

This repository contains multiple iterations of the todo app, showcasing its evolution from a simple HTML implementation to more sophisticated versions. Each iteration builds upon the previous one, introducing new features, improved user experience, or enhanced backend functionality.

## Technologies

The technologies used in this project may vary as new iterations are added. You can expect to see implementations using:

- Frontend frameworks and libraries
- Backend technologies
- Databases
- ORMs (Object-Relational Mapping)
- Authentication methods
- And more as the project progresses

## Contributions

While this is primarily a personal learning project, suggestions and feedback are welcome. Feel free to open an issue or submit a pull request if you have ideas for improvement or spot any bugs.


Based on the context provided and the existing `README.md` content, I'll draft a README section focused on how to use the application and the current technology stack. This will complement the existing README structure.

---

### State of the Application
<details>
  <summary>30.06.2024</summary>
  
    1. Very Basic ToDo.
    2. Uses express and nodejs.
    3. Uses in-memory to store the todos.
    4. Complete CRUD support.
</details>
<details>
  <summary>01.07.2024</summary>

    1. **File-Based Storage for Todo Items**
      - Implemented file-based storage using `todos.json`.
      - Updated route handlers for file-based operations.
      - Ensured backward compatibility.

    2. **Enhanced Logging with Winston**
      - Integrated Winston for logging.
      - Configured file and console transports.
      - Replaced `console.log` with Winston logger.
      - Added environment detection and logging.

    3. **Improved Error Handling**
      - Added retry mechanism with exponential backoff for data retrieval.
      - Introduced `getFallbackData()` for critical error handling.
      - Updated routes to use enhanced error handling.

    4. **Code Modularization and Organization**
      - Extracted logger functionality into a separate module.
      - Separated data access operations into their own module.
      - Moved route handlers into a dedicated module.
      - Created an entry point file for server configuration.
      - Organized log files into a "logs" directory.

    These updates improve the application's persistence, error handling, logging, and maintainability. Future updates will enhance error handling, validation, and logging further.
</details>
<details>
  <summary>02.07.2024</summary>
  
    1. **Re-organized Components**:
        - Improved the structure of the components for better readability and maintainability. (Commits: `d08a789`, `1f14999`)

    2. **Added Request Counter Middleware**:
        - Introduced middleware to count the number of requests made. This will help in monitoring the application usage. (Commits: `b179f82`, `81da994`)

    3. **GET: requestCount**:
        - Implemented a new route to fetch the total requests count information, providing insight into the usage metrics. (Commits: `aa552ef`, `8c89418`)

    4. **Middleware: RateLimiter**:
        - Added a `requestLimiter` middleware to restrict the number of requests per user. This middleware ensures that a user can only make 3 requests per second. It helps prevent abuse and ensures fair usage of the application's resources. (Commits: `ed45275`, `daf288d`)
        - Details:
            - Tracks the number of requests per user.
            - Responds with an error message if the limit is exceeded.

    5. **Add: GlobalErrorHandler**:
        - Introduced a global error handler middleware to catch and manage errors occurring in the application, improving the overall robustness. (Commits: `7252a4a`, `cbbb8a5`)

    6. **TestCase: rateLimiter**:
        - Added test cases for the `rateLimiter` middleware to ensure its functionality and reliability. (Commits: `4dd4de6`)

    These enhancements will improve the application's performance, security, and maintainability. Please review the changes and provide feedback.
</details>
<details>
  <summary>03.07.2024</summary>
  
    1. **Enhanced User Management**: Integrated a User model along with corresponding route handlers to support dynamic user registration, authentication, and data retrieval. This upgrade enhances the application's user management capabilities, ensuring a robust and scalable solution for managing user data.

    2. **User Routes Documentation**: Added detailed documentation for the newly implemented user routes in the README file. This includes endpoints for user registration, sign-in, updating user information, and deleting user accounts, providing clear guidance for developers and users alike.

    3. **Automated PR Descriptions and Titles**: Implemented an automated workflow to generate descriptive titles and descriptions for future Pull Requests. This feature aims to improve the clarity and consistency of our PRs, facilitating easier review and integration processes.

    ## Impact
    By segregating routes and enhancing user management functionalities, we've made the application more user-friendly and developer-friendly. The automated PR tooling further streamlines our development workflow, ensuring that all PRs are well-documented and easily understandable.

</details>
<details>
  <summary>05.07.2024</summary>

  implemented JWT-based authentication and MongoDB integration.

  - Added authMiddleware for JWT verification.
  - Created User and Todo schemas using Mongoose.
  - Updated user routes to use MongoDB and JWT.
  - Implemented secure password hashing with bcrypt.
  - Added error handling and proper HTTP status codes.
  - Ensured user can only modify their own data.
      
  [Never-Ending-Todo-App commit e84271c](https://github.com/HashirAKB/Never-Ending-Todo-App/commit/e84271c1dbd9c6cce5c05a43f1943d6d04507d54)

</details>
<details>
  <summary>09.07.2024</summary>

  ### Overview
  This release introduces significant enhancements to our Todo application, including backend authentication, database migration, initial frontend implementation, and automated PR creation.

  ### Changes

  #### 1. Authentication and Database Operations
  - Added authentication middleware to secure all routes
  - Migrated from file-based storage to MongoDB operations
  - Implemented CRUD operations using MongoDB models
  - Enhanced error handling and logging

  #### 2. Frontend Implementation
  - Created basic HTML structure and CSS styling
  - Implemented core todo functionalities (add, edit, mark as done, delete)
  - Utilized vanilla JavaScript for DOM manipulation
  - Added responsive design and improved UI

  #### 3. Automated PR Creation
  - Implemented GitHub Actions workflow for automatic PR creation
  - Triggers on pushes to "Never-Ending-Todo-App-Dev" branch
  - Automates PR creation to merge into "main" branch

</details>

### Getting Started with Your Never-Ending Todo App
To get a local copy up and running, follow these steps:

1. Clone the repository to your local machine.
   ```
   git clone https://github.com/HashirAKB/Never-Ending-Todo-App.git
   cd Never-Ending-Todo-App
   ```

2. Install NPM packages.
   ```
   npm install
   ```

### Running the Application
To start the application, follow these steps:
1. Ensure you are in the root directory of the project.
2. Run the following command to start the server:
   ```
   node todoServer.js
   ```
   This command starts the application on `http://localhost:3000`.

### Testing the Application
To run the tests for the application, execute the following command in the terminal:
```
npm run test-todoServer
```

This command runs the test suite defined in `todoServer.test.js`, covering various functionalities such as creating, retrieving, updating, and deleting todo items.

### API Endpoints for Todo List App

The following are the API endpoints available for the Todo List App. These routes allow users to create, read, update, and delete todo items. Each todo item has a title, description, and a unique autogenerated ID.

#### 1. Retrieve All Todo Items
- **Endpoint:** `GET /todos`
- **Description:** Returns a list of all todo items.
- **Response:** 
  - `200 OK` with an array of todo items in JSON format.
- **Example:** `GET http://localhost:3000/todos`

#### 2. Retrieve a Specific Todo Item by ID
- **Endpoint:** `GET /todos/:id`
- **Description:** Returns a specific todo item identified by its ID.
- **Response:**
  - `200 OK` with the todo item in JSON format if found.
  - `404 Not Found` if the todo item is not found.
- **Example:** `GET http://localhost:3000/todos/123`

#### 3. Create a New Todo Item
- **Endpoint:** `POST /todos`
- **Description:** Creates a new todo item.
- **Request Body:** JSON object representing the todo item.
  - Example: `{ "title": "Buy groceries", "completed": false, "description": "I should buy groceries" }`
- **Response:**
  - `201 Created` with the ID of the created todo item in JSON format.
  - Example: `{ "id": 1 }`
- **Example:** `POST http://localhost:3000/todos`

#### 4. Update an Existing Todo Item by ID
- **Endpoint:** `PUT /todos/:id`
- **Description:** Updates an existing todo item identified by its ID.
- **Request Body:** JSON object representing the updated todo item.
  - Example: `{ "title": "Buy groceries", "completed": true }`
- **Response:**
  - `200 OK` if the todo item was found and updated.
  - `404 Not Found` if the todo item is not found.
- **Example:** `PUT http://localhost:3000/todos/123`

#### 5. Delete a Todo Item by ID
- **Endpoint:** `DELETE /todos/:id`
- **Description:** Deletes a todo item identified by its ID.
- **Response:**
  - `200 OK` if the todo item was found and deleted.
  - `404 Not Found` if the todo item is not found.
- **Example:** `DELETE http://localhost:3000/todos/123`

#### 6. Get Requests Count
- **Endpoint:** `GET /requestCount`
- **Description:** Get The Total Count Of request recieved by the app.
- **Response:**
  - `200 OK` with requests information in JSON format
  - `404 Not Found` if not found.
- **Example:** `GET http://localhost:3000/requestCount`

#### 7. Handle Undefined Routes
- **Response:**
  - `404 Not Found` for any route not defined in the server.

#### 8. User Sign Up
- **Endpoint:** `POST /users/signup`
- **Description:** Creates a new user account.
- **Request Body:**
  - `username`: String, required
  - `password`: String, required
- **Response:**
  - `200 OK` with a success message and user ID if account creation is successful.
  - `400 Bad Request` if the username already exists.
  - `500 Internal Server Error` if there's an error during account creation.

#### 9. User Sign In
- **Endpoint:** `POST /users/signin`
- **Description:** Authenticates an existing user with their username and password.
- **Request Body:**
  - `username`: String, required
  - `password`: String, required
- **Response:**
  - `200 OK` with a JWT token if authentication is successful.
  - `400 Bad Request` if the username or password is invalid.
  - `500 Internal Server Error` if there's an error during authentication.

#### 10. Update User
- **Endpoint:** `PUT /users/:id`
- **Description:** Updates information for an existing user.
- **Authentication:** Required (JWT)
- **Request Parameters:**
  - `id`: String, user ID
- **Request Body:**
  - `username`: String, optional
  - `password`: String, optional
- **Response:**
  - `200 OK` with a success message and user ID if update is successful.
  - `403 Forbidden` if trying to update another user's data.
  - `404 Not Found` if the user is not found.
  - `500 Internal Server Error` if there's an error during update.

#### 11. Delete User
- **Endpoint:** `DELETE /users/:id`
- **Description:** Deletes a user account and all associated todos.
- **Authentication:** Required (JWT)
- **Request Parameters:**
  - `id`: String, user ID
- **Response:**
  - `200 OK` with a success message and user ID if deletion is successful.
  - `403 Forbidden` if trying to delete another user's account.
  - `404 Not Found` if the user is not found.
  - `500 Internal Server Error` if there's an error during deletion.

#### 12. Error Test
- **Endpoint:** `GET /users/error`
- **Description:** Test route that throws an error.
- **Response:**
  - Throws a "User not found" error.

#### Testing the Server
- Run the following command in the terminal to test the server:
  ```
  npm run test-todoServer
  ```
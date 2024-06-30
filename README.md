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

### Built With
- **Node.js** - Runtime environment.
- **Express** - Web framework for building APIs.
- **Jest** - Testing framework for JavaScript.
# User Management System

## Overview
This project implements a user management system with features for creating, viewing, and managing user accounts. It uses Java Servlets and JSP for the backend, with Bootstrap and custom CSS for the frontend.

## Technical Stack
- Java 8+
- Servlet 4.0
- JSP/JSTL
- MySQL 8.0
- Bootstrap 5.1
- JUnit 5 for testing

## Setup Instructions
1. Clone the repository
2. Configure database.properties with your MySQL credentials
3. Run the database scripts in `src/main/resources/db/migration`
4. Build the project: `mvn clean install`
5. Deploy the WAR file to your application server

## Project Structure
- `src/main/java`: Java source files
- `src/main/webapp`: Web resources
- `src/test/java`: Unit tests
- `src/main/resources`: Configuration files

## Testing
Run tests using: `mvn test`

## API Documentation
### User Management API
- GET /users - List all users
- POST /users - Create new user
- GET /users/{id} - Get user details
- PUT /users/{id} - Update user
- DELETE /users/{id} - Delete user

## Security Considerations
- Passwords are hashed using BCrypt
- Input validation on all forms
- XSS protection through JSTL escaping
- CSRF protection implemented

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

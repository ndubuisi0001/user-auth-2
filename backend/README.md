# User Authentication and Authorization API
 A restful backend API built with Node.js, Express.js, Mysql, and Sequelize. It provides user registration, login, Jwt-based authorization, and role-based authorization for managing user accounts.
 ## Technologies used
 -node.js
 -express.js
 -mysql
 -sequelize ORM
 -bcrypt(password hashing)
 -json web token(jwt)
 -dotenv
 ## Installation and setup
 ### 1. clone the repository 
 -git clone
 -cd user_auth/backend
 ### 2. configure environment variables
 port=3000
 db_host=localhost
 db_name=user_auth_db
 ### 3. start server
 npm run dev
 ## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in and receive a JWT |

### User Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/me` | Get the logged-in user's profile |
| PATCH | `/api/users/me` | Update the logged-in user's profile |
| GET | `/api/users/admin/users` | Get all users (Admin only) |
| GET | `/api/users/admin/users/:id` | Get a user by ID (Admin only) |
| DELETE | `/api/users/admin/users/:id` | Delete a user (Admin only) |
## Authentication and Authorization

- Users must register before logging in.
- Passwords are hashed using bcrypt before being stored.
- Successful login returns a JWT token.
- Protected routes require a valid Bearer token.
- Users can view and update their own profiles.
- Admin-only routes require an authenticated account with the admin role.
- Regular users cannot promote themselves to admin.
- Password hashes are never returned in API responses.

## Error Handling

The API uses centralized error handling and appropriate HTTP status codes, including:

- 400 – Bad Request
- 401 – Unauthorized
- 403 – Forbidden
- 404 – Not Found
- 409 – Conflict
- 500 – Internal Server Error
## Testing

The API was tested using Postman/Thunder Client during development.

Tested features include:
- User registration and login.
- JWT authentication.
- Access to protected routes.
- Role-based authorization.
- Profile updates.
- Admin user management.
- Error responses for invalid requests.

## License

This project was created for learning and educational purposes.
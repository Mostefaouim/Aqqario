# Aqqario Backend API

A RESTful API backend for the Aqqario real estate platform built with Express.js and Supabase.

## Features

- 🏠 Property management (CRUD operations)
- 👤 User authentication and profile management
- 💌 Inquiry management
- ⭐ Favorites system
- 🔒 JWT-based authentication
- 📝 Request validation
- 🚀 Rate limiting
- 📷 File upload support
- 🔍 Advanced filtering and search

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Supabase account and project

### Installation

1. Clone the repository and navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Update the `.env` file with your Supabase credentials and other configuration.

5. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Logout user

### Properties

- `GET /api/properties` - Get all properties (with filtering)
- `GET /api/properties/:id` - Get a specific property
- `POST /api/properties` - Create a new property (authenticated)
- `PUT /api/properties/:id` - Update a property (authenticated)
- `DELETE /api/properties/:id` - Delete a property (authenticated)

### Profiles

- `GET /api/profiles/me` - Get current user profile
- `PUT /api/profiles/me` - Update current user profile
- `GET /api/profiles/:id` - Get user profile by ID

### Inquiries

- `GET /api/inquiries` - Get user's inquiries
- `POST /api/inquiries` - Create a new inquiry
- `PUT /api/inquiries/:id` - Update inquiry status
- `DELETE /api/inquiries/:id` - Delete an inquiry

### Favorites

- `GET /api/favorites` - Get user's favorite properties
- `POST /api/favorites` - Add property to favorites
- `DELETE /api/favorites/:propertyId` - Remove property from favorites

### Upload

- `POST /api/upload` - Upload property images

## Environment Variables

See `.env.example` for all required environment variables.

## Project Structure

```
src/
├── controllers/     # Route handlers
├── middleware/      # Custom middleware
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Utility functions
├── validators/      # Request validation schemas
└── index.js         # Application entry point
```

## Development

- `npm run dev` - Start development server with hot reload
- `npm test` - Run tests
- `npm start` - Start production server

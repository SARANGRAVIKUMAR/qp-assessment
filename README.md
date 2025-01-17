# Question Pro API

## Project Structure

```
src/
├── config/         # Configuration files (database, passport)
├── controllers/    # Request handlers
├── entities/       # Database entities
├── helpers/        # Utility functions and constants
├── interfaces/     # TypeScript interfaces
├── middleware/     # Custom middleware (auth, etc.)
├── routes/         # API routes
└── services/       # Business logic
```

## Prerequisites

- Node.js
- MySQL
- TypeScript

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

To run the project in development mode with hot reloading:

```bash
npm run dev
```

For production build:

```bash
npm run build
npm start
```

## Running the Application with Docker

### Build the Docker Image
```bash
docker-compose build
```

### Run the Application
```bash
docker-compose up
```

### Accessing the Application
- The application will be accessible at `http://localhost:3000`.

### Stopping the Application
```bash
docker-compose down
```

Api Documentation:
```https://documenter.getpostman.com/view/23488853/2sAYQajqPy```

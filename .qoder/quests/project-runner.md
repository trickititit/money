# Money Portfolio Management Application - Project Runner Guide

## Overview

This guide provides step-by-step instructions to set up, configure, and run the Money Portfolio Management Application. The application consists of a .NET 9.0 backend API and a React TypeScript frontend with Vite.

## Prerequisites

### Required Software
- **.NET SDK 9.0** or higher
- **Node.js** (v18+ recommended)
- **npm** (comes with Node.js)
- **SQL Server LocalDB** (included with Visual Studio) or SQL Server Express
- **Git** (for version control)

### Optional Tools
- **Visual Studio 2022** or **Visual Studio Code** with C# extension
- **Postman** or similar tool for API testing
- **SQL Server Management Studio** (SSMS) for database management

## Quick Start

### 1. Clone and Navigate to Project
```bash
git clone <repository-url>
cd money
```

### 2. Backend Setup (.NET API)

#### Install Dependencies
```bash
cd backend
dotnet restore
```

#### Configure Database Connection
The application is configured to use SQL Server LocalDB by default. No additional setup required for development.

**Default Connection String:**
```
Server=(localdb)\mssqllocaldb;Database=PortfolioManagementDb;Trusted_Connection=true;MultipleActiveResultSets=true
```

#### Run Backend
```bash
dotnet run
```

The backend API will be available at:
- **HTTP**: `http://localhost:5000`
- **HTTPS**: `https://localhost:5001`
- **Swagger UI**: `https://localhost:5001/swagger`

### 3. Frontend Setup (React + Vite)

#### Open New Terminal and Navigate to Frontend
```bash
cd frontend
```

#### Install Dependencies
```bash
npm install
```

#### Run Frontend
```bash
npm run dev
```

The frontend will be available at:
- **Local**: `http://localhost:5173`

## Detailed Setup Instructions

### Backend Configuration

#### Database Setup
1. **Automatic Database Creation**: The application automatically creates the database on first run
2. **Manual Database Creation** (if needed):
   ```bash
   dotnet ef database update
   ```

#### JWT Configuration
The application uses JWT authentication. Default settings in `appsettings.json`:
- **Secret Key**: Configured for development (change in production)
- **Token Expiration**: 60 minutes
- **Refresh Token Expiration**: 7 days

#### CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:3000` (React default)
- `http://localhost:5173` (Vite default)

### Frontend Configuration

#### Environment Variables
Create `.env.local` file in the frontend directory (optional):
```env
VITE_API_BASE_URL=https://localhost:5001
```

#### Build for Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

## Development Workflow

### 1. Start Backend First
```bash
# Terminal 1 - Backend
cd backend
dotnet run
```

### 2. Start Frontend Second
```bash
# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 3. Access Application
- **Frontend**: `http://localhost:5173`
- **API**: `https://localhost:5001`
- **API Documentation**: `https://localhost:5001/swagger`

## Architecture Overview

### Backend Structure
```
backend/
├── Controllers/           # API Controllers
│   └── AuthController.cs  # Authentication endpoints
├── PortfolioManagement.Core/
│   ├── DTOs/             # Data Transfer Objects
│   ├── Entities/         # Domain Models
│   └── Enums/           # Enumerations
├── PortfolioManagement.Infrastructure/
│   ├── Data/            # Database Context
│   └── Services/        # Business Logic Services
├── Program.cs           # Application entry point
└── appsettings.json     # Configuration
```

### Frontend Structure
```
frontend/src/
├── components/          # React Components
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Dashboard components
│   └── Layout/         # Layout components
├── store/              # Redux Store
│   ├── api/           # RTK Query APIs
│   └── slices/        # Redux Slices
├── App.tsx            # Main App component
└── main.tsx           # Application entry point
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout

### Portfolio Management
- `GET /api/portfolios` - Get user portfolios
- `POST /api/portfolios` - Create new portfolio
- `PUT /api/portfolios/{id}` - Update portfolio
- `DELETE /api/portfolios/{id}` - Delete portfolio

## Technology Stack

### Backend Technologies
- **.NET 9.0** - Main framework
- **ASP.NET Core Web API** - REST API framework
- **Entity Framework Core** - ORM for database operations
- **JWT Bearer Authentication** - Token-based authentication
- **SignalR** - Real-time communication
- **SQL Server LocalDB** - Development database

### Frontend Technologies
- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Accessible UI components

## Troubleshooting

### Common Issues

#### Backend Issues
1. **Database Connection Fails**
   - Ensure SQL Server LocalDB is installed
   - Check connection string in `appsettings.json`
   - Try running `dotnet ef database update`

2. **Port Already in Use**
   - Change ports in `Properties/launchSettings.json`
   - Or kill existing processes using the ports

3. **JWT Secret Key Error**
   - Ensure JWT secret key is at least 32 characters
   - Check `appsettings.json` configuration

#### Frontend Issues
1. **Dependencies Installation Fails**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and run `npm install` again

2. **API Connection Issues**
   - Verify backend is running on correct ports
   - Check CORS configuration in backend
   - Verify API base URL in frontend configuration

3. **Build Errors**
   - Check TypeScript errors: `npm run lint`
   - Ensure all dependencies are installed

### Performance Tips
- Use `dotnet run --configuration Release` for better backend performance
- Use `npm run build && npm run preview` to test production frontend build
- Monitor database performance with SQL Server Profiler

## Testing

### Backend Testing
```bash
cd backend
dotnet test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### API Testing with Swagger
1. Navigate to `https://localhost:5001/swagger`
2. Test authentication endpoints
3. Use JWT tokens for protected endpoints

## Security Considerations

### Development Environment
- Default JWT secret is for development only
- CORS is configured for localhost origins
- Database uses integrated security

### Production Deployment
- Change JWT secret key to a secure random string
- Configure proper CORS origins
- Use secure connection strings
- Enable HTTPS enforcement
- Consider using environment variables for sensitive data

## Additional Resources

### Documentation
- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/)
- [React Documentation](https://reactjs.org/docs/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)

### Useful Commands
```bash
# Backend
dotnet build                    # Build backend
dotnet clean                    # Clean build artifacts
dotnet ef migrations add <name> # Add new migration
dotnet ef database drop         # Drop database

# Frontend  
npm run build                   # Build for production
npm run lint                    # Run ESLint
npm run preview                # Preview production build
```
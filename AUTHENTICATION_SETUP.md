# Authentication System Setup

## Environment Configuration

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory with the following content:

```env
VITE_API_URL=http://localhost:3001/api
```

### Backend Environment Variables

The backend uses the following environment variables (configured in `server/config.js`):

```javascript
DATABASE_URL="postgresql://postgres:password@localhost:5432/homebonzenga"
JWT_SECRET="your-super-secret-jwt-key-for-development"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"
PORT="3001"
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"
```

## Development Setup

### 1. Start the Backend Server

```bash
cd server
npm install
npm run dev
```

The server will start on `http://localhost:3001`

### 2. Start the Frontend Development Server

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

## Authentication Features

### Test Credentials

#### Admin (Static Account)
- **Email**: `admin@homebonzenga.com`
- **Password**: `Admin@123`
- **Role**: ADMIN
- **Dashboard**: `/admin/dashboard`

#### Manager (Static Account)
- **Email**: `manager@homebonzenga.com`
- **Password**: `Manager@123`
- **Role**: MANAGER
- **Dashboard**: `/admin/dashboard`

### User Registration

You can register new accounts for the following roles:
- **Customer**: Can book services and manage appointments
- **Vendor**: Can manage shop, services, and bookings
- **Beautician**: Can view assigned bookings and manage availability

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

#### Role-Based Routes
- `GET /api/customer/*` - Customer-specific endpoints
- `GET /api/vendor/*` - Vendor-specific endpoints
- `GET /api/beautician/*` - Beautician-specific endpoints
- `GET /api/admin/*` - Admin-specific endpoints

## Testing

### Authentication Test Page

Visit `/auth-test` to test the authentication system:
- View current authentication status
- Test role permissions
- Access role-specific dashboards
- Test login/logout functionality

### Error Handling

The system handles the following scenarios gracefully:
- **Server Unreachable**: Shows "Server is not reachable, please try again later"
- **Invalid Credentials**: Shows "Invalid credentials. Please check your email and password."
- **Token Expired**: Automatically refreshes tokens
- **Network Errors**: Provides user-friendly error messages

## Security Features

- **JWT Tokens**: Access tokens (7 days) + Refresh tokens (30 days)
- **Password Hashing**: bcrypt with 12 rounds
- **Role-Based Access Control**: Strict middleware protection
- **CORS Configuration**: Properly configured for development
- **Input Validation**: Zod schemas for all endpoints

## Troubleshooting

### Common Issues

1. **"Failed to fetch" errors**
   - Ensure the backend server is running on port 3001
   - Check CORS configuration
   - Verify the VITE_API_URL environment variable

2. **Authentication not working**
   - Check browser console for errors
   - Verify JWT tokens in localStorage
   - Test with the `/auth-test` page

3. **Role-based access issues**
   - Ensure proper role assignment during registration
   - Check middleware configuration
   - Verify protected route components

### Development Tips

- Use the browser's Network tab to monitor API requests
- Check localStorage for stored tokens
- Use the `/auth-test` page for debugging authentication issues
- Monitor server logs for backend errors

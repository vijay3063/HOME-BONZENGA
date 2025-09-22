# Static JSON Login + SQL Dashboard Setup

This project implements a hybrid authentication system where login uses static JSON credentials but all dashboard data comes from a SQL database.

## 🚀 Quick Start

### Option 1: Use the Start Scripts (Recommended for Windows)

**Using Batch File:**
```cmd
start-servers.bat
```

**Using PowerShell:**
```powershell
.\start-servers.ps1
```

### Option 2: Manual Start

**1. Start the Backend Server:**
```bash
cd server
npm install
npm run dev
```

**2. Start the Frontend Server:**
```bash
cd frontend
npm install
npm run dev
```

**3. Seed the Database (Optional):**
```bash
cd server
npm run seed
```

### Server URLs
- **Backend API:** http://localhost:3001
- **Frontend App:** http://localhost:3003

## 🔐 Static Login Credentials

The following accounts are available for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@homebonzenga.com | admin123 |
| Manager | manager@homebonzenga.com | manager123 |
| Vendor | vendor@homebonzenga.com | vendor123 |
| Beautician | beautician@homebonzenga.com | beautician123 |
| User | user@homebonzenga.com | user123 |

## 📊 Dashboard Features

### User Dashboard
- **Stats Cards**: Active Bookings, Completed Bookings, Pending Payments, Total Bookings
- **Recent Bookings**: List of recent bookings with service details
- **Quick Actions**: Search Services, View Profile, View All Bookings

### Admin Dashboard
- **Stats Cards**: Total Users, Total Vendors, Total Beauticians, Total Revenue
- **Quick Actions**: Manage Users, Manage Vendors, View Analytics, Platform Settings
- **System Health**: Database, API Services, Payment Gateway status

### Vendor Dashboard
- **Stats Cards**: New Bookings, Completed Services, Monthly Revenue, Total Services
- **Services Management**: CRUD operations for services
- **Appointments**: List of appointments with status

### Beautician Dashboard
- **Stats Cards**: Upcoming Appointments, Completed Services, Earnings Summary
- **Calendar**: Assigned appointments
- **Booking Table**: Bookings assigned to beautician

### Manager Dashboard
- **Stats Cards**: Pending Vendor Applications, Pending Beautician Applications, Total Active Vendors, Appointments Overview
- **Approval Requests**: Approve/Reject vendors and beauticians
- **Notifications**: New applications

## 🗄️ Database Schema

The system uses SQLite with Prisma ORM. Key tables include:

- `users` - User accounts with roles
- `vendors` - Vendor/salon information
- `services` - Services offered by vendors
- `bookings` - Customer bookings
- `payments` - Payment transactions
- `addresses` - User addresses

## 🔧 API Endpoints

### Dashboard APIs
- `GET /api/dashboard/user/stats` - User dashboard statistics
- `GET /api/dashboard/user/bookings` - User bookings
- `GET /api/dashboard/vendor/stats` - Vendor dashboard statistics
- `GET /api/dashboard/vendor/services` - Vendor services
- `GET /api/dashboard/admin/stats` - Admin dashboard statistics
- `GET /api/dashboard/manager/pending-approvals` - Pending approvals

## 🌐 Features

- **Static JSON Login**: Login credentials stored in `frontend/src/data/users.json`
- **Dynamic SQL Dashboards**: All dashboard data fetched from SQL database
- **Role-based Access**: Different dashboards for each user role
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Multi-language Support**: English/French toggle
- **Real-time Data**: Dashboard data updates dynamically

## 🔄 Future Migration

The system is designed for easy migration from static login to full SQL authentication:

1. Replace static login logic in `AuthContext.tsx`
2. Add user registration/login endpoints
3. Update frontend to use new authentication flow
4. All dashboard APIs remain unchanged

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── data/users.json          # Static login credentials
│   │   ├── contexts/AuthContext.tsx # Authentication logic
│   │   └── pages/
│   │       ├── customer/Dashboard.tsx
│   │       ├── admin/Dashboard.tsx
│   │       ├── vendor/Dashboard.tsx
│   │       ├── beautician/Dashboard.tsx
│   │       └── manager/Dashboard.tsx
├── server/
│   ├── src/
│   │   ├── routes/dashboard.ts      # Dashboard API endpoints
│   │   ├── scripts/seed-dashboard-data.ts # Database seeding
│   │   └── index.ts                 # Main server file
│   └── prisma/schema.prisma         # Database schema
```

## 🐛 Troubleshooting

### Port Issues
- **Port 3000 in use:** Frontend now uses port 3003 by default
- **Port 3001 in use:** Backend server port conflict - check for other Node.js processes
- **Port 3003 in use:** Frontend server port conflict - check for other Node.js processes
- **PowerShell errors:** Use the provided `.bat` or `.ps1` scripts instead of `&&` commands

### Server Issues
- Ensure port 3001 is available for backend
- Ensure port 3003 is available for frontend
- Check database connection in server logs
- Run `npm run seed` to populate demo data

### Frontend Issues
- Ensure backend server is running on port 3001
- Check browser console for API errors
- Verify static login credentials in `users.json`
- Clear browser cache if seeing old content

### Database Issues
- Run `npx prisma migrate dev` to apply schema changes
- Run `npx prisma generate` to update Prisma client
- Check `server/prisma/dev.db` exists

### Windows-Specific Issues
- Use `start-servers.bat` or `start-servers.ps1` for easy server startup
- If PowerShell execution is blocked, run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

## 🎯 Testing

1. Start both server and frontend
2. Navigate to the login page
3. Use any of the static credentials to login
4. Verify dashboard data loads from SQL database
5. Test different user roles and their respective dashboards

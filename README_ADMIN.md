# Admin User Setup Guide

## How to Create an Admin User

There are **no default admin credentials**. You need to create an admin user manually.

### Method 1: Using the Script (Recommended)

1. **Set environment variables** (optional, defaults provided):
   ```bash
   # In your .env file or as environment variables
   ADMIN_EMAIL=admin@fintracker.com
   ADMIN_PASSWORD=admin123
   ADMIN_NAME=Admin User
   ```

2. **Run the create admin script**:
   ```bash
   cd backend
   npm run create-admin
   ```

3. **Default credentials** (if not set in .env):
   - **Email**: `admin@fintracker.com`
   - **Password**: `admin123`

### Method 2: Manual MongoDB Update

If you prefer to create an admin user manually:

1. **Register a regular user** through the frontend registration page
2. **Connect to your MongoDB database**
3. **Update the user's role**:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

### Method 3: Using MongoDB Compass or Atlas

1. Find your user document in the `users` collection
2. Change the `role` field from `"user"` to `"admin"`

## Admin Login

1. Go to: `http://localhost:3000/admin/login`
2. Enter your admin email and password
3. You'll be redirected to `/admin/dashboard`

## Security Notes

⚠️ **IMPORTANT**: 
- Change the default admin password after first login
- Use a strong password in production
- Don't commit admin credentials to version control
- Consider using environment variables for admin credentials

## Troubleshooting

**"Access denied. Admin credentials required."**
- The user you're trying to login with doesn't have `role: "admin"` in the database
- Run the create-admin script or manually update the user's role

**"User already exists"**
- If the email already exists as a regular user, the script will update it to admin
- If it's already an admin, the script will inform you


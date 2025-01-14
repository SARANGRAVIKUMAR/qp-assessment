export const Constants = {
    // Roles
    ADMIN_ROLE: 1,
    CLIENT_ROLE: 0,

    // JWT
    JWT_SECRET: process.env.JWT_SECRET || "",

    // Auth Messages
    UNAUTHORIZED_ACCESS: 'UnAuthorized Access',
    INVALID_TOKEN: 'Invalid or expired token',
    ADMIN_ACCESS_DENIED: 'Access denied. Admin privileges required.',
    UNAUTHORIZED: 'Unauthorized',
    INVALID_CREDENTIALS: 'Invalid credentials',

    // User Operation Messages
    ERROR_CREATING_USER: 'Error creating user',
    ERROR_UPDATING_USER: 'Error updating user',
    ERROR_DELETING_USER: 'Error deleting user',
    ERROR_FETCHING_USERS: 'Error fetching users',
    ERROR_DURING_LOGIN: 'Error during login',
    USER_NOT_FOUND: 'User not found',

    // Server Error Messages
    INTERNAL_SERVER_ERROR: 'Something went wrong!'
};
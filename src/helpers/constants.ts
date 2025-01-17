export const Constants = {
    // Roles
    ADMIN_ROLE: 1,
    CLIENT_ROLE: 0,

    // Constant Values
    PAGE_SIZE: 10,
    DEFAULT_PAGE: 1,

    // Status Codes
    SUCCESS_CODE: 200,
    SERVER_ERROR_CODE: 500,
    ERROR_CODE: 400,
    RESOURCE_CREATED_CODE: 201,
    UNAUTHORIZED_CODE: 401,


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
    INTERNAL_SERVER_ERROR: 'Something went wrong!',

    // Grocery Operation Messages

    ERROR_FETCHING_GROCERIES: 'Error fetching groceries',
    SUCCESS_CREATING_ORDER: 'Order created successfully',
    ERROR_CREATING_ORDER: 'Error creating order',
    ERRORFETCHING_ORDER_HISTORY: 'Error fetching order history',
    ERROR_INSUFFICIENT_QUANTITY: 'Insufficient quantity for grocery item',
    ERROR_FETCHING_GROCERY: "Error fetching grocery",
    ERROR_CREATING_GROCERY: 'Error creating grocery',
    ERROR_UPDATING_GROCERY: 'Error updating grocery',
    ERROR_DELETING_GROCERY: 'Error deleting grocery',
    GROCERY_NOT_FOUND: 'Grocery not found',

    SUCCESS_CREATING_GROCERY: 'Grocery created successfully',
    SUCCESS_UPDATING_GROCERY: 'Grocery updated successfully',
    SUCCESS_DELETING_GROCERY: 'Grocery deleted successfully',
    // Common Messages
    SUCCESS: 'Success',
    ERROR: 'Error',
};
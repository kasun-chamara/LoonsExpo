// Mock data for the application
export const mockUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
    },
]

export const mockInventory = [
    {
        id: 1,
        name: 'Laptop',
        category: 'Electronics',
        quantity: 25,
        price: 999.99,
        status: 'In Stock',
    },
    {
        id: 2,
        name: 'Mouse',
        category: 'Electronics',
        quantity: 150,
        price: 29.99,
        status: 'In Stock',
    },
]

export const mockSales = [
    {
        month: 'January',
        revenue: 45000,
        orders: 125,
        avgOrder: 360,
        growth: '+12%',
    },
    {
        month: 'February',
        revenue: 52000,
        orders: 145,
        avgOrder: 358,
        growth: '+15%',
    },
]

// Initialize any global variables or configurations
window.dashboardVariables = {
    appName: 'Loons Admin App',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
}

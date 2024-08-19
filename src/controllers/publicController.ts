import express, { Request, Response } from "express";

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    const hotelName = "Hotel Miranda";
    const endpoints = [
        // Rooms endpoints
        { path: "/rooms", method: "GET", description: "List all rooms" },
        { path: "/rooms", method: "POST", description: "Create a new room" },
        { path: "/rooms/:id", method: "GET", description: "Get a room by ID" },
        { path: "/rooms/:id", method: "PATCH", description: "Update a room by ID" },
        { path: "/rooms/:id", method: "DELETE", description: "Delete a room by ID" },
        
        // Bookings endpoints
        { path: "/bookings", method: "GET", description: "List all bookings" },
        { path: "/bookings", method: "POST", description: "Create a new booking" },
        { path: "/bookings/:id", method: "GET", description: "Get a booking by ID" },
        { path: "/bookings/:id", method: "PATCH", description: "Update a booking by ID" },
        { path: "/bookings/:id", method: "DELETE", description: "Delete a booking by ID" },
        
        // Users endpoints
        { path: "/users", method: "GET", description: "List all users" },
        { path: "/users", method: "POST", description: "Create a new user" },
        { path: "/users/:id", method: "GET", description: "Get a user by ID" },
        { path: "/users/:id", method: "PATCH", description: "Update a user by ID" },
        { path: "/users/:id", method: "DELETE", description: "Delete a user by ID" },
        
        // Contacts endpoints
        { path: "/contacts", method: "GET", description: "List all contacts" },
        { path: "/contacts", method: "POST", description: "Create a new contact" },
        { path: "/contacts/:id", method: "GET", description: "Get a contact by ID" },
        { path: "/contacts/:id", method: "PATCH", description: "Update a contact by ID" },
        { path: "/contacts/:id", method: "DELETE", description: "Delete a contact by ID" },

        // Auth endpoint
        { path: "/login", method: "POST", description: "Login to get a token" }
    ];

    res.json({
        hotelName,
        endpoints
    });
});

export default router;
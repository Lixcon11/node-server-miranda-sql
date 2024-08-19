import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';
import "dotenv/config";

describe('Hotel API', () => {
    let token: string;

    beforeAll(async () => {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not defined');
        }
        mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.error('MongoDB connection error:', err));
            
        const response = await request(app).post('/login').send({ email: 'kdymond3@usa.gov', password: 'test' });
        
        expect(response.status).toBe(200);
        token = response.body.token;
        expect(token).toBeDefined();
    });

    it('Should return 401 for unauthenticated request to /rooms', async () => {
        const response = await request(app).get('/rooms');
        expect(response.status).toBe(401);
    });

    it('Should return 200 and list of bookings for authenticated request to /bookings', async () => {
        const response = await request(app).get('/bookings').set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.bookings).toBeDefined();
    });

    it('Should return 200 and list of rooms for authenticated request to /rooms', async () => {
        const response = await request(app).get('/rooms').set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.rooms).toBeDefined();
    });

    it('Should return 200 and list of users for authenticated request to /users', async () => {
        const response = await request(app).get('/users').set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.users).toBeDefined();
    });

    it('Should return 200 and list of contacts for authenticated request to /contacts', async () => {
        const response = await request(app).get('/contacts').set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.contacts).toBeDefined();
    });
    /*
    it('Should return 200 and booking details for authenticated request to /bookings/:id', async () => {
        const bookingId = 15;
        const specialRequest = "Would like a room with a balcony and a view of the city skyline. Need extra hangers in the closet.";
        const response = await request(app).get(`/bookings/${bookingId}`).set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.booking).toBeDefined();
        expect(response.body.booking.id).toBe(bookingId);
        expect(response.body.booking.specialRequest).toBe(specialRequest);
    });

    it('Should return 200 and room details for authenticated request to /rooms/:id', async () => {
        const roomId = 9;
        const description = "Compact single bed room with modern amenities.";
        const response = await request(app).get(`/rooms/${roomId}`).set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.room).toBeDefined();
        expect(response.body.room.id).toBe(roomId);
        expect(response.body.room.description).toBe(description);
    });

    it('Should return 200 and user details for authenticated request to /users/:id', async () => {
        const userId = 6;
        const name = "Catina McGookin";
        const response = await request(app).get(`/users/${userId}`).set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.user).toBeDefined();
        expect(response.body.user.id).toBe(userId);
        expect(response.body.user.name).toBe(name);
    });

    it('Should return 200 and contact details for authenticated request to /contacts/:id', async () => {
        const contactId = 13;
        const email = "chris.thompson@example.com";
        const response = await request(app).get(`/contacts/${contactId}`).set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.contact).toBeDefined();
        expect(response.body.contact.id).toBe(contactId);
        expect(response.body.contact.email).toBe(email);
    });
    */

    afterAll(() => {
        mongoose.connection.close();
    });
});
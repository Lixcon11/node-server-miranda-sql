import "dotenv/config";
import express, {Request, Response, NextFunction} from "express"
import loginController from "./controllers/loginController";
import { authenticateToken } from "./middleware/auth";
import publicController from "./controllers/publicController";
import { roomsController } from "./controllers/roomsController";
import { bookingsController } from "./controllers/bookingsController";
import { usersController } from "./controllers/usersController";
import { contactsController } from "./controllers/contactsController";
//import mongoose from 'mongoose';
import cors from "cors"
import mysql from 'mysql2/promise';

const app = express()

app.use(cors())

app.use(express.json())
/*
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not defined');
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
*/

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection()
    .then(() => console.log('MySQL connected'))
    .catch(err => console.error('MySQL connection error:', err));

app.use("/login", loginController);
app.use("/", publicController)

app.use(authenticateToken);

roomsController();
bookingsController();
usersController();
contactsController()

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    return res.status(500).json({error: true, message: "Application error"})
})

export { app, db }
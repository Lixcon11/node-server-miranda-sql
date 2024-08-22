import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from "../models/User"

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.TOKEN_SECRET as string,
            { expiresIn: '1h' } 
        );

        return res.json({ token, id: user.id, email: user.email, name: user.name, photo: user.photo });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
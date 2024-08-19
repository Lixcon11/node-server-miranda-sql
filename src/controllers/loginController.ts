import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from "../models/userSchema";

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
        return res.status(400).json({ error: "Data invalid" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: "Data invalid" });
    }
    
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.TOKEN_SECRET as string);
    return res.json({ token, id: user._id, email: user.email, name: user.name, photo: user.photo });
});

export default router;
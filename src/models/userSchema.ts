import { Schema, model } from 'mongoose';
import { UserState } from '../types/DataState';

const userSchema = new Schema<UserState>({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    job: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    password: { type: String, required: true }
},
{
    versionKey: false
});

const User = model('User', userSchema);

export { User }
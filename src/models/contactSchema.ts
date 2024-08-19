import { Schema, model } from 'mongoose';
import { ContactState } from '../types/DataState';

const contactSchema = new Schema<ContactState>({
    name: { type: String, required: true },
    date: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    comment: { type: String, required: true },
    status: { type: String, required: true }
},
{
    versionKey: false
})

const Contact = model('Contact', contactSchema);

export { Contact }
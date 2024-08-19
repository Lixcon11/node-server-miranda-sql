import { Schema, model } from 'mongoose';
import { RoomState } from '../types/DataState';

const roomSchema = new Schema<RoomState>({
    roomNumber: { type: String, required: true },
    description: { type: String, required: true },
    photos: { type: [String], required: true },
    roomType: { type: String, required: true },
    amenities: { type: [String], required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    status: { type: String, required: true }
},
{
    versionKey: false
});

const Room = model('Room', roomSchema);

export { Room }
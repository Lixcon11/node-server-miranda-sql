import "dotenv/config";
import mongoose, { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { User } from './models/userSchema';
import { Room } from './models/roomSchema';
import { Booking } from './models/bookingSchema';
import { Contact } from './models/contactSchema';
import bcrypt from 'bcryptjs';

const seed = async () => {
    
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI environment variable is not defined');
    }
    
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
    


    for (let i = 0; i < 10; i++) {
        const user = new User({
            _id: await generateNewId(User),
            name: faker.person.fullName(),
            photo: faker.image.avatar(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            date: faker.date.past().toISOString(),
            job: faker.person.jobTitle(),
            description: faker.lorem.sentence(),
            status: faker.helpers.arrayElement(["Active", "Inactive"]),
            password: await bcrypt.hash(faker.internet.password(), 10)
        });
        user.save()

        const room = new Room({
            _id: await generateNewId(Room),
            roomNumber: "Room " + faker.number.int({min:1, max:765 }),
            description: faker.lorem.sentence(),
            photos: [faker.image.avatar(), faker.image.avatar()],
            roomType: faker.helpers.arrayElement(["Single Bed", "Double Bed", "Double Superior", "Suite"]),
            amenities: faker.helpers.arrayElements(["AC", "Breakfast", "Cleaning", "Grocery", "Shop Near", "Wifi", "Kitchen", "Shower", "Single Bed", "Towels"], 3),
            price: faker.number.int({min:300, max:1000 }),
            discount: faker.number.int({min:0, max:75 }),
            status: faker.helpers.arrayElement(["Available", "Booked"])
        });
        room.save()

        const booking = new Booking({
            _id: await generateNewId(Booking),
            name: faker.person.fullName(),
            orderDate: faker.date.past().toISOString(),
            checkInDate: faker.date.future().toISOString(),
            checkOutDate: faker.date.future().toISOString(),
            specialRequest: faker.lorem.sentence(),
            room: room,
            status: faker.helpers.arrayElement(["Check In", "Check Out", "In Progress"])
        });
        booking.save()

        const contact = new Contact({
            _id: await generateNewId(Contact),
            name: faker.person.fullName(),
            date: faker.date.past().toISOString(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            subject: faker.lorem.words(),
            comment: faker.lorem.sentences(),
            status: faker.helpers.arrayElement(["Published", "Archived"])
        });
        contact.save()

    }

    console.log('Fake data inserted');
    //await mongoose.connection.close();
};


const generateNewId = async <T>(model: Model<T>): Promise<number> => {
    const usedIds = await model.find({}, '_id').exec();
    const usedIdSet = new Set(usedIds.map(doc => doc._id));

    let newId = 1;
    while (usedIdSet.has(newId)) {
        newId++;
    }
    return newId;
}

seed().catch(err => console.error(err));
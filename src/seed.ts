import 'dotenv/config';
import { Sequelize } from 'sequelize';
import { sequelize } from './database';
import { faker } from '@faker-js/faker';
import { User } from './models/User';
import { Room } from './models/Room';
import { Booking } from './models/Booking';
import { Contact } from './models/Contact';
import bcrypt from 'bcryptjs';

const createDatabaseIfNotExists = async (dbName: string) => {
  const tempSequelize = new Sequelize('', process.env.DB_USER ? process.env.DB_USER: "", process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  });

  await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  await tempSequelize.close();
};

const seed = async () => {
  try {
    // Create the database if it doesn't exist
    await createDatabaseIfNotExists(process.env.DB_NAME || 'hotel_db');

    // Connect to the newly created or existing database
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Synchronize all models with the database (this creates the tables)
    await sequelize.sync({ force: true });

    for (let i = 0; i < 10; i++) {
      const user = await User.create({
        name: faker.person.fullName(),
        photo: faker.image.avatar(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        date: faker.date.past().toISOString(),
        job: faker.person.jobTitle(),
        description: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(['Active', 'Inactive']),
        password: await bcrypt.hash(faker.internet.password(), 10),
      });

      const room = await Room.create({
        roomNumber: `Room ${faker.number.int({ min: 1, max: 765 })}`,
        description: faker.lorem.sentence(),
        photos: [faker.image.avatar(), faker.image.avatar()],
        roomType: faker.helpers.arrayElement(['Single Bed', 'Double Bed', 'Double Superior', 'Suite']),
        amenities: faker.helpers.arrayElements(['AC', 'Breakfast', 'Cleaning', 'Grocery', 'Shop Near', 'Wifi', 'Kitchen', 'Shower', 'Single Bed', 'Towels'], 3),
        price: faker.number.int({ min: 300, max: 1000 }),
        discount: faker.number.int({ min: 0, max: 75 }),
        status: faker.helpers.arrayElement(['Available', 'Booked']),
      });

      await Booking.create({
        name: faker.person.fullName(),
        orderDate: faker.date.past().toISOString(),
        checkInDate: faker.date.future().toISOString(),
        checkOutDate: faker.date.future().toISOString(),
        specialRequest: faker.lorem.sentence(),
        roomId: room.id,
        status: faker.helpers.arrayElement(['Check In', 'Check Out', 'In Progress']),
      });

      await Contact.create({
        name: faker.person.fullName(),
        date: faker.date.past().toISOString(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        subject: faker.lorem.words(),
        comment: faker.lorem.sentences(),
        status: faker.helpers.arrayElement(['Published', 'Archived']),
      });
    }

    console.log('Fake data inserted');
  } catch (error) {
    console.error('Error inserting fake data:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
};

seed();
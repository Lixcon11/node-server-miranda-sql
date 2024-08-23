import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { Room } from './Room'; // Assuming a relationship with Room

interface BookingAttributes {
    id: number;
    name: string;
    orderDate: string;
    checkInDate: string;
    checkOutDate: string;
    specialRequest: string;
    roomId: number;
    status: 'Check In' | 'Check Out' | 'In Progress';
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id'> {}

class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
    public id!: number;
    public name!: string;
    public orderDate!: string;
    public checkInDate!: string;
    public checkOutDate!: string;
    public specialRequest!: string;
    public roomId!: number;
    public status!: 'Check In' | 'Check Out' | 'In Progress';

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Booking.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        checkInDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        checkOutDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        specialRequest: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        roomId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Room,
                key: 'id',
            },
        },
        status: {
            type: DataTypes.ENUM('Check In', 'Check Out', 'In Progress'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'bookings',
        timestamps: true,
    }
);

Room.hasMany(Booking, { foreignKey: 'roomId' });
Booking.belongsTo(Room, { foreignKey: 'roomId' });

export { Booking };
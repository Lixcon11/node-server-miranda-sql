import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface RoomAttributes {
    id: number;
    roomNumber: string;
    description: string;
    photos: string[];
    roomType: 'Single Bed' | 'Double Bed' | 'Double Superior' | 'Suite';
    amenities: string[];
    price: number;
    discount: number;
    status: 'Available' | 'Booked';
}

interface RoomCreationAttributes extends Optional<RoomAttributes, 'id'> {}

class Room extends Model<RoomAttributes, RoomCreationAttributes> implements RoomAttributes {
    public id!: number;
    public roomNumber!: string;
    public description!: string;
    public photos!: string[];
    public roomType!: 'Single Bed' | 'Double Bed' | 'Double Superior' | 'Suite';
    public amenities!: string[];
    public price!: number;
    public discount!: number;
    public status!: 'Available' | 'Booked';

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Room.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        roomNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        photos: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        roomType: {
            type: DataTypes.ENUM('Single Bed', 'Double Bed', 'Double Superior', 'Suite'),
            allowNull: false,
        },
        amenities: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Available', 'Booked'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'rooms',
        timestamps: true,
    }
);

export { Room };
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { BookingState, RoomState } from '../types/DataState';

interface BookingAttributes extends BookingState {
  id: number;
  room: RoomState;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id'> {}

export class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  public id!: number;
  public name!: string;
  public orderDate!: string;
  public checkInDate!: string;
  public checkOutDate!: string;
  public specialRequest!: string;
  public room!: RoomState;
  public status!: BookingState['status'];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkInDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    specialRequest: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    room: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'bookings',
  }
);
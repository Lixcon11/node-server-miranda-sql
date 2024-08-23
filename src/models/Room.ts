import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import { Amenitie, RoomState } from '../types/DataState';

interface RoomAttributes extends RoomState {
  id: number;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, 'id'> {}

export class Room extends Model<RoomAttributes, RoomCreationAttributes> implements RoomAttributes {
  public id!: number;
  public roomNumber!: string;
  public description!: string;
  public photos!: string[];
  public roomType!: RoomState['roomType'];
  public amenities!: Amenitie[];
  public price!: number;
  public discount!: number;
  public status!: RoomState['status'];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isValidAmenity(value: string[]) {
          const validAmenities: Amenitie[] = [
            'AC',
            'Breakfast',
            'Cleaning',
            'Grocery',
            'Shop Near',
            'Wifi',
            'Kitchen',
            'Shower',
            'Single Bed',
            'Towels',
          ];
          for (const amenity of value) {
            if (!validAmenities.includes(amenity as Amenitie)) {
              throw new Error(`Invalid amenity: ${amenity}`);
            }
          }
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'rooms',
  }
);
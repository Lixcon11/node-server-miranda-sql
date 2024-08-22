import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface UserAttributes {
    id: number;
    name: string;
    photo: string;
    email: string;
    phone: string;
    date: string;
    job: string;
    description: string;
    status: 'Active' | 'Inactive';
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public photo!: string;
    public email!: string;
    public phone!: string;
    public date!: string;
    public job!: string;
    public description!: string;
    public status!: 'Active' | 'Inactive';
    public password!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
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
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        job: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Active', 'Inactive'),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
    }
);

export { User };
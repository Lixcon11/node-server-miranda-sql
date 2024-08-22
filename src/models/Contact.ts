import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface ContactAttributes {
    id: number;
    name: string;
    date: string;
    email: string;
    phone: string;
    subject: string;
    comment: string;
    status: 'Published' | 'Archived';
}

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'> {}

class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
    public id!: number;
    public name!: string;
    public date!: string;
    public email!: string;
    public phone!: string;
    public subject!: string;
    public comment!: string;
    public status!: 'Published' | 'Archived';

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Contact.init(
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
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Published', 'Archived'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'contacts',
        timestamps: true,
    }
);

export { Contact };
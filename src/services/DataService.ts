import { Model } from 'mongoose';
import { DataState, UserState } from "../types/DataState";
import bcrypt from 'bcryptjs';

class Data<T extends DataState> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async fetchAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async getById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }
    async create(item: T): Promise<T> {
        console.log(item)
        if (this.isUserState(item)) {
            item.password = await bcrypt.hash(item.password, 10);
        }
        const newItem = new this.model(item);
        const savedItem = await newItem.save();
        return savedItem.toObject() as T;
    }

    async update(item: Partial<T> & { _id: string }): Promise<T | null> {
        return this.model.findByIdAndUpdate(item._id, item, { new: true }).exec();
    }

    async delete(id: string): Promise<string> {
        await this.model.findByIdAndDelete(id).exec();
        return id;
    }

    private isUserState = (item: any): item is UserState => {
        return (
            typeof item.name === 'string' &&
            typeof item.photo === 'string' &&
            typeof item.email === 'string' &&
            typeof item.phone === 'string' &&
            typeof item.date === 'string' &&
            typeof item.job === 'string' &&
            typeof item.description === 'string' &&
            typeof item.status === 'string' &&
            typeof item.password === 'string'
        );
    }
}

export { Data }
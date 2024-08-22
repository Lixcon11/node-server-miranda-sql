import { Model, ModelStatic } from 'sequelize';
import { DataState, UserState } from "../types/DataState";
import bcrypt from 'bcryptjs';

class Data<T extends DataState> {
    private model: ModelStatic<Model<T>>;

    constructor(model: ModelStatic<Model<T>>) {
        this.model = model;
    }

    async fetchAll(): Promise<T[]> {
        const records = await this.model.findAll();
        return records.map(record => record.get() as T);
    }

    async getById(id: string): Promise<T | null> {
        const record = await this.model.findByPk(id);
        return record ? record.get() as T : null;
    }

    async create(item: T): Promise<T> {
        if (this.isUserState(item)) {
            item.password = await bcrypt.hash(item.password, 10);
        }
        const record = await this.model.create(item as any);
        return record.get() as T;
    }

    async update(item: Partial<T> & { id: string }): Promise<T | null> {
        const record = await this.model.findByPk(item.id);
        if (record) {
            await record.update(item);
            return record.get() as T;
        }
        return null;
    }

    async delete(id: string): Promise<string> {
        const record = await this.model.findByPk(id);
        if (record) {
            await record.destroy();
            return id;
        }
        return '';
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

export { Data };
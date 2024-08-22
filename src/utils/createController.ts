import { app } from "../app";
import dataController from "./dataController";
import { DataState } from "../types/DataState";
import { Data } from "../services/DataService";
import { Model, ModelStatic } from "sequelize";  // Use Model and ModelStatic from Sequelize

const createController = <T extends DataState>(name: string, model: ModelStatic<Model<T>>) => {
    const service = new Data<T>(model);
    app.use(`/${name}`, dataController(service));
};

export { createController };
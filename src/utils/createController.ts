import { app } from "../app";
import dataController from "./dataController";
import { Model } from "mongoose";
import { DataState } from "../types/DataState";
import { Data } from "../services/DataService";

const createController = <T extends DataState>(name: string, model: Model<T>) => {
    const service = new Data(model);
    app.use(`/${name}`, dataController(service));
};

export { createController };
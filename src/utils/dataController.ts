import express, { Request, Response, Router } from "express";
import { Data } from "../services/DataService";
import { DataState } from "../types/DataState";

const dataController = <T extends DataState>(service: Data<T>): Router => {
    const router = express.Router();

    // GET all items
    router.get("/", async (_req: Request, res: Response) => {
        try {
            const items = await service.fetchAll();
            return res.json(items);
        } catch (err) {
            console.error("Error fetching all items:", err);
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    });

    // GET a single item by ID
    router.get("/:id", async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const item = await service.getById(id);
            if (!item) {
                return res.status(404).json({ error: "Item not found" });
            }
            return res.json(item);
        } catch (err) {
            console.error(`Error fetching item with id ${req.params.id}:`, err);
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    });

    // POST a new item
    router.post("/", async (req: Request, res: Response) => {
        try {
            const input = req.body;
            const newItem = await service.create(input);
            return res.status(201).json(newItem);
        } catch (err) {
            console.error("Error creating item:", err);
            return res.status(500).json({ error: "Failed to create item" });
        }
    });

    // PATCH (update) an item by ID
    router.patch("/:id", async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const input = { ...req.body, id };  // Include the ID in the item to update
            const updatedItem = await service.update(input);
            if (!updatedItem) {
                return res.status(404).json({ error: "Item not found" });
            }
            return res.json(updatedItem);
        } catch (err) {
            console.error(`Error updating item with id ${req.params.id}:`, err);
            return res.status(500).json({ error: "Failed to update item" });
        }
    });

    // DELETE an item by ID
    router.delete("/:id", async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const idDeleted = await service.delete(id);
            return res.json({ id: idDeleted });
        } catch (err) {
            console.error(`Error deleting item with id ${req.params.id}:`, err);
            return res.status(500).json({ error: "Failed to delete item" });
        }
    });

    return router;
};

export default dataController;
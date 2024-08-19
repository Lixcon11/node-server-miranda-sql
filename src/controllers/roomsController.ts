import { createController } from "../utils/createController"
import { Room } from "../models/roomSchema"

const roomsController = () => createController("rooms", Room);

export { roomsController }
import { createController } from "../utils/createController"
import { Room } from "../models/Room"

const roomsController = () => createController("rooms", Room);

export { roomsController }
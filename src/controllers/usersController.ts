import { createController } from "../utils/createController"
import { User } from "../models/User";

const usersController = () => createController("users", User)

export { usersController }
import { createController } from "../utils/createController"
import { User } from "../models/userSchema";

const usersController = () => createController("users", User)

export { usersController }
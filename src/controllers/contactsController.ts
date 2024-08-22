import { createController } from "../utils/createController"
import { Contact } from "../models/Contact";

const contactsController = () => createController("contacts", Contact)

export { contactsController }
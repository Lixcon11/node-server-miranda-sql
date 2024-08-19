import { createController } from "../utils/createController"
import { Contact } from "../models/contactSchema";

const contactsController = () => createController("contacts", Contact)

export { contactsController }
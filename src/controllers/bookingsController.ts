import { createController } from "../utils/createController"
import { Booking } from "../models/Booking";

const bookingsController = () => createController("bookings", Booking)

export { bookingsController }
import { createController } from "../utils/createController"
import { Booking } from "../models/bookingSchema";

const bookingsController = () => createController("bookings", Booking)

export { bookingsController }
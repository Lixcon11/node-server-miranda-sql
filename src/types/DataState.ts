/*type IdState = {
    _id: number
}*/

type Amenitie = 
    | "AC" 
    | "Breakfast" 
    | "Cleaning" 
    | "Grocery" 
    | "Shop Near"
    | "Wifi"
    | "Kitchen"
    | "Shower"
    | "Single Bed"
    | "Towels";

type RoomType = 
    | "Single Bed"
    | "Double Bed"
    | "Double Superior"
    | "Suite";

type RoomState =  {
    roomNumber: string;
    description: string;
    photos: string[];
    roomType: RoomType;
    amenities: Amenitie[];
    price: number;
    discount: number;
    status: "Available" | "Booked";
}

type BookingState =  {
    name: string;
    orderDate: string;
    checkInDate: string;
    checkOutDate: string;
    specialRequest: string;
    room: RoomState;
    status: "Check In" | "Check Out" | "In Progress";
}

type ContactState =  {
    name: string;
    date: string;
    email: string;
    phone: string;
    subject: string;
    comment: string;
    status: "Published" | "Archived"
}

type UserState = {
    name: string;
    photo: string;
    email: string;
    phone: string;
    date: string;
    job: string;
    description: string;
    status: "Active" | "Inactive";
    password: string;
}

type DataState = UserState | ContactState | BookingState | RoomState

export { RoomState, BookingState, ContactState, UserState, DataState }
import axios from "axios";

export const getAvailableRooms = async (
  checkin,
  checkout,
  type,
  guestTotal
) => {
  return await axios.post("http://localhost:3000/rooms/available-room", {
    checkin,
    checkout,
    type,
    guestTotal,
  });
};

import axios from "axios";

export const getRooms = async () => {
  return await axios.get("http://localhost:3000/rooms");
};

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

export const getRoomFacilities = async (roomId) => {
  return await axios.get(`http://localhost:3000/room-facilities/`);
};

export const createRoom = async (data) => {
  return await axios.post(`http://localhost:3000/rooms`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteRoom = async (roomId) => {
  return await axios.delete(`http://localhost:3000/rooms/${roomId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

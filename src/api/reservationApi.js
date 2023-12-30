import axios from "axios";

export const createReservation = async (
  roomId,
  checkin,
  checkout,
  guestTotal
) => {
  return await axios.post("http://localhost:3001/reservations", {
    roomId,
    checkin,
    checkout,
    guestTotal,
  });
};

export const genereateToken = (reservationId) => {
  return axios.post(`http://localhost:3001/reservations/genereateToken`, {
    reservationId,
  });
};

export const paymentSuccess = (reservationId) => {
  return axios.patch(`http://localhost:3001/reservations/success`, {
    reservationId,
  });
};

export const paymentCacel = async (reservationId) => {
  return await axios.patch(`http://localhost:3001/reservations/cancel`, {
    reservationId,
  });
};

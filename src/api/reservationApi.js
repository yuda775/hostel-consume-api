import axios from "axios";

export const getReservations = async () => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.get("http://localhost:3000/reservations", { headers });
};

export const createReservation = async (
  roomId,
  checkin,
  checkout,
  guestTotal
) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const tokenPayload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(tokenPayload));

    const userId = decodedPayload.userId;
    const customerName = decodedPayload.fullName;
    console.log(userId, customerName);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = {
      roomId,
      checkin,
      checkout,
      guestTotal,
      userId,
      customerName,
    };
    console.log(data);
    return await axios.post("http://localhost:3000/reservations", data, {
      headers,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReservationByUserId = async (userId) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get("http://localhost:3000/reservations/user/" + parseInt(userId), {
    headers,
  });
};

export const genereateToken = (reservationId, orderId) => {
  return axios.post(`http://localhost:3000/reservations/generateToken`, {
    reservationId,
    orderId,
  });
};

export const paymentSuccess = (reservationId) => {
  return axios.patch(`http://localhost:3000/reservations/success`, {
    reservationId,
  });
};

export const paymentCacel = async (reservationId) => {
  return await axios.patch(`http://localhost:3000/reservations/cancel`, {
    reservationId,
  });
};

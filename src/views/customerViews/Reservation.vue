<template>
  <div>
    <div>
      <div v-if="status">
        <h2>Reservation Details</h2>
        <p><strong>Reservation Id:</strong> Rp{{ reservation.id }}</p>
        <p><strong>Amount:</strong> Rp{{ reservation.amount }}</p>
        <p><strong>Check-in:</strong> {{ formatDate(reservation.checkin) }}</p>
        <p>
          <strong>Check-out:</strong> {{ formatDate(reservation.checkout) }}
        </p>
        <p><strong>Status:</strong> {{ reservation.status }}</p>
        <p><strong>Guest Total:</strong> {{ reservation.guestTotal }}</p>

        <div class="">
          <img
            v-for="image in reservation.room.images"
            :key="image.id"
            :src="getImageUrl(reservation.roomId, image.images)"
            alt="Room Image"
            class="w-52 mr-4 mb-4"
          />
        </div>

        <h4>Room Facilities</h4>
        <div
          v-for="facility in reservation.room.roomFacilityRelation"
          :key="facility.facilityId"
          class="mb-2"
        >
          <p>{{ facility.facility.name }}</p>
        </div>
      </div>
      <div v-else>
        <p class="mb-8">Loading reservation details...</p>
      </div>
      <button @click="handlePayment()">Pay Now</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getRoomImageUrl } from "@/api/imageApi";
import {
  genereateToken,
  paymentSuccess,
  paymentCacel,
} from "@/api/reservationApi";
import router from "@/router";

const status = ref(false);
const reservation = ref("");
const id = ref(useRoute().params.id);

const fetchReservation = async () => {
  try {
    const url = `http://localhost:3001/reservations/${id.value}`;
    const response = await axios.get(url);

    if (response.data.status) {
      status.value = true;
      reservation.value = response.data.reservation;
    } else {
      console.error(response.data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

const getImageUrl = (roomId, imageName) => getRoomImageUrl(roomId, imageName);

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const handlePayment = async () => {
  try {
    const getToken = await genereateToken(reservation.value.id);
    console.log(getToken.data);
    window.snap.pay(getToken.data.transactionToken, {
      onSuccess: async (result) => {
        /* You may add your own implementation here */
        await paymentSuccess(reservation.value.id);
        alert("payment success!");
        console.log(result);
        router.push({ path: "/" });
      },
      onPending: (result) => {
        /* You may add your own implementation here */
        alert("waiting for your payment!");
        console.log(result);
      },
      onError: async (result) => {
        /* You may add your own implementation here */
        await paymentCancel(reservation.value.id);
        alert("payment failed!");
        console.log(result);
      },
      onClose: () => {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  } catch (error) {
    // Handle the error if needed
    console.error("Error handling payment:", error.message);
  }
};

onMounted(() => {
  fetchReservation();
  // Load the external script after the component is mounted
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
  script.setAttribute("data-client-key", "SB-Mid-client-5WZfDQJ7h6q6wDp"); // Replace with your actual client key
  document.head.appendChild(script);
});
</script>

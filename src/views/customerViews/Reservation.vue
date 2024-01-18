<template>
  <header>
    <Navbar />
  </header>
  <div v-if="status" class="container mx-auto">
    <main>
      <section class="flex flex-wrap justify-center gap-4 mx-auto mt-5">
        <RoomCard :reservation="reservation" />
      </section>
      <ReservationDetails :reservation="reservation" @payNow="handlePayment" />
    </main>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import RoomCard from "@/components/RoomCard.vue";
import ReservationDetails from "@/components/ReservationDetails.vue";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  genereateToken,
  paymentSuccess,
  paymentCacel,
} from "@/api/reservationApi";
import router from "@/router";

const status = ref(false);
const reservation = ref("");
const id = ref(useRoute().params.id);
console.log(reservation);

const fetchReservation = async () => {
  try {
    const url = `http://localhost:3000/reservations/${id.value}`;
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

const handlePayment = async () => {
  try {
    // Generate token for payment
    const orderId = uuidv4();
    console.log(orderId);
    const getToken = await genereateToken(reservation.value.id, orderId);
    console.log(getToken.data);
    window.snap.pay(getToken.data.transactionToken, {
      onSuccess: async (result) => {
        /* You may add your own implementation here */
        await paymentSuccess(reservation.value.id);
        alert("payment success!");
        console.log(result);
        router.push({ path: "/" });
      },
      onPending: async (result) => {
        /* You may add your own implementation here */
        alert("waiting for your payment!");
        await genereateToken(reservation.value.id);
        console.log(result);
      },
      onError: async (result) => {
        /* You may add your own implementation here */
        await paymentCacel(reservation.value.id);
        alert("payment failed!");
        console.log(result);
      },
      onClose: () => {
        /* You may add your own implementation here */
        alert("you closed the popup witdout finishing tde payment");
      },
    });
  } catch (error) {
    // Handle tde error if needed
    console.error("Error handling payment:", error.message);
  }
};

onMounted(() => {
  fetchReservation();
  // Load tde external script after tde component is mounted
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
  script.setAttribute("data-client-key", "SB-Mid-client-5WZfDQJ7h6q6wDp"); // Replace witd your actual client key
  document.head.appendChild(script);
});
</script>

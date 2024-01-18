<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold my-6 mx-5">My Reservations</h1>

    <div v-if="loading" class="text-center">Loading...</div>

    <ul v-if="!loading && reservations.length === 0" class="my-4">
      <li class="text-gray-600">No reservations found.</li>
    </ul>

    <div class="w-2/3 mx-auto bg-white shadow-md rounded-md">
      <ul v-if="!loading && reservations.length > 0">
        <li
          v-for="reservation in reservations"
          :key="reservation.id"
          class="border-b last:border-b-0"
        >
          <div class="p-4 rounded-md">
            <a
              :href="`/reservation/${reservation.id}`"
              class="block hover:bg-gray-100 rounded-md p-4"
            >
              <h3 class="text-blue-500 text-lg font-bold mb-2">
                Reservation ID: {{ reservation.id }}
              </h3>
              <p>
                <strong>Check-in:</strong> {{ formatDate(reservation.checkin) }}
              </p>
              <p>
                <strong>Check-out:</strong>
                {{ formatDate(reservation.checkout) }}
              </p>
              <p><strong>Guest Total:</strong> {{ reservation.guestTotal }}</p>
              <p>
                <span
                  class="inline-block w-24 rounded-lg px-3 py-1 text-md text-white text-center font-bold mt-3"
                  :class="{
                    'bg-orange-400': reservation.status === 'pending',
                    'bg-green-400': reservation.status === 'paid',
                    'bg-red-400': reservation.status === 'canceled',
                  }"
                >
                  {{ reservation.status }}
                </span>
              </p>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getReservationByUserId } from "@/api/reservationApi";

const userId = useRoute().params.userId;
const reservations = ref([]);
const loading = ref(true);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

onMounted(async () => {
  try {
    const response = await getReservationByUserId(userId);
    reservations.value = response.data.reservations;
    loading.value = false;
    console.log(reservations.value);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    loading.value = false;
  }
});
</script>

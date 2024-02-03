<template>
  <div class="antialiased font-sans bg-white rounded-lg shadow-lg">
    <div class="container mx-auto px-4 sm:px-8">
      <div class="py-8">
        <!-- Header -->
        <section>
          <ReservationHeader />
        </section>

        <!-- Table -->
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="overflow-hidden border border-slate-200 sm:rounded-lg">
            <table class="min-w-full bg-white divide-y divide-slate-700">
              <thead class="bg-gray-100">
                <tr>
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Reservation ID
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Room Number
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Check-in
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Check-out
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reservation in reservations" :key="reservation.id">
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img
                          class="w-full h-full rounded-full"
                          :src="getUserImage(reservation.Users)"
                          alt=""
                        />
                      </div>
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {{
                            (reservation.Users && reservation.Users.fullName) ||
                            reservation.customerName ||
                            "Nama Tidak Tersedia"
                          }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    {{ reservation.id }}
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    {{ reservation.room.roomNumber }}
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    {{ formatDate(reservation.checkin) }}
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    {{ formatDate(reservation.checkout) }}
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div class="flex items-center space-x-2">
                      <button
                        @click="viewDetails(reservation)"
                        class="text-blue-500"
                      >
                        <!-- Add your view details icon here -->
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                          ></path>
                        </svg>
                      </button>
                      <button
                        @click="deleteReservation(reservation)"
                        class="text-red-500"
                      >
                        <!-- Add your delete icon here -->
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ReservationHeader from "@/components/icons/ReservationHeader.vue";

import { ref, onMounted } from "vue";
import { getReservations } from "@/api/reservationApi";

const reservations = ref([]);

const fetchReservations = async () => {
  try {
    const response = await getReservations();
    reservations.value = response.data.reservations;
    console.log(reservations.value);
  } catch (error) {
    console.error("Error fetching reservations:", error);
  }
};

onMounted(() => {
  fetchReservations();
});

const getUserImage = (user) => {
  // Check if the user object exists and has a profile picture
  if (user && user.fullName && user.profilePicture) {
    return user.profilePicture; // Use the user's profile picture
  } else {
    return "/images/avatar.jpeg"; // Use the default image from the public directory
  }
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
</script>

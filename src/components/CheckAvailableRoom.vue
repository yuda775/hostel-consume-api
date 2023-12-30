<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center mb-8">Room Availability</h1>
    <form
      @submit.prevent="checkRoomAvailability"
      class="flex flex-col items-center space-y-4"
    >
      <div class="flex space-x-4">
        <div>
          <label for="checkin" class="block text-sm font-medium text-slate-700"
            >Check-in Date:</label
          >
          <input
            type="date"
            v-model="checkin"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label for="checkout" class="block text-sm font-medium text-slate-700"
            >Check-out Date:</label
          >
          <input
            type="date"
            v-model="checkout"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label for="type" class="block text-sm font-medium text-slate-700"
            >Room Type:</label
          >
          <select
            v-model="type"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="PRIVATE">Private</option>
            <option value="DORM">Dormitory</option>
          </select>
        </div>
        <div class="w-36">
          <label
            for="guestTotal"
            class="block text-sm font-medium text-slate-700"
            >Number of Guests:</label
          >
          <input
            type="number"
            v-model="guestTotal"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <button
        type="submit"
        class="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
      >
        Check Availability
      </button>
    </form>

    <div v-if="status" class="mt-8">
      <h2 class="text-3xl font-bold text-center mb-4">Available Rooms</h2>

      <div
        v-for="room in availableRooms"
        class="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row"
      >
        <div
          class="relative w-1/2 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0"
        >
          <img
            :src="getImageUrl(room.id, room.images[0].images)"
            alt="card-image"
            class="object-cover w-full h-full"
          />
        </div>
        <div class="p-6 flex-1">
          <h6
            class="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase"
          >
            {{ room.type }} room
          </h6>
          <h4
            class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
          >
            Room Number: {{ room.roomNumber }}
          </h4>
          <div
            class="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700"
          >
            <p class="mt-4 font-bold text-slate-700">Facilities:</p>
            <ul class="flex flex-wrap space-x-4">
              <li
                v-for="facility in room.roomFacilityRelation"
                :key="facility.facility.id"
              >
                <a class="text-orange-400 font-medium">{{
                  facility.facility.name
                }}</a>
              </li>
            </ul>
            <p class="mt-4 font-bold text-slate-700">
              Price: Rp.{{ room.price }}
            </p>
          </div>

          <a
            class="absolute bottom-0 right-0 block"
            @click="reserveRoom(room.id)"
            ><button
              class="flex items-center gap-2 px-6 py-3 font-sans text-sm font-bold text-center text-indigo-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-indigo-900/10 active:bg-indigo-900/20"
              type="button"
            >
              Reserve Now<svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg></button
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAvailableRooms } from "@/api/roomApi";
import { getRoomImageUrl } from "@/api/imageApi";
import { createReservation } from "@/api/reservationApi";
import router from "@/router";

const checkin = ref("");
const checkout = ref("");
const type = ref("PRIVATE");
const guestTotal = ref(1);
const status = ref(false);
const availableRooms = ref([]);
const reservations = ref("");
const message = ref("");

const checkRoomAvailability = async () => {
  try {
    const response = await getAvailableRooms(
      checkin.value,
      checkout.value,
      type.value,
      guestTotal.value
    );

    status.value = response.data.status;
    availableRooms.value = response.data.availableRooms;
    console.log(availableRooms.value);
    message.value = response.data.message;
  } catch (error) {
    console.error("Error checking room availability:", error.message);
  }
};

const reserveRoom = async (roomId) => {
  try {
    const response = await createReservation(
      roomId,
      checkin.value,
      checkout.value,
      guestTotal.value
    );
    reservations.value = response.data.reservation;
    console.log(reservations.value);
    if (response.data.status) {
      await checkRoomAvailability();
      console.log("Reservation created successfully!");
      router.push({
        path: `/reservation/${reservations.value.id}`,
      });
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error("Error checking room availability:", error.message);
  }
};

const getImageUrl = (roomId, imageName) => getRoomImageUrl(roomId, imageName);
</script>

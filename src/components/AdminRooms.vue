<template>
  <div class="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
    <div
      v-for="room in data.rooms"
      :key="room.id"
      class="bg-white grid grid-cols-2 w-full rounded-lg overflow-hidden shadow-md relative"
    >
      <img
        :src="getImageUrl(room.id, room.images[0].images)"
        alt="Room Image"
        class="max-w-50 min-h-44 object-cover rounded-t-lg"
      />
      <div class="p-4">
        <h2 class="text-xl font-bold mb-2">{{ room.roomNumber }}</h2>
        <p class="text-gray-600">{{ room.type }}</p>
        <p class="mt-2">{{ room.capacity }} guests</p>
        <ul class="mt-2 text-xs flex flex-wrap gap-2 text-orange-500">
          <li
            v-for="facility in room.roomFacilityRelation"
            :key="facility.facilityId"
          >
            {{ facility.facility.name }}
          </li>
        </ul>
      </div>
      <div
        class="absolute top-0 right-0 m-2 cursor-pointer"
        @click="showOptions(room.id)"
      >
        <svg
          class="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l-1 1m0 0l-1-1m1 1v-8m0 8v-8m-8 8v-8m0 8v-8m16 8v-8m0 8v-8"
          ></path>
        </svg>
      </div>
      <div
        v-if="selectedRoom === room.id"
        class="absolute top-3 right-10 bg-white border rounded-lg outline-2 outline-slate-600 shadow p-2 flex flex-col"
      >
        <button
          class="p-2 font-medium hover:font-bold text-sky-400"
          @click="showDetails(room)"
        >
          Details
        </button>
        <button
          class="p-2 font-medium hover:font-bold text-orange-400"
          @click="editRoom(room)"
        >
          Edit
        </button>
        <button
          class="p-2 font-medium hover:font-bold text-red-400"
          @click="deleteRoom(room)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const API_URL = "http://localhost:3000/rooms";
const data = ref([]);
const selectedRoom = ref(null);

async function fetchRooms() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    data.value = await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

function showOptions(roomId) {
  selectedRoom.value = selectedRoom.value === roomId ? null : roomId;
}

function showDetails(room) {
  console.log("Show details for room:", room);
}

function editRoom(room) {
  console.log("Edit room:", room);
}

function deleteRoom(room) {
  console.log("Delete room:", room);
}

onMounted(fetchRooms);

// Function to get the full image URL
function getImageUrl(roomId, imageName) {
  return `http://localhost:3000/images/rooms/${roomId}/${imageName}`;
}
</script>

<style scoped>
/* Adjust styles for landscape orientation */
/* You may need to tweak the styles based on your design requirements */
.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

/* Add custom styles if needed */
</style>

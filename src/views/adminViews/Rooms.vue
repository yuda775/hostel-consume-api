<template>
  <h1 class="text-4xl font-bold mb-8">Rooms</h1>

  <div class="flex justify-end mb-4">
    <button
      @click="openPopup"
      class="bg-blue-500 font-medium text-white px-4 py-2 rounded ml-auto hover:bg-blue-700 cursor-pointer"
    >
      Add Room
    </button>
  </div>

  <section
    class="mx-auto mt-8 bg-white p-4 rounded-lg shadow-lg w-full h-full overflow-auto"
  >
    <AdminRooms :rooms="rooms.rooms" @room-deleted="fetchRooms" />
  </section>

  <!-- Modal -->
  <div
    v-if="showPopup"
    class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center"
  >
    <RoomModal @close-popup="closePopup" @update-data="fetchRooms" />
  </div>
</template>

<script setup>
import AdminRooms from "@/components/admin/room/AdminRooms.vue";
import RoomModal from "@/components/admin/room/RoomModal.vue";

import { ref, onMounted } from "vue";
import { getRooms } from "@/api/roomApi";

const rooms = ref([]);
const showPopup = ref(false);

function openPopup() {
  showPopup.value = true;
}

function closePopup() {
  showPopup.value = false;
}

async function fetchRooms() {
  const response = await getRooms();
  rooms.value = response.data;

  console.log("Rooms:", rooms.value);
}

onMounted(async () => {
  await fetchRooms();
});
</script>

<template>
  <section class="bg-white p-5 mx-auto mt-5 w-3/5 rounded shadow-lg">
    <h2 class="text-2xl font-bold mb-4">List Of Room Facilities</h2>
    <div class="flex">
      <input
        v-model="newRoomFacility"
        class="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500 font-medium"
        type="text"
        placeholder="Add Room Facility"
      />
      <button
        @click="addRoomFacility"
        class="bg-blue-600 text-white px-4 py-3 rounded-sm hover:bg-blue-700 rounded-r font-bold"
      >
        Add
      </button>
    </div>

    <ul class="space-y-2 flex flex-col w-full mt-4">
      <li
        v-for="roomFacility in roomFacilities"
        :key="roomFacility.id"
        class="flex items-center justify-between p-2 bg-gray-100 rounded"
      >
        <p class="font-bold text-slate-800 text-lg px-2">
          {{ roomFacility.name }}
        </p>
        <div class="flex space-x-1">
          <button
            @click="openEditModal(roomFacility.id)"
            class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700"
          >
            Edit
          </button>
          <button
            @click="removeRoomFacility(roomFacility)"
            class="bg-red-500 text-white px-2 py-2 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </section>

  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4"
    aria-labelledby="modal-title"
  >
    <div class="bg-white p-4 rounded-lg w-1/3 shadow-lg">
      <h2 class="text-xl font-bold mb-4">Edit Room Facility</h2>
      <input
        v-model="editedRoomFacility.name"
        class="w-full px-4 py-2 border border-gray-300 rounded"
        type="text"
        placeholder="Enter Room Facility"
      />
      <div class="flex justify-end space-x-2 mt-4">
        <button
          @click="closeModal"
          class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          @click="updateRoomFacility"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getRoomFacilities } from "@/api/roomApi";

const roomFacilities = ref([
  { id: 1, name: "Free Wifi" },
  { id: 2, name: "Free Breakfast" },
  { id: 3, name: "Free Parking" },
]);
const newRoomFacility = ref("");
const editedRoomFacility = ref(null);
const showModal = ref(false);

function addRoomFacility() {
  const trimmedValue = newRoomFacility.value.trim();
  if (trimmedValue !== "") {
    roomFacilities.value.push({
      id: roomFacilities.value.length + 1,
      name: trimmedValue,
    });
    newRoomFacility.value = "";
  }
}

function removeRoomFacility(roomFacility) {
  const index = roomFacilities.value.indexOf(roomFacility);
  if (index > -1) {
    roomFacilities.value.splice(index, 1);
  }
}

function openEditModal(roomFacilityId) {
  const roomFacility = roomFacilities.value.find(
    (facility) => facility.id === roomFacilityId
  );
  editedRoomFacility.value = { ...roomFacility };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function updateRoomFacility() {
  const index = roomFacilities.value.findIndex(
    (facility) => facility.id === editedRoomFacility.value.id
  );
  if (index !== -1) {
    roomFacilities.value[index] = { ...editedRoomFacility.value };
    showModal.value = false;
  }
}
</script>

<template>
  <div class="relative bg-white rounded shadow-md p-5">
    <button
      @click="$emit('close-popup')"
      class="absolute top-0 right-0 py-2 px-3 cursor-pointer text-2xl text-red-500 hover:text-red-700"
    >
      ×
    </button>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="roomNumber" class="block text-sm font-medium text-gray-700"
          >Room Number:</label
        >
        <input
          v-model="formFields.roomNumber"
          id="roomNumber"
          required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label for="type" class="block text-sm font-medium text-gray-700"
          >Type:</label
        >
        <select
          v-model="formFields.type"
          id="type"
          required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Please select a type</option>
          <option value="PRIVATE">Private</option>
          <option value="DORM">Dormitory</option>
        </select>
      </div>

      <div>
        <label for="capacity" class="block text-sm font-medium text-gray-700"
          >Capacity:</label
        >
        <input
          v-model="formFields.capacity"
          id="capacity"
          type="number"
          required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700"
          >Price:</label
        >
        <input
          v-model="formFields.price"
          id="price"
          type="number"
          required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label for="facilities" class="block text-sm font-medium text-gray-700"
          >Facilities:</label
        >
        <div id="facilities" class="mt-2 space-y-2">
          <div
            v-for="facility in facilityOptions"
            :key="facility"
            class="flex items-start"
          >
            <div class="flex items-center h-5">
              <input
                :id="facility"
                :name="facility.name"
                type="checkbox"
                :value="facility.id"
                v-model="formFields.facilities"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label :for="facility" class="font-medium text-gray-700">{{
                facility.name
              }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-4">
        <label for="images" class="block text-sm font-medium text-gray-700"
          >Images:</label
        >
        <!-- for image only -->
        <input
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          type="file"
          name="images"
          id="images"
          accept="image/*"
          multiple
          @change="handleImageUpload"
        />
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { getRoomFacilities, createRoom } from "@/api/roomApi";

const formFields = ref({
  roomNumber: "",
  type: "",
  capacity: 0,
  price: 0,
  facilities: [],
  images: [],
});

const emit = defineEmits(["update-data", "close-popup"]);

const facilityOptions = ref([]);

function handleImageUpload(event) {
  formFields.value.images = [...event.target.files];
}

async function submitForm() {
  const formData = new FormData();

  const { roomNumber, type, capacity, price, facilities, images } =
    formFields.value;

  formData.append("roomNumber", roomNumber);
  formData.append("type", type);
  formData.append("capacity", capacity);
  formData.append("price", price);

  facilities.forEach((facilityId) => formData.append("facilities", facilityId));
  images.forEach((image) => formData.append("images", image));

  console.log("FormData:", formData);
  console.log("FormFields:", formFields.value);

  await createRoom(formData);
  emit("close-popup");
  emit("update-data");
}

onMounted(async () => {
  await fetchRoomFacilities();
});

async function fetchRoomFacilities() {
  try {
    const response = await getRoomFacilities();
    facilityOptions.value = response.data;
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <div class="my-2 flex sm:flex-row flex-col">
    <div class="flex flex-row mb-1 sm:mb-0">
      <div class="relative">
        <select
          class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
      <div class="relative">
        <select
          class="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
        >
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Canceled</option>
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="block relative">
      <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
        <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
          <path
            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
          ></path>
        </svg>
      </span>
      <input
        placeholder="Search"
        class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
      />
    </div>
    <div class="block relative ml-auto">
      <button
        @click="openModal"
        class="bg-blue-500 text-white font-medium px-4 py-2 rounded"
      >
        Create Data
      </button>

      <div
        v-if="isModalOpen"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="relative bg-white p-8 rounded shadow-md">
          <button
            @click="closeModal"
            class="absolute top-5 right-5 text-slate-500 hover:text-slate-700"
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

          <div class="modal-header flex gap-4 mb-4">
            <h2
              :class="currentStep === 1 ? 'font-bold' : 'text-gray-500'"
              class="text-lg"
            >
              Reservation
            </h2>
            <h2
              :class="currentStep === 2 ? 'font-bold' : 'text-gray-500'"
              class="text-lg"
            >
              Payment
            </h2>
            <h2
              :class="currentStep === 3 ? 'font-bold' : 'text-gray-500'"
              class="text-lg"
            ></h2>
          </div>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-600"
                >Customer Name</label
              >
              <input
                v-model="formData.name"
                type="text"
                required
                id="name"
                name="name"
                class="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            <div class="flex flex-wrap gap-3 justify-between">
              <div class="mb-4">
                <label
                  for="checkin"
                  class="block text-sm font-medium text-gray-600"
                  >Check-in Date</label
                >
                <input
                  v-model="formData.checkin"
                  type="date"
                  id="checkin"
                  name="checkin"
                  class="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div class="mb-4">
                <label
                  for="checkout"
                  class="block text-sm font-medium text-gray-600"
                  >Check-out Date</label
                >
                <input
                  v-model="formData.checkout"
                  type="date"
                  id="checkout"
                  name="checkout"
                  class="mt-1 p-2 border rounded-md w-full"
                />
              </div>
            </div>

            <div class="flex flex-wrap gap-3 justify-between">
              <div class="mb-4">
                <label
                  for="roomType"
                  class="block text-sm font-medium text-gray-600"
                  >Room Type</label
                >
                <select
                  v-model="formData.roomType"
                  id="roomType"
                  name="roomType"
                  class="mt-1 p-2 border rounded-md max-w-32"
                >
                  <option value="PRIVATE">Private</option>
                  <option value="DORM">Dormitory</option>
                </select>
              </div>

              <div class="mb-4">
                <label
                  for="guestTotal"
                  class="block text-sm font-medium text-gray-600"
                  >Guest Total</label
                >
                <input
                  v-model="formData.guestTotal"
                  type="number"
                  id="guestTotal"
                  name="guestTotal"
                  class="mt-1 p-2 border rounded-md max-w-20"
                />
              </div>

              <div class="mb-4">
                <label
                  for="roomNumber"
                  class="block text-sm font-medium text-gray-600"
                  >Room Number</label
                >
                <input
                  v-model="formData.roomNumber"
                  type="text"
                  id="roomNumber"
                  name="roomNumber"
                  class="mt-1 p-2 border rounded-md max-w-20"
                />
              </div>
            </div>

            <div class="flex justify-end">
              <button
                @click="submitReservation"
                class="bg-blue-500 text-white font-medium px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  genereateToken,
  paymentSuccess,
  paymentCacel,
} from "@/api/reservationApi";
import router from "@/router";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

const currentStep = ref(1);
const isModalOpen = ref(false);
const formData = ref({
  name: "",
  checkin: "",
  checkout: "",
  guestTotal: 1, // default to 1
  roomType: "PRIVATE", // default to 'private'
  roomNumber: "",
  picked: "cash",
});

let getToken = null; // Initialize with null

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handlePayment = async () => {
  try {
    const orderId = uuidv4(); // Generate UUID for orderId
    console.log(orderId);
    getToken = await genereateToken(reservation.value.id, orderId);
    console.log(getToken.data);

    window.snap.pay(getToken.data.transactionToken, {
      onSuccess: async (result) => {
        await paymentSuccess(reservation.value.id);
        alert("payment success!");
        console.log(result);
        closeModal(); // Close modal on success
        router.push({ path: "/" });
      },
      onPending: async (result) => {
        alert("waiting for your payment!");
        await genereateToken(reservation.value.id);
        console.log(result);
      },
      onError: async (result) => {
        await paymentCacel(reservation.value.id);
        alert("payment failed!");
        console.log(result);
        closeModal(); // Close modal on error
      },
      onClose: () => {
        alert("you closed the popup without finishing the payment");
      },
    });
  } catch (error) {
    console.error("Error handling payment:", error.message);
  }
};

const openPaymentGateway = () => {
  if (formData.value.picked === "cashless" && getToken) {
    triggerSnapPopup();
  }
};

const triggerSnapPopup = () => {
  window.snap.embed(getToken.data, {
    embedId: "snap-container", // Ensure to define the embedId
  });
};

onMounted(() => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
  script.setAttribute("data-client-key", "SB-Mid-client-5WZfDQJ7h6q6wDp");
  document.head.appendChild(script);
});
</script>

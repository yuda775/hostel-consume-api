<template>
  <section class="p-8 bg-white rounded-lg">
    <FullCalendar :options="calendarOptions" />
    <ModalContent
      v-if="showModal"
      :selectedEvent="selectedEvent"
      @close="showModal = false"
    />
  </section>
</template>

<script setup>
import ModalContent from "@/components/icons/ModalContent.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { onMounted, ref, watch, reactive } from "vue";
import { getReservations } from "@/api/reservationApi";

const selectedEvent = ref(null);
const showModal = ref(false);
const reservations = ref([]);

const calendarOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  events: [],
  height: 520,

  eventClick: (info) => {
    selectedEvent.value = info.event.extendedProps;
    showModal.value = true;
  },
});

const fetchReservations = async () => {
  try {
    const response = await getReservations();
    reservations.value = response.data.reservations;
  } catch (error) {
    console.error("Error fetching reservations:", error);
  }
};

const updateCalendarEvents = () => {
  calendarOptions.events = reservations.value.map((reservation) => ({
    title: `Room ${reservation.room.roomNumber}`,
    start: reservation.checkin,
    end: reservation.checkout,
    extendedProps: {
      reservationId: reservation.id,
      clickable: true,
      customerName: reservation.Users.fullName,
      roomNumber: reservation.room.roomNumber,
      roomType: reservation.room.type,
      guestTotal: reservation.guestTotal,
      amount: reservation.amount,
    },
  }));
};

onMounted(async () => {
  await fetchReservations();
});

// Watch for changes in reservations and update events accordingly
watch(reservations, () => {
  updateCalendarEvents();
});
</script>

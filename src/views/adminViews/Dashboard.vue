<template>
  <h1 class="text-4xl font-bold mb-8">Dashboard</h1>

  <section class="mt-5 mx-auto bg-white rounded-lg shadow-lg">
    <div class="text-2xl font-semibold px-4 pt-3">
      <span class="cursor-pointer" @click="previousMonth()">🔙</span>
      {{ monthName }} {{ year }}
      <span class="cursor-pointer" @click="nextMonth()">🔜</span>
    </div>
    <div class="flex">
      <div class="ml-2 py-4 px-2">
        <div class="text-1xl w-52 text-white bg-green-500 p-4">
          <h3 class="font-bold">Total Reservations:</h3>
          <p class="">{{ reservationSum() }} Reservation</p>
        </div>
      </div>
      <div class="py-4 px-2">
        <div class="text-1xl w-52 text-white bg-red-400 p-4">
          <h3 class="font-bold">Current Revenue:</h3>
          Rp. {{ reservationRevenue() }}
          <br />
        </div>
      </div>
      <div class="py-4 px-2">
        <div class="text-1xl w-52 text-white bg-purple-400 p-4">
          <h3 class="font-bold">Total Guest:</h3>
          {{ reservationTotalGuest() }} Guest
          <br />
        </div>
      </div>
    </div>
  </section>

  <section class="mt-5 mx-auto bg-white rounded-lg shadow-lg">
    <AdminReservationCalendar />
  </section>
</template>

<script setup>
import AdminReservationCalendar from "@/components/admin/reservation/AdminReservationCalendar.vue";

import { ref, onMounted } from "vue";
import { getReservations } from "@/api/reservationApi";

const monthNumber = ref(new Date().getMonth() + 1);
const year = ref(new Date().getFullYear());

const monthName = ref(
  new Date(monthNumber.value + "/01/2000").toLocaleString("default", {
    month: "long",
  })
);

const nextMonth = () => {
  monthNumber.value++;
  monthName.value = new Date(monthNumber.value + "/01/2000").toLocaleString(
    "default",
    {
      month: "long",
    }
  );
};

const previousMonth = () => {
  monthNumber.value--;
  monthName.value = new Date(monthNumber.value + "/01/2000").toLocaleString(
    "default",
    {
      month: "long",
    }
  );
};

// Menggunakan watch untuk mengupdate nama bulan saat monthNumber berubah
const reservation = ref([]);

const fetchreservation = async () => {
  try {
    const response = await getReservations();
    reservation.value = response.data.reservations.filter(
      (reservation) => reservation.status === "paid"
    );
    console.log(reservation.value);
  } catch (error) {
    console.error(error);
  }
};

const reservationRevenue = () => {
  let sum = 0;
  reservation.value.forEach((reservation) => {
    sum += reservation.amount;
  });
  return sum;
};

const reservationSum = () => {
  return reservation.value.length;
};

const reservationTotalGuest = () => {
  let sum = 0;
  reservation.value.forEach((reservation) => {
    sum += reservation.guestTotal;
  });
  return sum;
};

onMounted(() => {
  fetchreservation();
});
</script>

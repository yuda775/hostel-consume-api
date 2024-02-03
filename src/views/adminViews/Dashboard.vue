<template>
  <h1 class="text-4xl font-bold mb-8">Dashboard</h1>

  <section class="mt-5 mx-auto bg-white rounded-lg shadow-lg">
    <AdminReservationCalendar />
  </section>
</template>

<script setup>
import AdminReservationCalendar from "@/components/admin/reservation/AdminReservationCalendar.vue";
</script>

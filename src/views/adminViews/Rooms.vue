<template>
  <h1 class="text-4xl font-bold mb-8">Rooms</h1>

  <section
    class="mx-auto mt-8 bg-white p-4 rounded-lg shadow-lg w-full h-full overflow-auto"
  >
    <AdminRooms />
  </section>
</template>

<script setup>
import AdminRooms from "@/components/AdminRooms.vue";
</script>

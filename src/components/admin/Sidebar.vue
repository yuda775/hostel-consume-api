<!-- components/Sidebar.vue -->
<template>
  <div class="w-full bg-slate-700">
    <div>
      <a
        class="block p-4 cursor-pointer hover:font-black"
        :class="{
          'bg-sky-900 text-white font-black': isActive('dashboard'),
          'text-slate-200': !isActive('dashboard'),
        }"
        @click="navigateTo('dashboard')"
      >
        Dashboard
      </a>
      <a
        class="block p-4 cursor-pointer hover:font-black"
        :class="{
          'bg-sky-900 text-white font-black': isActive('reservation'),
          'text-slate-200': !isActive('reservation'),
        }"
        @click="navigateTo('reservation')"
      >
        Reservation
      </a>
      <a
        class="block p-4 cursor-pointer hover:font-black"
        :class="{
          'bg-sky-900 text-white font-black': isActive('rooms'),
          'text-slate-200': !isActive('rooms'),
        }"
        @click="navigateTo('rooms')"
      >
        Rooms
      </a>
      <a
        class="block p-4 cursor-pointer hover:font-black"
        :class="{
          'bg-sky-900 text-white font-black': isActive('roomFacilities'),
          'text-slate-200': !isActive('roomFacilities'),
        }"
        @click="navigateTo('roomFacilities')"
      >
        Room Facilities
      </a>
    </div>
  </div>
</template>

<script setup>
// import router
import { useRouter } from "vue-router";
const router = useRouter();
function navigateTo(route) {
  router.push(`/admin/${route}`);
}
function isActive(route) {
  return router.currentRoute.value.path === `/admin/${route}`;
}
</script>

<style scoped>
/* Tidak perlu menyertakan gaya khusus untuk hover karena Tailwind sudah menyediakannya secara default */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
</style>

<template>
  <div class="bg-gray-100">
    <div class="flex h-screen">
      <div class="flex w-52 bg-gray-200 h-full">
        <Sidebar />
      </div>
      <div class="p-5 w-full overflow-auto">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/admin/Sidebar.vue";
</script>

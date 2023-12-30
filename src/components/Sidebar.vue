<!-- components/Sidebar.vue -->
<template>
  <div class="w-full bg-slate-700">
    <a
      class="block p-4"
      :class="{
        'bg-sky-800 text-white font-black': isActive('dashboard'),
        'text-slate-200': !isActive('dashboard'),
      }"
      @click="navigateTo('dashboard')"
    >
      Dashboard
    </a>
    <a
      class="block p-4"
      :class="{
        'bg-sky-800 text-white font-black': isActive('rooms'),
        'text-slate-200': !isActive('rooms'),
      }"
      @click="navigateTo('rooms')"
    >
      Rooms
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(`/admin/${route}`);
    },
    isActive(route) {
      return this.$route.path.includes(route);
    },
  },
};
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

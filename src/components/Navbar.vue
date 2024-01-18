<template>
  <div class="bg-blue-500">
    <nav class="relative px-4 py-4 flex justify-between items-center bg-white">
      <a class="text-3xl font-bold leading-none" href="#">
        <HostelLogo />
      </a>
      <div class="lg:hidden">
        <button class="navbar-burger flex items-center text-blue-600 p-3">
          <svg
            class="block h-4 w-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <ul
        class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6"
      >
        <li>
          <a
            class="text-md font-bold text-blue-600 hover:text-blue-700"
            href="/"
            >Home</a
          >
        </li>
        <li class="text-gray-300">
          <NavItemGaps />
        </li>
        <li>
          <a class="text-sm text-gray-400 hover:text-gray-500" href="#"
            >Available Rooms</a
          >
        </li>
        <li class="text-gray-300">
          <NavItemGaps />
        </li>
        <li>
          <a class="text-sm text-gray-400 hover:text-gray-500" href="#"
            >Our Rooms</a
          >
        </li>
        <li class="text-gray-300">
          <NavItemGaps />
        </li>
        <li>
          <a class="text-sm text-gray-400 hover:text-gray-500" href="#"
            >Facilities</a
          >
        </li>
        <li class="text-gray-300">
          <NavItemGaps />
        </li>
        <li>
          <a class="text-sm text-gray-400 hover:text-gray-500" href="#"
            >Contact</a
          >
        </li>
      </ul>
      <div
        v-if="showDropdown"
        class="absolute top-12 right-5 bg-white border border-gray-200 rounded-md shadow-md mt-3"
      >
        <ul class="py-1">
          <li>
            <a
              threfo="/profile"
              class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
            >
              My Profile
            </a>
          </li>
          <li>
            <a
              @click="navigateTo(`/reservation/user/${user.userId}`)"
              class="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
            >
              My Reservations
            </a>
          </li>
          <li>
            <a
              href="/settings"
              class="block px-4 py-1 text-xs text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              @click="logout"
              class="my-2 block py-1 mx-2 bg-red-500 hover:bg-red-700 text-sm text-center text-white font-bold rounded-md transition duration-200"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
      <div v-if="isLoggedIn" class="flex items-center space-x-4">
        <div
          class="flex items-center space-x-4 cursor-pointer"
          @click="toggleDropdown"
        >
          <img
            v-show="user.avatar"
            :src="user.avatar"
            alt="User Avatar"
            class="h-8 w-8 rounded-full object-cover"
          />
          <span
            v-show="!user.avatar"
            class="h-8 w-8 bg-gray-300 rounded-full cursor-pointer"
          ></span>

          <div
            v-show="showDropdown"
            class="absolute top-12 right-15 bg-white border border-gray-200 rounded-md shadow-md"
          ></div>

          <span class="text-gray-900 text-sm font-bold">{{
            user.fullName
          }}</span>
        </div>
      </div>
      <div v-else>
        <a
          v-if="!isLoggedIn"
          class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
          href="/login"
        >
          Sign In
        </a>
        <a
          v-if="!isLoggedIn"
          class="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
          href="/register"
        >
          Sign up
        </a>
      </div>
    </nav>
  </div>
</template>

<script setup>
import HostelLogo from "@/components/icons/HostelLogo.vue";
import NavItemGaps from "@/components/icons/NavItemGaps.vue";

import { ref } from "vue";
import router from "@/router";

function navigateTo(route) {
  router.push(route);
}

const token = localStorage.getItem("token");
const decodedUser = decodeToken(token);
const user = ref(
  decodedUser || {
    fullName: "Yuda Saputra",
    avatar: "images/avatar.jpeg",
  }
);

console.log(user);
const isLoggedIn = ref(!!token);
console.log("isLoggedIn", isLoggedIn.value);

const showDropdown = ref(false);

// Function to toggle the dropdown visibility
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const logout = () => {
  // Remove token and user from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  isLoggedIn.value = false;
  router.push("/");

  // Toggle dropdown visibility
  showDropdown.value = false;
};

function decodeToken(token) {
  try {
    const [header, payload] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    const {
      userId,
      fullName,
      avatar = "./images/avatar.jpeg",
    } = decodedPayload;

    return { userId, fullName, avatar };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
</script>

<template>
  <article
    class="flex flex-wrap justify-between bg-white shadow-md rounded-md w-3/5 p-4 h-40"
  >
    <section class="card-info">
      <h2 class="text-lg font-bold">
        Room Number: {{ reservation.room.roomNumber }}
      </h2>

      <table class="table-auto">
        <tbody>
          <tr>
            <td class="pr-2 font-medium">Capacity</td>
            <td>: {{ reservation.room.capacity }}</td>
          </tr>
          <tr>
            <td class="pr-2 font-medium">Type</td>
            <td>: {{ reservation.room.type }}</td>
          </tr>
          <tr>
            <td class="pr-2 font-medium">Price</td>
            <td>: Rp{{ reservation.room.price }}</td>
          </tr>
        </tbody>
      </table>

      <ul class="flex flex-wrap space-x-3 mt-2">
        <li
          class="text-sm text-orange-500"
          v-for="facility in reservation.room.roomFacilityRelation"
          :key="facility.facilityId"
        >
          {{ facility.facility.name }}
        </li>
      </ul>
    </section>
    <section class="card-image">
      <picture>
        <img
          :src="
            getImageUrl(reservation.roomId, reservation.room.images[0].images)
          "
          alt="Room Image"
          class="w-48 object-cover rounded-md"
        />
      </picture>
    </section>
  </article>
</template>

<script setup>
import { defineProps } from "vue";
import { getRoomImageUrl } from "@/api/imageApi";

const { reservation } = defineProps({
  reservation: Object,
});

const getImageUrl = (roomId, imageName) => getRoomImageUrl(roomId, imageName);
</script>

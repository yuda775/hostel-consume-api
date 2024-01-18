<template>
  <article class="bg-white p-4 mx-auto mt-5 w-3/5">
    <div
      class="qr-code flex justify-center"
      v-if="reservation.status === 'paid'"
    >
      <QrcodeVue
        :value="reservation.id"
        :size="250"
        level="Q"
        render-as="svg"
      />
    </div>
    <section class="details-section py-2">
      <h2 class="text-lg font-bold">Reservation ID:</h2>
      <span class="text-gray-700">{{ reservation.id }}</span>
    </section>
    <hr />
    <section class="details-section py-2">
      <div class="details-item flex justify-between">
        <div>
          <strong class="block">Check-in</strong>
          <p>{{ reservation.checkin }}</p>
        </div>
        <div>
          <strong class="block">Check-out</strong>
          <p>{{ reservation.checkout }}</p>
        </div>
      </div>
    </section>
    <hr />
    <section class="details-section py-2">
      <strong class="block">Amount:</strong>
      <p>Rp{{ reservation.amount }}</p>
    </section>
    <hr />
    <section class="details-section py-2">
      <strong class="block">Status:</strong>
      <p>{{ reservation.status }}</p>
    </section>
    <hr />
    <section class="details-section py-2">
      <strong class="block">Guest Total:</strong>
      <p>{{ reservation.guestTotal }}</p>
    </section>

    <!-- Kondisional untuk tombol Pay Now -->
    <button
      v-if="reservation.status === 'pending'"
      @click="$emit('payNow')"
      class="bg-slate-500 text-white px-4 py-2 rounded-sm hover:bg-slate-700 w-full mt-5 font-bold"
    >
      Pay Now
    </button>
  </article>
</template>

<script setup>
import { defineProps } from "vue";
import QrcodeVue from "qrcode.vue";

const { reservation } = defineProps({
  reservation: Object,
});
</script>

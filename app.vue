<template>
  <div class="min-h-screen font-sans antialiased text-[var(--ink-soft)] bg-[var(--paper-cream)]">
    <!-- Atmosphere background -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-paper-grain opacity-[0.2]"></div>
      <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,246,236,0.8),rgba(255,247,241,0.95))]"></div>
      <div class="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,156,138,0.34),rgba(255,156,138,0))] blur-2xl"></div>
      <div class="absolute top-[24%] -right-24 w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(69,188,171,0.26),rgba(69,188,171,0))] blur-2xl"></div>
      <div class="absolute bottom-[-150px] left-[30%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,201,106,0.2),rgba(255,201,106,0))] blur-2xl"></div>
    </div>

    <Navbar />
    <main class="relative">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/layout/Navbar.vue';
import Footer from '~/components/layout/Footer.vue';
</script>

<style>
:root {
  --paper-cream: #fff6ec;
  --ink-strong: #2f2523;
  --ink-soft: #6a5b58;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--paper-cream);
}
</style>

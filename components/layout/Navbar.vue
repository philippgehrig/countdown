<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'border-b border-rose-200/60 bg-white/80 backdrop-blur-xl' : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="font-display text-lg md:text-xl font-semibold tracking-tight text-[var(--ink-strong)] hover:text-rose-700 transition-colors">
        Gina Countdown
      </NuxtLink>

      <nav v-if="isHomePage" class="hidden md:flex items-center gap-1.5">
        <a
          v-for="item in anchorItems"
          :key="item.id"
          :href="item.href"
          class="px-3.5 py-1.5 rounded-full text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink-strong)] hover:bg-white/70 transition-all duration-200"
          :class="{ 'bg-rose-100/85 text-rose-900': activeSection === item.id }"
          @click.prevent="scrollToSection(item.id)"
        >
          {{ item.label }}
        </a>
      </nav>

      <button
        class="md:hidden p-2 rounded-md text-[var(--ink-soft)] hover:text-[var(--ink-strong)] hover:bg-white/80 transition-all"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
      >
        <svg v-if="!mobileOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-smooth"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-smooth"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen && isHomePage" class="mobile-nav md:hidden border-b border-rose-200/70 bg-white/90 backdrop-blur-xl">
        <nav class="max-w-6xl mx-auto px-6 py-3 flex flex-col gap-1">
          <a
            v-for="item in anchorItems"
            :key="item.id"
            :href="item.href"
            class="px-3 py-2 rounded-lg text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink-strong)] hover:bg-rose-50 transition-all"
            @click.prevent="scrollToSection(item.id); mobileOpen = false"
          >
            {{ item.label }}
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const SCROLL_THRESHOLD = 16;
const NAVBAR_HEIGHT_OFFSET = 96;

const route = useRoute();
const mobileOpen = ref(false);
const scrolled = ref(false);
const activeSection = ref('countdown');

const isHomePage = computed(() => route.path === '/');

const anchorItems = [
  { id: 'countdown', label: 'Countdown', href: '#countdown' },
  { id: 'mission-control', label: 'Mission', href: '#mission-control' }
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const handleScroll = () => {
  scrolled.value = window.scrollY > SCROLL_THRESHOLD;

  const sections = anchorItems.map((item) => document.getElementById(item.id));
  const scrollY = window.scrollY + NAVBAR_HEIGHT_OFFSET;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    if (section && section.offsetTop <= scrollY) {
      activeSection.value = anchorItems[i].id;
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

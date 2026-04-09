<template>
  <div class="pb-20">
    <section id="countdown" class="relative pt-28 md:pt-36 pb-16 md:pb-24">
      <div class="max-w-6xl mx-auto px-6">
        <div class="max-w-3xl space-y-6 animate-fade-up">
          <p class="inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-white/70 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.24em] text-rose-600">
            Operation Gina: Reunion Countdown
          </p>

          <h1 class="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight text-[var(--ink-strong)]">
            Counting down to {{ formattedReunionDate }}
          </h1>

          <p class="text-lg md:text-xl leading-relaxed text-[var(--ink-soft)] max-w-2xl">
            This page exists for one very serious mission: survive the wait, keep morale high, and arrive at reunion day fully calibrated for maximum hug velocity.
          </p>
        </div>

        <div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <article
            v-for="item in countdownUnits"
            :key="item.label"
            class="rounded-3xl border border-rose-200/70 bg-white/80 backdrop-blur-sm p-5 md:p-6 shadow-[0_10px_30px_rgba(120,74,73,0.08)]"
          >
            <p class="text-4xl md:text-5xl font-mono font-bold text-[var(--ink-strong)]">
              {{ item.value }}
            </p>
            <p class="mt-2 text-xs md:text-sm uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              {{ item.label }}
            </p>
          </article>
        </div>

        <article class="mt-8 rounded-3xl border border-amber-200/80 bg-white/75 p-6 md:p-8 shadow-[0_14px_35px_rgba(120,74,73,0.1)]">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Current mission status</p>
          <p class="mt-2 text-xl md:text-2xl font-semibold text-[var(--ink-strong)]">
            {{ daysLeftMessage }}
          </p>
          <p class="mt-3 text-sm md:text-base text-[var(--ink-soft)]">
            If every song averages 3 minutes, there are roughly
            <span class="font-semibold text-[var(--ink-strong)]">{{ songsLeftLabel }}</span>
            songs left until hug o'clock.
          </p>
        </article>
      </div>
    </section>

    <section id="mission-control" class="py-10 md:py-14">
      <div class="max-w-6xl mx-auto px-6">
        <p class="text-xs font-mono uppercase tracking-[0.22em] text-teal-700">Mission Control</p>
        <h2 class="mt-3 font-display text-3xl md:text-5xl tracking-tight text-[var(--ink-strong)]">
          Reunion Intelligence Board
        </h2>

        <div class="mt-8 grid lg:grid-cols-2 gap-6">
          <article class="rounded-3xl border border-teal-200/70 bg-white/80 p-6 md:p-7 shadow-[0_12px_30px_rgba(34,121,111,0.1)]">
            <h3 class="text-xl md:text-2xl font-semibold text-[var(--ink-strong)]">Daily Forecast</h3>
            <p class="mt-3 text-lg leading-relaxed text-[var(--ink-soft)]">{{ dailyForecast }}</p>

            <ul class="mt-5 space-y-2 text-sm md:text-base text-[var(--ink-soft)]">
              <li>Estimated weekly date-night ideas left: <span class="font-semibold text-[var(--ink-strong)]">{{ dateNightsLeft }}</span></li>
              <li>Estimated random "thinking about Gina" moments today: <span class="font-semibold text-[var(--ink-strong)]">{{ randomThoughtsToday }}</span></li>
              <li>Official confidence level: <span class="font-semibold text-[var(--ink-strong)]">extremely optimistic</span></li>
            </ul>
          </article>

          <article class="rounded-3xl border border-rose-200/70 bg-white/80 p-6 md:p-7 shadow-[0_12px_30px_rgba(120,74,73,0.1)]">
            <h3 class="text-xl md:text-2xl font-semibold text-[var(--ink-strong)]">Progress to Reunion</h3>
            <p class="mt-3 text-base md:text-lg text-[var(--ink-soft)]">
              <span class="font-semibold text-[var(--ink-strong)]">{{ progressLabel }}</span> complete
            </p>

            <div class="mt-4 h-4 rounded-full bg-rose-100 overflow-hidden">
              <div
                class="h-full rounded-full bg-[linear-gradient(90deg,#ff7f6d,#ffb36d)] transition-all duration-700"
                :style="{ width: `${progressPercent}%` }"
              ></div>
            </div>

            <p class="mt-4 text-sm md:text-base text-[var(--ink-soft)]">
              <span v-if="isReunionDay">Timer complete. Reunion mode activated.</span>
              <span v-else>{{ days }} days, {{ hours }} hours, and {{ minutes }} minutes left.</span>
            </p>
          </article>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const reunionDate = new Date(2026, 5, 19, 0, 0, 0);
const timelineStartDate = new Date(2026, 3, 5, 0, 0, 0);

const forecastOptions = [
  'Cloudy with a 100% chance of smiling at old chat screenshots.',
  'Sunny bursts expected after hearing your reunion playlist.',
  'Mild turbulence from missing Gina, stable after snacks.',
  'Strong tailwind for countdown motivation and dramatic daydreaming.',
  'Clear skies for plotting the first post-reunion adventure.'
];

const now = ref(new Date());

let countdownTimer: ReturnType<typeof setInterval> | undefined;

const msRemaining = computed(() => Math.max(reunionDate.getTime() - now.value.getTime(), 0));
const isReunionDay = computed(() => msRemaining.value === 0);
const totalSeconds = computed(() => Math.floor(msRemaining.value / 1000));

const days = computed(() => Math.floor(totalSeconds.value / 86400));
const hours = computed(() => Math.floor((totalSeconds.value % 86400) / 3600));
const minutes = computed(() => Math.floor((totalSeconds.value % 3600) / 60));
const seconds = computed(() => totalSeconds.value % 60);

const countdownUnits = computed(() => [
  { label: 'Days', value: String(days.value).padStart(3, '0') },
  { label: 'Hours', value: String(hours.value).padStart(2, '0') },
  { label: 'Minutes', value: String(minutes.value).padStart(2, '0') },
  { label: 'Seconds', value: String(seconds.value).padStart(2, '0') }
]);

const progressPercent = computed(() => {
  const totalMs = reunionDate.getTime() - timelineStartDate.getTime();
  const elapsedMs = now.value.getTime() - timelineStartDate.getTime();
  const rawPercent = (elapsedMs / totalMs) * 100;
  return Math.min(100, Math.max(0, rawPercent));
});

const progressLabel = computed(() => `${progressPercent.value.toFixed(1)}%`);

const daysLeftMessage = computed(() => {
  if (isReunionDay.value) return 'Reunion mode unlocked. Execute hug protocol immediately.';
  if (days.value > 120) return 'Long game in progress. Stay brave, stay silly.';
  if (days.value > 60) return 'Momentum building. Playlist upgrades recommended.';
  if (days.value > 20) return 'Final stretch. Practice your dramatic arrival speech.';
  return 'Red alert: countdown has entered turbo mode.';
});

const songsLeft = computed(() => Math.ceil(msRemaining.value / (3 * 60 * 1000)));
const songsLeftLabel = computed(() => songsLeft.value.toLocaleString('en-GB'));
const dateNightsLeft = computed(() => Math.max(0, Math.ceil(days.value / 7)));
const randomThoughtsToday = computed(() => 25 + Number(seconds.value));

const dailyForecast = computed(() => {
  const dayIndex = Math.floor(now.value.getTime() / 86400000) % forecastOptions.length;
  return forecastOptions[dayIndex];
});

const formattedReunionDate = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format(reunionDate);

onMounted(() => {
  countdownTimer = window.setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  if (countdownTimer) {
    window.clearInterval(countdownTimer);
  }
});

definePageMeta({
  title: 'Countdown to Gina',
  description: 'A playful countdown website for the reunion on 19 June 2026.'
});
</script>

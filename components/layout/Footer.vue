<template>
  <footer class="relative border-t border-rose-200/70 py-10 md:py-12">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p class="font-display text-xl text-[var(--ink-strong)]">Countdown to Gina</p>
          <p class="text-sm text-[var(--ink-soft)] mt-1">Reunion date: 19 June 2026</p>
        </div>

        <p class="text-sm text-[var(--ink-soft)]">
          {{ footerStatus }}
        </p>

        <div class="flex flex-col items-start md:items-end gap-2">
          <div class="flex flex-wrap gap-4 text-xs text-[var(--ink-soft)]">
            <NuxtLink to="/policies/legal-notice" class="hover:text-[var(--ink-strong)] transition-colors">Legal Notice</NuxtLink>
            <NuxtLink to="/policies/privacy-policy" class="hover:text-[var(--ink-strong)] transition-colors">Privacy Policy</NuxtLink>
            <NuxtLink to="/policies/terms-of-use" class="hover:text-[var(--ink-strong)] transition-colors">Terms of Use</NuxtLink>
            <NuxtLink to="/policies/sitemap" class="hover:text-[var(--ink-strong)] transition-colors">Sitemap</NuxtLink>
          </div>
          <p class="text-xs text-[var(--ink-soft)]">
            &copy; {{ new Date().getFullYear() }} Philipp Gehrig
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const reunionDate = new Date(2026, 5, 19, 0, 0, 0);
const daysLeft = Math.max(0, Math.ceil((reunionDate.getTime() - Date.now()) / 86400000));

const footerStatus =
  daysLeft === 0
    ? 'Reunion mode active. Mission complete.'
    : `${daysLeft} days left until the next Gina hug.`;
</script>

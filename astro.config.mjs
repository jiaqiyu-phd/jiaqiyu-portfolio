// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Required for canonical URLs, absolute social-card URLs, and sitemap output.
  site: 'https://jiaqiyu.org',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});
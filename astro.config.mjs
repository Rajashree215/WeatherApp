// @ts-check
import { defineConfig } from 'astro/config';
import solidJS from '@astrojs/solid-js';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  devToolbar:{
    enabled: false
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [solidJS()],
  output: "server",
  adapter: netlify()
});
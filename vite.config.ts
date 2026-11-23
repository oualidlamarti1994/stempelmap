import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { cloudflare } from "@cloudflare/vite-plugin";
export default defineConfig({ base: './', plugins: [preact(), cloudflare()] });
import { defineConfig } from "fresh";
import tailwind from "@fresh/plugin-tailwind";

export default defineConfig({
  plugins: [tailwind()],
  build: {
    target: ["chrome99", "firefox99", "safari15"],
  },
  server: {
    experimentalDenoServe: true,
  },
});
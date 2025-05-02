import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "cyan",
    },
    "*": {
      fontFamily: "'Vazir', sens-serif",
    },
  },
  theme: {
    tokens: {
      fonts: {
        body: { value: "'Vazir', sens-serif" },
        heading: { value: "'Vazir', sens-serif" },
        Text: { value: "'Vazir', sens-serif" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

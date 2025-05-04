import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "cyan",
    },
    "*": {
      fontFamily: "'Montserrat', sens-serif",
    },
  },
  theme: {
    tokens: {
      fonts: {
        body: { value: "'Montserrat', sens-serif" },
        heading: { value: "'Montserrat', sens-serif" },
        Text: { value: "'Montserrat', sens-serif" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);

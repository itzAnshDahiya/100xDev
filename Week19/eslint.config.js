import type { Config } from "eslint";

const config: Config = {
  extends: "next/core-web-vitals",
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};

export default config;

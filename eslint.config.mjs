import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Enforce shadcn/ui component imports - temporarily disabled for initial setup
      // "no-restricted-imports": [
      //   "error",
      //   {
      //     patterns: [
      //       {
      //         group: ["@/components/*"],
      //         message: "Use @/components/ui/* for UI components instead of @/components/*"
      //       }
      //     ]
      //   }
      // ],
      // Prevent direct HTML elements where shadcn components exist - temporarily disabled
      // "no-restricted-syntax": [
      //   "error",
      //   {
      //     selector: "JSXElement[openingElement.name.name='button']",
      //     message: "Use Button component from @/components/ui/button instead of native button element"
      //   },
      //   {
      //     selector: "JSXElement[openingElement.name.name='input']",
      //     message: "Use Input component from @/components/ui/input instead of native input element"
      //   }
      // ]
    }
  }
];

export default eslintConfig;

import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

export default [
  // Main build
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.build.json",
        declaration: true,
        declarationDir: "dist",
        exclude: ["**/*.test.*", "**/*.stories.*", "app/**/*.ts", "app/**/*.tsx"], // Allow CSS in app
      }),
      babel({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        babelHelpers: "bundled",
        presets: [
          ["@babel/preset-env", { targets: "defaults" }],
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
        exclude: "node_modules/**",
      }),
      postcss({
        extensions: [".css"],
        extract: "styles.css", // Output to dist/styles.css
        minimize: true,
        sourceMap: true,
        include: ["src/**/*.css", "app/**/*.css"], // Include src and app CSS
        inject: false, // Disable automatic CSS injection to ensure extraction
        // Debugging: Log processed files
        onwrite: (details) => {
          console.log(`PostCSS writing to: ${details.dest}`);
        },
      }),
      terser(),
    ],
    external: ["react", "react-dom", "lucide-react"],
    // Enable debug logging
    logLevel: "debug",
  },
  // Type definitions
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
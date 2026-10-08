import { validateContent } from "../src/lib/content";

const errors = validateContent();
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Content schema and references are valid.");
}

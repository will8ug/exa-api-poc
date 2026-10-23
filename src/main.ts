#!/usr/bin/env node
import { Exa } from "exa-js";

const exa = new Exa();
const result = await exa.search(
  "recent techniques for improving retrieval in RAG systems",
  {
    type: "auto",
    contents: { highlights: true },
  }
);

for (const item of result.results) {
  console.log(item.title, item.url);
  console.log(item.highlights);
}

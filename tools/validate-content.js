"use strict";

const fs = require("node:fs");
const path = require("node:path");

global.window = {};
require(path.resolve(__dirname, "..", "dist", "content-data.js"));

const data = global.window.KW_DATA;
const errors = [];
const expectedCategories = ["mechanics", "submarines", "race-cars", "motorcycles", "music-culture"];

if (!data || typeof data !== "object") errors.push("KW_DATA is missing.");
if (!Array.isArray(data?.questions)) errors.push("questions must be an array.");
if (!Array.isArray(data?.conversationPrompts)) errors.push("conversationPrompts must be an array.");
if (!Array.isArray(data?.stories)) errors.push("stories must be an array.");
if (!Array.isArray(data?.exploreFacts)) errors.push("exploreFacts must be an array.");

const allItems = [
  ...(data?.questions || []),
  ...(data?.conversationPrompts || []),
  ...(data?.stories || []),
  ...(data?.exploreFacts || [])
];
const ids = new Set();
for (const item of allItems) {
  if (!item.id || ids.has(item.id)) errors.push(`Missing or duplicate id: ${item.id || "(blank)"}.`);
  ids.add(item.id);
}

for (const question of data?.questions || []) {
  if (!expectedCategories.includes(question.category)) errors.push(`${question.id}: invalid category.`);
  if (!["easy", "medium", "challenge"].includes(question.difficulty)) errors.push(`${question.id}: invalid difficulty.`);
  if (!question.question || !question.hint || !question.explanation) errors.push(`${question.id}: missing text.`);
  if (!Array.isArray(question.choices) || question.choices.length !== 4) errors.push(`${question.id}: requires four choices.`);
  if (new Set(question.choices || []).size !== question.choices?.length) errors.push(`${question.id}: duplicate choices.`);
  if (question.choices?.filter((choice) => choice === question.answer).length !== 1) errors.push(`${question.id}: answer must appear exactly once.`);
  if (question.choices?.[question.answerIndex] !== question.answer) errors.push(`${question.id}: answerIndex mismatch.`);
}

for (const category of expectedCategories) {
  const count = (data?.questions || []).filter((question) => question.category === category).length;
  if (count < 10) errors.push(`${category}: expected at least 10 questions, found ${count}.`);
}

for (const prompt of data?.conversationPrompts || []) {
  if (!prompt.title || !prompt.prompt || !prompt.gentleCue) errors.push(`${prompt.id}: incomplete conversation prompt.`);
}
for (const story of data?.stories || []) {
  if (!story.title || !story.narration || story.narration.length < 180) errors.push(`${story.id}: story is too short or incomplete.`);
}
for (const fact of data?.exploreFacts || []) {
  if (!fact.title || !fact.fact || !fact.whyItMatters) errors.push(`${fact.id}: incomplete explore fact.`);
}

const index = fs.readFileSync(path.resolve(__dirname, "..", "dist", "index.html"), "utf8");
for (const required of ["content-data.js?v=11", "app.js?v=11", "styles.css?v=11", "data-nav=\"home\"", "data-nav=\"progress\"", "data-nav=\"favorites\"", "data-nav=\"settings\""]) {
  if (!index.includes(required)) errors.push(`index.html is missing ${required}.`);
}

for (const filename of ["kenny-down-below.mp3", "kenny-king-open-road.mp3", "kenny-sailor-below.mp3"]) {
  const audioPath = path.resolve(__dirname, "..", "dist", "assets", "audio", filename);
  if (!fs.existsSync(audioPath) || fs.statSync(audioPath).size < 100_000) errors.push(`Missing or incomplete song file: ${filename}.`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const counts = Object.fromEntries(expectedCategories.map((category) => [category, data.questions.filter((question) => question.category === category).length]));
console.log(`Validated ${data.questions.length} questions, ${data.conversationPrompts.length} prompts, ${data.stories.length} stories, and ${data.exploreFacts.length} facts.`);
console.log(counts);


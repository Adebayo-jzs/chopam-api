import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";
import slugify from "slugify";

const DB = join(dirname(fileURLToPath(import.meta.url)), "../db/foods.json");

const foods = [
  
];

const seeded = foods.map((f) => ({
  id: uuid(),
  name: f.name,
  slug: slugify(f.name, { lower: true, strict: true }),
  description: f.description,
  region: f.region,
  tribe: f.tribe,
  category: f.category,
  tags: f.tags,
  recipe: f.recipe,
  createdAt: new Date().toISOString(),
}));

writeFileSync(DB, JSON.stringify(seeded, null, 2));
console.log(`✅ Seeded ${seeded.length} foods into foods.json`);
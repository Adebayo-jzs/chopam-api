import { Router } from "express";
import { v4 as uuid } from "uuid";
import slugify from "slugify";
import { read, write } from "../lib/db.js";
import { ok, err } from "../lib/response.js";

const router = Router();

// GET /foods
router.get("/", (req, res) => {
  let foods = read();
  const { q, region, tribe, category, tag , limit } = req.query;

  if (q) {
    const query = q.toLowerCase();
    foods = foods.filter(
      (f) =>
        f.name.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query)
    );
  }
  if (region) foods = foods.filter((f) => f.region?.toLowerCase() === region.toLowerCase());
  if (tribe) foods = foods.filter((f) => f.tribe?.map((t) => t.toLowerCase()).includes(tribe.toLowerCase()));
  if (category) foods = foods.filter((f) => f.category?.toLowerCase() === category.toLowerCase());
  if (tag) foods = foods.filter((f) => f.tags?.includes(tag.toLowerCase()));
  if (limit) foods = foods.slice(0, Number(limit)); else foods = foods.slice(0, 15);

  // Strip recipe from list view — keep it lean
  const list = foods.map(({ recipe, ...f }) => f);
  ok(res, { total: list.length, foods: list });
});

// GET /foods/:slug
router.get("/:slug", (req, res) => {
  const food = read().find((f) => f.slug === req.params.slug);
  if (!food) return err(res, "Food not found", 404);
  ok(res, food);
});
// router.get("/:id", (req, res) => {
//   const food = read().find((f) => f.id === req.params.id);
//   if (!food) return err(res, "Food not found", 404);
//   ok(res, food);
// });
// // GET /foods/:identifier
// router.get("/:identifier", (req, res) => {
//   const identifier = req.params.identifier;
//   const food = read().find((f) => f.slug === identifier || f.id === identifier);
//   if (!food) return err(res, "Food not found", 404);
//   ok(res, food);
// });

// // POST /foods
// router.post("/", (req, res) => {
//   const { name, description, region, tribe, category, tags, recipe } = req.body;
//   if (!name || !category) return err(res, "name and category are required");

//   const slug = slugify(name, { lower: true, strict: true });
//   const foods = read();
//   if (foods.find((f) => f.slug === slug)) return err(res, "Food already exists");

//   const food = {
//     id: uuid(),
//     name,
//     slug,
//     description: description || "",
//     region: region || null,
//     tribe: Array.isArray(tribe) ? tribe : tribe ? [tribe] : [],
//     category,
//     tags: tags || [],
//     recipe: recipe || null,
//     createdAt: new Date().toISOString(),
//   };

//   foods.push(food);
//   write(foods);
//   ok(res, food, 201);
// });

// // PUT /foods/:slug
// router.put("/:slug", (req, res) => {
//   const foods = read();
//   const idx = foods.findIndex((f) => f.slug === req.params.slug);
//   if (idx === -1) return err(res, "Food not found", 404);

//   foods[idx] = { ...foods[idx], ...req.body, updatedAt: new Date().toISOString() };
//   write(foods);
//   ok(res, foods[idx]);
// });

// // DELETE /foods/:slug
// router.delete("/:slug", (req, res) => {
//   const foods = read();
//   const idx = foods.findIndex((f) => f.slug === req.params.slug);
//   if (idx === -1) return err(res, "Food not found", 404);

//   const [removed] = foods.splice(idx, 1);
//   write(foods);
//   ok(res, { message: `"${removed.name}" deleted` });
// });

// GET /foods/by/ingredient?name=palm oil
router.get("/by/ingredient", (req, res) => {
  const { name } = req.query;
  if (!name) return err(res, "name query param required");

  const foods = read().filter((f) =>
    f.recipe?.ingredients?.some((i) =>
      i.name.toLowerCase().includes(name.toLowerCase())
    )
  );

  ok(res, { total: foods.length, foods: foods.map(({ recipe, ...f }) => f) });
});

export default router;
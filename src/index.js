import express from "express";
import cors from "cors";
import foodsRouter from "./routes/foods.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/foods", foodsRouter);

app.get("/", (_req, res) => {
  res.json({
    name: "NaijaRecipes API",
    version: "2.0.0",
    endpoints: {
      "GET /foods": "List all foods (query: q, region, tribe, category, tag, limit)",
      "GET /foods/:slug": "Single food with full recipe + ingredients",
      "GET /foods/by/ingredient?name=": "Foods that use an ingredient",
      "POST /foods": "Create a food",
      "PUT /foods/:slug": "Update a food",
      "DELETE /foods/:slug": "Delete a food",
    },
  });
});

app.use((_req, res) => res.status(404).json({ success: false, error: "Not found" }));

app.listen(PORT, () => console.log(`🍲 NaijaRecipes API → http://localhost:${PORT}`));
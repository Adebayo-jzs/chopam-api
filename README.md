# 🍲 NaijaRecipes API

A REST API for Nigerian foods and recipes — built with Express.js and a flat JSON database.

## Getting Started

```bash
npm install
npm run seed    # populate the database with 20 foods + recipes
npm run dev     # start with hot reload
```

Server runs on `http://localhost:3000`

---

## Endpoints

### Foods
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/foods` | List all foods |
| GET | `/foods?q=egusi` | Search by name/tag/description |
| GET | `/foods?region=North` | Filter by region |
| GET | `/foods?tribe=Yoruba` | Filter by tribe |
| GET | `/foods?category=soup` | Filter by category |
| GET | `/foods?tag=festive` | Filter by tag |
| GET | `/foods?page=1&limit=10` | Paginate |
| GET | `/foods/categories` | All unique categories |
| GET | `/foods/regions` | All unique regions |
| GET | `/foods/:slug` | Single food + recipe |
| POST | `/foods` | Create a food |
| PUT | `/foods/:slug` | Update a food |
| DELETE | `/foods/:slug` | Delete a food |

### Recipes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/recipes` | All recipes |
| GET | `/recipes/:id` | Single recipe (enriched) |
| POST | `/foods/:slug/recipe` | Add recipe to a food |
| PUT | `/recipes/:id` | Update recipe |
| DELETE | `/recipes/:id` | Delete recipe |

### Ingredients
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/ingredients` | All ingredients |
| GET | `/ingredients?q=palm` | Search ingredients |
| GET | `/ingredients/:id/foods` | Foods using this ingredient |
| POST | `/ingredients` | Add an ingredient |

---

## Example Requests

### Get Jollof Rice with its recipe
```
GET /foods/jollof-rice
```

### Search for soups
```
GET /foods?category=soup
```

### Get Yoruba foods
```
GET /foods?tribe=Yoruba
```

### Find all foods that use palm oil
```
GET /ingredients/{palm-oil-id}/foods
```

### Add a new food
```json
POST /foods
{
  "name": "Bole",
  "description": "Roasted plantain with fish, popular in Rivers State",
  "region": "South South",
  "tribe": ["Ijaw", "Kalabari"],
  "category": "street food",
  "tags": ["street food", "grilled"]
}
```

---

## Data Structure

### Food
```json
{
  "id": "uuid",
  "name": "Egusi Soup",
  "slug": "egusi-soup",
  "description": "...",
  "region": "Nationwide",
  "tribe": ["Yoruba", "Igbo"],
  "category": "soup",
  "tags": ["everyday", "festive"],
  "imageUrl": null,
  "createdAt": "ISO date"
}
```

### Recipe
```json
{
  "id": "uuid",
  "foodId": "uuid",
  "servings": 6,
  "prepTime": 20,
  "cookTime": 60,
  "difficulty": "medium",
  "steps": ["Step 1...", "Step 2..."],
  "tips": "...",
  "variations": ["..."],
  "ingredients": [
    {
      "ingredientId": "uuid",
      "quantity": "2",
      "unit": "cups",
      "notes": null
    }
  ]
}
```

### Ingredient
```json
{
  "id": "uuid",
  "name": "Palm Oil",
  "localName": "Mmanu Nri",
  "substitutes": [],
  "isSpice": false,
  "diasporaNote": "Available in most African/Asian stores."
}
```

---

## Tech Stack

- **Runtime**: Node.js (ESM)
- **Framework**: Express.js
- **Database**: Flat JSON files
- **ID generation**: UUID v4
- **Slugs**: Slugify

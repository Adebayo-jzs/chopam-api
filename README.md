# ChopAm API

A REST API for Nigerian foods and recipes — built with Express.js and a flat JSON database.

## Getting Started

```bash
npm install
npm run seed    # populate the database with 20 foods + recipes
npm run dev     # start with hot reload
```

Server runs on `http://localhost:8080`

---

## Endpoints

| Method | Route                                | Description                                |
| ------ | ------------------------------------ | ------------------------------------------ |
| GET    | `/`                                  | API info (name, version, endpoints)        |
| GET    | `/foods`                             | List all foods                             |
| GET    | `/foods?q=egusi`                     | Search by name or description              |
| GET    | `/foods?region=North`                | Filter by region                           |
| GET    | `/foods?tribe=Yoruba`                | Filter by tribe                            |
| GET    | `/foods?category=soup`               | Filter by category                         |
| GET    | `/foods?tag=festive`                 | Filter by tag                              |
| GET    | `/foods?limit=10`                    | Limit results (default: 15)                |
| GET    | `/foods/:slug`                       | Single food with full recipe + ingredients |
| GET    | `/foods/by/ingredient?name=palm+oil` | Foods that use a specific ingredient       |

> **Note**: All query parameters on `GET /foods` can be combined (e.g., `?category=soup&tribe=Igbo&limit=5`).

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
GET /foods/by/ingredient?name=palm+oil
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
  "recipe": { ... },
  "createdAt": "ISO date"
}
```

### Recipe (nested inside Food)

```json
{
  "servings": 6,
  "prepTime": 20,
  "cookTime": 60,
  "difficulty": "medium",
  "tips": "...",
  "variations": ["..."],
  "ingredients": [
    {
      "name": "Palm Oil",
      "quantity": "½ cup",
      "substitutes": ["vegetable oil"],
      "notes": null
    }
  ],
  "steps": [{ "order": 1, "instruction": "Step 1..." }]
}
```

---

## Response Format

All responses follow a consistent JSON envelope:

```json
{
  "success": true,
  "data": { ... }
}
```

Errors return:

```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

---

## Tech Stack

- **Runtime**: Node.js (ESM)
- **Framework**: Express.js
- **Database**: Flat JSON files
- **ID generation**: UUID v4
- **Slugs**: Slugify

---

## Documentation

Full API documentation is available in the `chopam-docs/` directory, built with [Mintlify](https://mintlify.com).

```bash
cd ../chopam-docs
npm i -g mint
mint dev
```

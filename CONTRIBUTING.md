# 🤝 Contributing to ChopAm API

Thanks for your interest in contributing to **ChopAm**! Whether it's fixing a bug, adding a new Nigerian dish, or improving the code — every contribution is welcome. 🇳🇬

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Adding a New Food / Recipe](#adding-a-new-food--recipe)
- [Coding Guidelines](#coding-guidelines)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)
- Git

### Setup

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/chopam.git
cd chopam/backend

# 2. Install dependencies
npm install

# 3. Seed the database (populates db/foods.json with sample data)
npm run seed

# 4. Start the dev server (auto-restarts on file changes)
npm run dev
```

The API should now be running at **http://localhost:8080**.

---

## Project Structure

```
backend/
├── db/
│   └── foods.json          # Flat-file JSON database (auto-generated via seed)
├── scripts/
│   └── seed.js             # Database seeder — adds 20 sample foods + recipes
├── src/
│   ├── index.js            # Express app entry point
│   ├── lib/
│   │   ├── db.js           # Read/write helpers for foods.json
│   │   └── response.js     # Standardised ok() / err() response helpers
│   └── routes/
│       └── foods.js        # All /foods endpoints
├── package.json
├── .gitignore
├── README.md
├── CONTRIBUTING.md          # ← You are here
├── CODE_OF_CONDUCT.md
└── LICENSE
```

---

## Development Workflow

1. **Create a branch** from `main`:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** — keep them focused and atomic.

3. **Test manually** by hitting the API with a tool like curl, Postman, or the browser:

   ```bash
   # List all foods
   curl http://localhost:8080/foods

   # Get a specific food
   curl http://localhost:8080/foods/jollof-rice

   # Search
   curl "http://localhost:8080/foods?q=egusi"
   ```

4. **Commit** using the [commit convention](#commit-convention) below.

5. **Push** and open a Pull Request.

---

## Adding a New Food / Recipe

One of the easiest ways to contribute is by adding more Nigerian dishes! Here's how:

1. Open `scripts/seed.js`.
2. Add a new food object to the `foods` array following this schema:

```js
{
  name: "Amala",
  description: "A thick, brown paste made from yam flour, popular among the Yoruba.",
  region: "Southwest",
  tribe: ["Yoruba"],
  category: "swallow",
  tags: ["everyday", "traditional"],
  recipe: {
    servings: 4,
    prepTime: 5,        // in minutes
    cookTime: 15,       // in minutes
    difficulty: "easy", // easy | medium | hard
    tips: "Stir continuously to avoid lumps.",
    variations: ["Amala made with plantain flour (Amala ogede)"],
    ingredients: [
      { name: "Yam Flour", quantity: "2 cups", substitutes: ["plantain flour"], notes: null },
      { name: "Water",     quantity: "4 cups", substitutes: [],                  notes: "Boiling" }
    ],
    steps: [
      { order: 1, instruction: "Boil water in a pot." },
      { order: 2, instruction: "Reduce heat and gradually add the yam flour, stirring vigorously." },
      { order: 3, instruction: "Continue stirring until smooth and firm. Serve with soup." }
    ]
  }
}
```

3. Run `npm run seed` to regenerate `db/foods.json`.
4. Verify your addition: `curl http://localhost:8080/foods/<your-food-slug>`.

> **Tip**: Use authentic names, descriptions, and ingredients. If you're unsure, cite your source in the PR description!

---

## Coding Guidelines

| Rule                | Details                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| **Module system**   | ESM (`import`/`export`) — no `require()`                                                            |
| **Style**           | Use clear, readable code. No semicolons are optional — be consistent (this project uses semicolons) |
| **Naming**          | camelCase for variables/functions, PascalCase for classes                                           |
| **Response format** | Always use `ok(res, data)` and `err(res, message, status)` from `src/lib/response.js`               |
| **Database access** | Use `read()` and `write()` from `src/lib/db.js`                                                     |
| **Error handling**  | Return meaningful error messages with appropriate HTTP status codes                                 |
| **No external DB**  | We intentionally use a flat JSON file — keep it simple                                              |

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>
```

### Types

| Type       | When to use                              |
| ---------- | ---------------------------------------- |
| `feat`     | A new feature or endpoint                |
| `fix`      | A bug fix                                |
| `data`     | Adding/updating food data in the seed    |
| `docs`     | Documentation changes                    |
| `refactor` | Code restructuring (no behaviour change) |
| `chore`    | Maintenance (deps, configs, etc.)        |

### Examples

```
feat(foods): add pagination support to GET /foods
fix(foods): handle missing tribe field gracefully
data(seed): add Amala and Tuwo Shinkafa recipes
docs(readme): update endpoint table with new routes
```

---

## Pull Request Process

1. **Fill out the PR template** — describe what you changed and why.
2. **Keep PRs small and focused** — one feature or fix per PR.
3. **Ensure the server starts** without errors (`npm run dev`).
4. **Link any related issues** (e.g., `Closes #12`).
5. A maintainer will review your PR and may request changes.

### PR Title Format

Use the same format as commit messages:

```
feat(foods): add Amala recipe to seed data
```

---

## Reporting Issues

Found a bug or have a feature idea? [Open an issue](../../issues) with:

- **Bug reports**: Steps to reproduce, expected vs actual behavior, and your Node.js version.
- **Feature requests**: A clear description of the feature and why it would be useful.
- **Data corrections**: If a recipe or food description is inaccurate, let us know!

---

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing. We're committed to maintaining a welcoming, inclusive community.

---

**Thank you for helping celebrate Nigerian cuisine through code! 🎉**

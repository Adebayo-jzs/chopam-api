import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const DB = join(dirname(fileURLToPath(import.meta.url)), "../../db/foods.json");

export const read = () => JSON.parse(readFileSync(DB, "utf-8"));

export const write = (data) => writeFileSync(DB, JSON.stringify(data, null, 2));
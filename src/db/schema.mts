import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const products = pgTable("product", {
  id: serial("id").primaryKey(),
  name: text("name"),
  supplier: text("supplier"),
  description: text("description"),
  stock: integer("stock"),
  brand: text("brand"),
  price: integer("price"),
});

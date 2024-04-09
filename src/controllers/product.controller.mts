import express, { Request, Response } from "express";
import { eq, ilike } from "drizzle-orm";

import { db } from "../db/index.mjs";
import { products } from "../db/schema.mjs";

const router = express.Router();
type InsertProduct = typeof products.$inferInsert;

router.get("/", async (_request: Request, response: Response) => {
  response.json({ result: await db.query.products.findMany() });
});

router.get("/search", async (request: Request, response: Response) => {
  const { query } = request.query;

  if (typeof query !== "string") {
    response.status(400).json({ message: "Invalid query." });
  } else
    response.json({
      result: await db.query.products.findMany({
        where: ilike(products.name, `%${query}%`),
      }),
    });
});

router.get("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  if (!id) {
    response.status(400).json({ message: "Missing identifier." });
  } else
    response.json({
      result: await db.query.products.findFirst({
        where: eq(products.id, Number.parseInt(id)),
      }),
    });
});

router.post("/", async (request: Request, response: Response) => {
  const body: InsertProduct = request.body;
  response.status(201).json({
    result: await db
      .insert(products)
      .values({ ...body })
      .returning(),
  });
});

router.put("/:id", async (request: Request, response: Response) => {
  const body: InsertProduct = request.body;
  const { id } = request.params;
  if (!id) {
    response.status(400).json({ message: "Missing identifier." });
  } else
    response.json({
      result: await db
        .update(products)
        .set({ ...body })
        .where(eq(products.id, Number.parseInt(id)))
        .returning(),
    });
});

router.delete("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  const { rowCount } = await db
    .delete(products)
    .where(eq(products.id, Number.parseInt(id)));
  if (rowCount > 0) {
    response.json({
      message: "Product deleted successfully.",
    });
  } else response.status(501).json({ message: "Failed to delete product." });
});

export default router;

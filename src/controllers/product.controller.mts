import express, { Request, Response } from "express";
import { eq, ilike } from "drizzle-orm";

import { db } from "../db/index.mjs";
import { products } from "../db/schema.mjs";

const router = express.Router();
type InsertProduct = typeof products.$inferInsert

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

router.put("/", async (request: Request, response: Response) => {
  const body: InsertProduct = request.body;
  if (!body.id) {
    response.status(400).json({ message: "Missing identifier." });
  } else
    response.json({
      result: await db
        .update(products)
        .set({ ...body })
        .where(eq(products.id, body.id))
        .returning(),
    });
});

router.delete("/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({
    result: await db
      .delete(products)
      .where(eq(products.id, Number.parseInt(id)))
      .returning({ id: products.id }),
  });
});

export default router;

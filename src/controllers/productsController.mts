import express, { Request, Response } from "express";
import Product from "../models/Product.mjs";

let products: Product[] = [];

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json(products);
});

router.post("/create", (req: Request, res: Response) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.get("/productName", (req: Request, res: Response) => {
  const getProduct = req.query.name;
  if (getProduct === undefined || Array.isArray(getProduct)) {
    res.status(501);
  } else {
    const product = products.filter((product) => product.name === getProduct);
    res.json(product);
  }
});

router.put("/", (req: Request, res: Response) => {});

export default router;

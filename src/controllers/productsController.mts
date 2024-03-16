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

router.put("/:productName", (req: Request, res: Response) => {
  const productName: string = req.params.productName;
  const updatedProduct: Product = req.body;
  let found = false;
  products = products.map((product) => {
    if (product.name === productName) {
      found = true;
      return { ...product, ...updatedProduct };
    }
    return product;
  });
  if (found) {
    res.json({ message: "Product updated successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

router.delete("/:productName", (req: Request, res: Response) => {
  const productName: string = req.params.productName;
  const initialLength = products.length;
  products = products.filter((product) => product.name !== productName);
  if (products.length < initialLength) {
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export default router;

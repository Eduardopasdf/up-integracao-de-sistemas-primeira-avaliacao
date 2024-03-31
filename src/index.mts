import express from "express";
import productController from "./controllers/product.controller.mjs";

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_request, response) => {
  response.send("Hello World!");
});

app.use("/product", productController);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

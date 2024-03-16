import express from "express";
import productController from "./controllers/productsController.mjs";

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productController);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

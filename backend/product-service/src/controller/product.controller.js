import Product from "../models/product.model.js";

// CREATE PRODUCT (ADMIN)
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  res.json(product);
};

// UPDATE PRODUCT (ADMIN)
export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

// DELETE PRODUCT (ADMIN)
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

//reduce stock
export const reduceStock = async (req, res) => {
  const { quantity } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product || product.stock < quantity) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  product.stock -= quantity;
  await product.save();

  res.json({ message: "Stock updated" });
};

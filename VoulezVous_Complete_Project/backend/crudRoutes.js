
const express = require('express');

const router = express.Router();

// Mock database for products
const products = [];

// Get all products
router.get('/products', (req, res) => {
  res.json(products);
});

// Add a new product
router.post('/products', (req, res) => {
  const { name, description, price, stock } = req.body;
  const newProduct = { id: products.length + 1, name, description, price, stock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product
router.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  const product = products.find(p => p.id === parseInt(id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stock = stock || product.stock;
  res.json(product);
});

// Delete a product
router.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted' });
});

module.exports = router;

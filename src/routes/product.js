import express from 'express';
import { Product } from '../models/Product.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all products
router.get('/', authenticate, async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Get product by id
router.get('/:id', authenticate, async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Create new product
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await Product.create({ name, description, price });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: 'Invalid product data' });
  }
});

// Update product
router.put('/:id', authenticate, async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  try {
    const { name, description, price } = req.body;
    await product.update({ name, description, price });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Invalid product data' });
  }
});

// Delete product
router.delete('/:id', authenticate, async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  await product.destroy();
  res.json({ message: 'Product deleted' });
});

export default router;

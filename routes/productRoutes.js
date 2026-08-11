const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. Crear un producto (POST)
router.post('/', async (req, res) => {
    try {
        const { name, sku, quantity, price } = req.body;
        const newProduct = new Product({ name, sku, quantity, price });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El código SKU ya existe en el sistema.' });
        }
        res.status(400).json({ message: error.message });
    }
});

// 2. Obtener todos los productos (GET)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Obtener un producto por ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: 'ID no válido o error de servidor' });
    }
});

// 4. Actualizar un producto (PUT)
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 5. Eliminar un producto (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente del inventario' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
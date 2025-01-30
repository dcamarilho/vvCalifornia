
const express = require('express');
const { verifyRole } = require('./authRoutes');

const router = express.Router();

// Mock inventory with RFID tracking
let inventory = [
    { id: 1, name: "Product A", rfid: "RFID12345", stock: 10 },
    { id: 2, name: "Product B", rfid: "RFID67890", stock: 5 },
];

// Register a new RFID tag to a product (Admin only)
router.post('/rfid/register', verifyRole('admin'), (req, res) => {
    const { productId, rfidTag } = req.body;
    const product = inventory.find(p => p.id === parseInt(productId));

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    product.rfid = rfidTag;
    res.json({ message: 'RFID registered successfully', product });
});

// Process RFID scan (Automated stock update)
router.post('/rfid/scan', (req, res) => {
    const { rfidTag } = req.body;
    const product = inventory.find(p => p.rfid === rfidTag);

    if (!product) {
        return res.status(404).json({ message: 'RFID tag not found' });
    }

    // Simulate removing one unit from stock when scanned
    if (product.stock > 0) {
        product.stock -= 1;
        return res.json({ message: 'Stock updated', product });
    } else {
        return res.status(400).json({ message: 'Out of stock' });
    }
});

// Get inventory with RFID status
router.get('/rfid/inventory', verifyRole('admin'), (req, res) => {
    res.json(inventory);
});

module.exports = router;

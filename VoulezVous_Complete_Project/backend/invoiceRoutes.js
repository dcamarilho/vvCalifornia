
const express = require('express');
const axios = require('axios');
const { verifyRole } = require('./authRoutes');

const router = express.Router();

// Mock database for orders with invoice status
const orders = [
    { id: 1, customer_id: 2, total_price: 100, status: 'pending', invoice_issued: false },
];

const INVOICEXPRESS_API_KEY = process.env.INVOICEXPRESS_API_KEY || 'your_api_key_here';
const INVOICEXPRESS_ACCOUNT = process.env.INVOICEXPRESS_ACCOUNT || 'your_account_here';

// Issue an invoice for a specific order
router.post('/orders/:id/invoice', verifyRole('admin'), async (req, res) => {
    const { id } = req.params;
    const order = orders.find(o => o.id === parseInt(id));

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    if (order.invoice_issued) {
        return res.status(400).json({ message: 'Invoice already issued for this order' });
    }

    try {
        const invoiceData = {
            invoice: {
                date: new Date().toISOString().split('T')[0],
                due_date: new Date().toISOString().split('T')[0],
                client: {
                    name: "VoulezVous Client",
                    code: `Client-${order.customer_id}`
                },
                items: [
                    {
                        name: "Order Payment",
                        unit_price: order.total_price,
                        quantity: 1,
                        tax: 23
                    }
                ]
            }
        };

        const response = await axios.post(
            `https://${INVOICEXPRESS_ACCOUNT}.app.invoicexpress.com/invoices.json`,
            invoiceData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${INVOICEXPRESS_API_KEY}`
                }
            }
        );

        // Mark order as invoiced
        order.invoice_issued = true;

        res.json({ message: 'Invoice successfully issued', invoice: response.data });
    } catch (error) {
        res.status(500).json({ message: 'Error issuing invoice', error: error.response?.data || error.message });
    }
});

module.exports = router;

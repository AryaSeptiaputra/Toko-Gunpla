const express = require('express');
const router = express.Router();
const { productValidation, validationMiddleware } = require('../middlewares/validationMiddleware'); // Memastikan middleware validasi diimpor dengan benar
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware'); // Mengimpor authMiddleware dan adminMiddleware dengan benar
const itemController = require('../controllers/itemController');

// Route untuk mendapatkan semua produk (bisa diakses oleh admin dan pelanggan)
router.get('/', itemController.getAllItems);

// Route untuk menambahkan produk (hanya bisa diakses oleh admin)
router.post('/', authMiddleware, adminMiddleware, validationMiddleware(productValidation), itemController.createItem);

// Route untuk mengedit produk (hanya bisa diakses oleh admin)
router.put('/:id', authMiddleware, adminMiddleware, validationMiddleware(productValidation), itemController.updateItem);

// Route untuk menghapus produk (hanya bisa diakses oleh admin)
router.delete('/:id', authMiddleware, adminMiddleware, itemController.deleteItem);

module.exports = router;

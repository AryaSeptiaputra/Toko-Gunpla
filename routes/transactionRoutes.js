const express = require('express');
const router = express.Router();
const { transactionValidation, validationMiddleware } = require('../middlewares/validationMiddleware');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const transactionController = require('../controllers/transactionController');

// Route untuk mendapatkan semua transaksi (hanya bisa diakses oleh admin)
router.get('/', authMiddleware, adminMiddleware, transactionController.getAllTransactions);

// Route untuk membuat transaksi (hanya bisa diakses oleh admin)
router.post('/', authMiddleware, adminMiddleware, validationMiddleware(transactionValidation), transactionController.createTransaction);

// Route untuk mengedit transaksi (hanya bisa diakses oleh admin)
router.put('/:id', authMiddleware, adminMiddleware, validationMiddleware(transactionValidation), transactionController.updateTransaction);

// Route untuk menghapus transaksi (hanya bisa diakses oleh admin)
router.delete('/:id', authMiddleware, adminMiddleware, transactionController.deleteTransaction);

module.exports = router;

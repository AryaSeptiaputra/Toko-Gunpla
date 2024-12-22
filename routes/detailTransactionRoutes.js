const express = require('express');
const router = express.Router();
const { detailTransactionValidation, validationMiddleware } = require('../middlewares/validationMiddleware');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const detailTransactionController = require('../controllers/detailTransactionController');

// Route untuk mendapatkan semua detail transaksi (hanya bisa diakses oleh admin)
router.get('/', authMiddleware, adminMiddleware, detailTransactionController.getAllDetailTransactions);

// Route untuk membuat detail transaksi (hanya bisa diakses oleh admin)
router.post('/', authMiddleware, adminMiddleware, validationMiddleware(detailTransactionValidation), detailTransactionController.createDetailTransaction);

// Route untuk mengedit detail transaksi (hanya bisa diakses oleh admin)
router.put('/:id', authMiddleware, adminMiddleware, validationMiddleware(detailTransactionValidation), detailTransactionController.updateDetailTransaction);

// Route untuk menghapus detail transaksi (hanya bisa diakses oleh admin)
router.delete('/:id', authMiddleware, adminMiddleware, detailTransactionController.deleteDetailTransaction);

module.exports = router;

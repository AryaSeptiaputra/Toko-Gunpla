const Joi = require('joi');

// Validasi untuk registrasi pengguna
const registerValidation = Joi.object({
  nama_pengguna: Joi.string().min(3).required(),
  kata_sandi: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'pelanggan').required(),
});

// Validasi untuk login pengguna
const loginValidation = Joi.object({
  nama_pengguna: Joi.string().min(3).required(),
  kata_sandi: Joi.string().min(6).required(),
});

// Validasi untuk produk
const productValidation = Joi.object({
  nama_produk: Joi.string().min(3).required(),
  seri: Joi.string().min(1).required(),
  grade: Joi.string().min(1).required(),
  skala: Joi.string().min(1).required(),
  harga: Joi.number().positive().required(),
  stok: Joi.number().integer().min(0).required(),
  deskripsi: Joi.string().optional(),
});

// Validasi untuk transaksi
const transactionValidation = Joi.object({
  id_produk: Joi.number().integer().positive().required(),
  jumlah: Joi.number().integer().positive().required(),
  harga_satuan: Joi.number().positive().required(),
  subtotal: Joi.number().positive().required(),
});

// Validasi untuk detail transaksi
const detailTransactionValidation = Joi.object({
  id_transaksi: Joi.number().integer().positive().required(),
  id_produk: Joi.number().integer().positive().required(),
  jumlah: Joi.number().integer().positive().required(),
  harga_satuan: Joi.number().positive().required(),
  subtotal: Joi.number().positive().required(),
});

// Middleware untuk validasi
const validationMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validationMiddleware,
  registerValidation,
  loginValidation,
  productValidation,
  transactionValidation,
  detailTransactionValidation,
};

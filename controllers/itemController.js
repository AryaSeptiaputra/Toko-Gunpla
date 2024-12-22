const db = require('../db/connection');
const { adminMiddleware } = require('../middlewares/authMiddleware');

// Mengambil semua produk (akses untuk semua pengguna)
const getAllItems = (req, res) => {
  db.query('SELECT * FROM produk', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Membuat produk (hanya admin yang bisa)
const createItem = (req, res) => {
  const { nama_produk, seri, grade, skala, harga, stok, deskripsi } = req.body;

  const query = `
    INSERT INTO produk (nama_produk, seri, grade, skala, harga, stok, deskripsi)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [nama_produk, seri, grade, skala, harga, stok, deskripsi], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Item created successfully.' });
  });
};

// Memperbarui produk (hanya admin yang bisa)
const updateItem = (req, res) => {
  const { id } = req.params;
  const { nama_produk, seri, grade, skala, harga, stok, deskripsi } = req.body;

  const query = `
    UPDATE produk SET nama_produk = ?, seri = ?, grade = ?, skala = ?, harga = ?, stok = ?, deskripsi = ? 
    WHERE id = ?
  `;
  db.query(query, [nama_produk, seri, grade, skala, harga, stok, deskripsi, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Item updated successfully.' });
  });
};

// Menghapus produk (hanya admin yang bisa)
const deleteItem = (req, res) => {
  const { id } = req.params;
  const query = `
    DELETE FROM produk WHERE id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Item deleted successfully.' });
  });
};

module.exports = {
  getAllItems,
  createItem: [adminMiddleware, createItem],
  updateItem: [adminMiddleware, updateItem],
  deleteItem: [adminMiddleware, deleteItem]
};

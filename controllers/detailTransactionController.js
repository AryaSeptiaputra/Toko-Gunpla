const db = require('../db/connection');

const getAllDetailTransactions = (req, res) => {
  db.query('SELECT * FROM detail_transaksi', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const createDetailTransaction = (req, res) => {
  const { id_transaksi, id_produk, jumlah, harga_satuan, subtotal } = req.body;

  const query = `INSERT INTO detail_transaksi (id_transaksi, id_produk, jumlah, harga_satuan, subtotal) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [id_transaksi, id_produk, jumlah, harga_satuan, subtotal], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Detail transaction created successfully.' });
  });
};

const updateDetailTransaction = (req, res) => {
  const { id } = req.params;
  const { id_transaksi, id_produk, jumlah, harga_satuan, subtotal } = req.body;

  const query = `UPDATE detail_transaksi SET id_transaksi = ?, id_produk = ?, jumlah = ?, harga_satuan = ?, subtotal = ? WHERE id = ?`;
  db.query(query, [id_transaksi, id_produk, jumlah, harga_satuan, subtotal, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Detail transaction updated successfully.' });
  });
};

const deleteDetailTransaction = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM detail_transaksi WHERE id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Detail transaction deleted successfully.' });
  });
};

module.exports = { getAllDetailTransactions, createDetailTransaction, updateDetailTransaction, deleteDetailTransaction };

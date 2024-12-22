const db = require('../db/connection');

const getAllTransactions = (req, res) => {
  db.query('SELECT * FROM transaksi', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const createTransaction = (req, res) => {
  const { id_pengguna, total_harga, tanggal_transaksi } = req.body;

  const query = `INSERT INTO transaksi (id_pengguna, total_harga, tanggal_transaksi) VALUES (?, ?, ?)`;
  db.query(query, [id_pengguna, total_harga, tanggal_transaksi], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Transaction created successfully.' });
  });
};

const updateTransaction = (req, res) => {
  const { id } = req.params;
  const { total_harga, tanggal_transaksi } = req.body;

  const query = `UPDATE transaksi SET total_harga = ?, tanggal_transaksi = ? WHERE id_transaksi = ?`;
  db.query(query, [total_harga, tanggal_transaksi, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Transaction updated successfully.' });
  });
};

const deleteTransaction = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM transaksi WHERE id_transaksi = ?`;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Transaction deleted successfully.' });
  });
};

module.exports = { getAllTransactions, createTransaction, updateTransaction, deleteTransaction };

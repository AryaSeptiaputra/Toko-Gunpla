const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');
const { registerValidation, loginValidation } = require('../middlewares/validationMiddleware');

const register = (req, res) => {
  const { error } = registerValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { nama_pengguna, kata_sandi, role } = req.body;

  bcrypt.hash(kata_sandi, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    const query = `INSERT INTO pengguna (nama_pengguna, kata_sandi, role) VALUES (?, ?, ?)`;
    db.query(query, [nama_pengguna, hashedPassword, role], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'User registered successfully.' });
    });
  });
};

const login = (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { nama_pengguna, kata_sandi } = req.body;
  const query = `SELECT * FROM pengguna WHERE nama_pengguna = ?`;
  
  db.query(query, [nama_pengguna], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found.' });

    bcrypt.compare(kata_sandi, results[0].kata_sandi, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials.' });

      const token = jwt.sign({ id: results[0].id, role: results[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};

module.exports = { register, login };

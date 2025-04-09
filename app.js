import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';

const endpoints = express();
endpoints.use(bodyParser.json());

//aki e so a tabela usuarios falta os outros !!!

//  aki eu posso criar novo usuário
endpoints.post('/usuarios', (req, res) => {
  const { nome, email, senha, telefone, endereco, tipo, data_cadastro } = req.body;
  const sql = 'INSERT INTO usuarios (nome, email, senha, telefone, endereco, tipo, data_cadastro) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nome, email, senha, telefone, endereco, tipo, data_cadastro], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId });
  });
});

// aki eu posso listar todos os usuários que tenhp
endpoints.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// aki vejo um usuário por ID que criou 
endpoints.get('/usuarios/:id', (req, res) => {
  db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(results[0]);
  });
});

// aki posso atualizar um usuário que ja existe
endpoints.put('/usuarios/:id', (req, res) => {
  const { nome, email, senha, telefone, endereco, tipo, data_cadastro } = req.body;
  const sql = 'UPDATE usuarios SET nome=?, email=?, senha=?, telefone=?, endereco=?, tipo=?, data_cadastro=? WHERE id=?';
  db.query(sql, [nome, email, senha, telefone, endereco, tipo, data_cadastro, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuário atualizado com sucesso' });
  });
});

// Deletar 
endpoints.delete('/usuarios/:id', (req, res) => {
  db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuário removido com sucesso.' });
  });
});

// Conexão com o banco de dados MySQL que tenho que colocar depois em outro lugar lembrar 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'vetbagda'
  });
  
  // Verifica a conexão
  db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar no banco de dados:', err);
      return;
    }
    console.log('Conectado ao banco de dados MySQL!');
  });

// ✅ Inicializar servidor
const PORT = 5001;
endpoints.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

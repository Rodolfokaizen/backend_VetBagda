import  { Router } from "express";
import db from '../config/db.js';


const endpoints = Router();

// Criar novo usuário
endpoints.post('/usuarios', (req, res) => {
    const {
      login, senha, nome, cpf, celular, data_nascimento, endereco, cidade, estado, cep
    } = req.body;
  
    const sql = `
      INSERT INTO usuarios 
      (login, senha, nome, cpf, celular, data_nascimento, endereco, cidade, estado, cep) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(sql, [login, senha, nome, cpf, celular, data_nascimento, endereco, cidade, estado, cep], 
                  (err, result) => 
                  {
                 if (err) return res.status(500).json({ error: err });
                 res.status(201).json({ id: result.insertId, message: 'Usuário criado com sucesso' });
   });
  });
  
  
  // Deletar usuário
  endpoints.delete('/usuarios/:id', (req, res) => {
    db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Usuário removido com sucesso.' });
    });
  });

  // Listar todos os usuarios 
  endpoints.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });


  // Atualizar usuário
endpoints.put('/usuarios/:id', (req, res) => {
  const {
    login, senha, nome, cpf, celular, data_nascimento, endereco, cidade, estado, cep
  } = req.body;

  const sql = `
    UPDATE usuarios SET 
      login = ?, senha = ?, nome = ?, cpf = ?, celular = ?, 
      data_nascimento = ?, endereco = ?, cidade = ?, estado = ?, cep = ?
    WHERE id = ?`;

  db.query(sql, [login, senha, nome, cpf, celular, data_nascimento, endereco, cidade, estado, cep, req.params.id], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Usuário atualizado com sucesso' });
    }
  );
});


  // Buscar um usuário específico por id 
endpoints.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(results[0]);
  });
});

// Atualizar apenas login e senha do usuário
endpoints.put('/usuarios/:id/credenciais', (req, res) => {
  const { login, senha } = req.body;
  const { id } = req.params;

  const sql = 'UPDATE usuarios SET login = ?, senha = ? WHERE id = ?';

  db.query(sql, [login, senha, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ message: 'Credenciais atualizadas com sucesso' });
  });
});




export default endpoints;
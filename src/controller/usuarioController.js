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
  




export default endpoints;
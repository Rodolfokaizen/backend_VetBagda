import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import adicionarEndpoints from './rotas.js';

const servidor = express();
servidor.use(express.json());
servidor.use(cors());

// adiciona rotas.js
adicionarEndpoints(servidor);


const PORTA = process.env.PORTA;
servidor.listen(
    PORTA,
    () => console.log(`API subiu com sucesso na porta ${PORTA}!`));

import express from 'express';
import usuarioController from './controller/usuarioController.js';



export default function adicionarEndpoints(servidor) {

        //Controllers
        servidor.use(usuarioController);
}
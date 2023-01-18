// const express = require('express'); //estrutura usada inicialmente, no entanto optei por usar 
// const routes = require('./routes') //sucrase e assim obter uma melhor performance na aplicação
import express from "express";
import mongoose from "mongoose";
import routes from './routes';
class App {
    constructor(){
        //this referencia ao App
        this.server = express();

        //configutação de conexão com banco de dados
        mongoose.set('strictQuery', true);
        mongoose.connect('mongodb+srv://devbrito:240800@api-devhouse.roybcr7.mongodb.net/?retryWrites=true&w=majority',{
            //paremetros adcionais obrigatorios para conexão com mongoDB
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        //quando a aplicação se referenciar ao constructor o middleware sera chamado junto das rotas
        this.middlewares();
        this.routes();
    }

    middlewares(){
        //middleware pra exprecificar o uso de json
        this.server.use(express.json());
    }

    routes(){
        //pass o uso das rotas no server
        this.server.use(routes);
    }
}

//exporta uma nova instancia do class App com o server (onde esta o middleware e o route)
// module.exports = new App().server; //estrutura modificada por conta do sucrase
export default new App().server;
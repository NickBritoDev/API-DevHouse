const express = require('express');
const routes = require('./routes')

class App {
    constructor(){
        //this referencia ao App
        this.server = express();

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
module.exports = new App().server;
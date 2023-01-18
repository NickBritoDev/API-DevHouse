//importando o metodo 'router' do express
const { Router } = require("express");

const routes = new Router();

//1ºrota
routes.get('/', (req, res) => {
    return res.json({ok: true});
});

//exportação da rota
module.exports = routes;
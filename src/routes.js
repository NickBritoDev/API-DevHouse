import { Router } from "express";

const routes = new Router();

//1ºrota
routes.get('/', (req, res) => {
    return res.json({teste: true});
});

//exportação da rota
export default routes;
import { Router } from "express";
import HouseController from "./controllers/HouseController";
import SessionController from "./controllers/SessionController";

const routes = new Router();

//1ºrota: rota de criação de acesso (login)
routes.post('/sessions', SessionController.store );

//2ºrota: rota de criação de anuncio (detalhes do imovel)
routes.post('/houses', HouseController.store)

//exportação da rota
export default routes;
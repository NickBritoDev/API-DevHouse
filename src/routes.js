import { Router } from "express";
import SessionController from "./controllers/SessionController";

const routes = new Router();

//1ºrota: rota de criação de acesso
routes.post('/sessions', SessionController.store );

//exportação da rota
export default routes;
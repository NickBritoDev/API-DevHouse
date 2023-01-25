import { Router } from "express";
import multer from "multer";

import UploadConfig from "./config/Upload";
import HouseController from "./controllers/HouseController";
import SessionController from "./controllers/SessionController";

const routes = new Router();
//inicialização do multer
const upload = multer(UploadConfig)

//1ºrota: rota de criação de acesso (login)
routes.post('/sessions', SessionController.store );

//2ºrota: rota de criação de anuncio (detalhes do imovel)
routes.post('/houses', upload.single('thumbnail') ,HouseController.store)

//3ºrota: rota de para alterar o status do imovel
routes.get('/houses', HouseController.index)

//exportação da rota
export default routes;
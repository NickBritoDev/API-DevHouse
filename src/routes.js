import { Router } from "express";
import multer from "multer";

import UploadConfig from "./config/Upload";
import HouseController from "./controllers/HouseController";
import SessionController from "./controllers/SessionController";
import DashboardController from "./controllers/DashboardController";

const routes = new Router();
//inicialização do multer
const upload = multer(UploadConfig)

//1ºrota: rota de criação de acesso (login)
routes.post('/sessions', SessionController.store );

//2ºrota: rota de criação de anuncio (detalhes do imovel com upload de imagem)
routes.post('/houses', upload.single('thumbnail') ,HouseController.store)

//3ºrota: rota de para alterar o status do imovel
routes.get('/houses', HouseController.index)

//4ºrota: de edição de dados referentes ao imovel (com upload de imagem)
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update)

//5ºrota: rota de destruição do imovel
routes.delete('/houses', HouseController.destroy)

//6ºrota: rota de listagem de imoveis
routes.get('/dashboard', DashboardController.show)

//exportação da rota
export default routes;
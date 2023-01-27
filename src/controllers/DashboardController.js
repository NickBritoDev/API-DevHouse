import House from "../models/House";

class DashboardController{
    async show (req, res){
        const {user_id} = req.headers //captura o id do usuario para fazer a listagem

        const houses = await House.find({user: user_id})//faz a busca para compara os id's
        
       return res.json(houses) 
    }
}

export default new DashboardController()
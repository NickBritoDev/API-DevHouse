import User from '../models/User'; //model de usuario

class SessionController{

    //gera uma nova sessão
    async store(req, res){
        
        // const email = req.body.email; // requisição feita sem descontruir 
        const {email} = req.body; //descontruição do javascript

        //criação de novo usuario no banco de dados na tabela de usuarios
        let user = await User.create({email});

        //retorna o email do novo usuario
        return res.json(user);
    }
}

//exportação do controller para criação de rota
export default new SessionController();
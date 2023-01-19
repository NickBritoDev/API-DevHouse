import User from '../models/User'; //model de usuario

class SessionController{

    //gera uma nova sessão
    async store(req, res){
        
        // const email = req.body.email; // requisição feita sem descontruir 
        const {email} = req.body; //descontruição do javascript

        //busca por um usuario com o mesmo email
        let user = await User.findOne({email});

        //verifica a  existencia de um usuario com o mesmo email
        if(!user){
            //se não houver nenhum usuario registrado com o memsmo email ele cria um novo usuario
            user = await User.create({email});
        }


        //retorna o email do usuario
        return res.json(user);
    }
}

//exportação do controller para criação de rota
export default new SessionController();
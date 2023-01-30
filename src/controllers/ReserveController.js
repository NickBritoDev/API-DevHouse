import House from "../models/House";
import Reserve from "../models/Reserve";
import User from "../models/User";

class ReserveController{
    async store(req,res){
        const {user_id} = req.headers //captura o id do usuario
        const {house_id} = req.params //captura o id do imovel
        const {date} = req.body //captura a data de locação

        //cria uma solicitação de locação
        const reserve = await Reserve.create({ 
            user: user_id,
            house: house_id,
            date,
        })

        //popula a solicitação com a junção do que ele encontrar em "populate(house) e populate(user)"
        await reserve.populate('house')
        await reserve.populate('user')

        const house = await House.findById(house_id) //busca o id do imovel
        if(!house){ //caso o id não se refira a nenhum imovel existente ele retorn um bad request
            return res.status(400).json({error: 'Esse imovel não existe.'})
        }

        if(house.status !== true){ //caso exista o imovel passado no id ele tem que estar disponivel "status: true"
            return res.status(400).json({error: 'Solicitação Indisponivel.'}) //se for false ele é barrado
        }

        const user = await User.findById(user_id)
        if(String(user_id) === String(house.user)){
            return res.status(401).json({error: 'Locação não autorizada.'})
        }

        return res.json(reserve)
    }
}

export default new ReserveController()
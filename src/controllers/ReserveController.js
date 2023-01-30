import House from "../models/House";
import Reserve from "../models/Reserve";
import User from "../models/User";

class ReserveController {
    //lista os imoveis que estão sob locação do usuario
    async index(req, res) {
        const { user_id } = req.headers
        //tras as informaçõs da residencia populadas juntas das informações do usuario
        const reserves = await Reserve.find({ user: user_id }).populate('house')

        return res.json(reserves)
    }

    //solicita a locação de um imovel
    async store(req, res) {
        const { user_id } = req.headers //captura o id do usuario
        const { house_id } = req.params //captura o id do imovel
        const { date } = req.body //captura a data de locação

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
        if (!house) { //caso o id não se refira a nenhum imovel existente ele retorn um bad request
            return res.status(400).json({ error: 'Esse imovel não existe.' })
        }

        if (house.status !== true) { //caso exista o imovel passado no id ele tem que estar disponivel "status: true"
            return res.status(400).json({ error: 'Solicitação Indisponivel.' }) //se for false ele é barrado
        }

        const user = await User.findById(user_id)//barra o usuario caso o id do mesmo não seja compativel com
        if (String(user_id) === String(house.user)) { //o id do usuario que cadastrou a residencia
            return res.status(401).json({ error: 'Locação não autorizada.' })
        }

        return res.json(reserve)
    }

    //solicita o cancelamento de uma locação
    async destroy(req, res) {
        const { reserve_id } = req.body

        await Reserve.findByIdAndDelete({ _id: reserve_id })
        return res.send()
    }
}

export default new ReserveController()
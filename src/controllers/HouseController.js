import House from '../models/House'

class HouseController {

    async index(req, res) {
        //captura o 'status' do query params
        const { status } = req.query


        //busca todas as casa com o 'status: status'
        const houses = await House.find({ status })

        return res.json(houses)
    }

    async store(req, res) {
        const { filename } = req.file //captura de arquivo
        const { description, price, location, status } = req.body //captura do array com os dados do imovel
        const { user_id } = req.headers //captura do id do usuario que fizer o anuncio

        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,

        })
        return res.json({ house })
    }
}

export default new HouseController();
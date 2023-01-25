import House from '../models/House'

class HouseController {

    //faz a listagem dos impveis por status
    async index(req, res) {
        //captura o 'status' do query params
        const { status } = req.query


        //busca todas as casa com o 'status: status'
        const houses = await House.find({ status })

        return res.json(houses)
    }

    //envia para o DB os dados necessarios para criar o anuncio do imovel
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

    //faz a alteração dos dados do imovel
    async update(req, res) {
        const { houseID } = req.params //captura o id do imovel
        const { filename } = req.file //captura de arquivo
        const { description, price, location, status } = req.body //captura do array com os dados do imovel
        const { user_id } = req.headers //captura do id do usuario que fizer o anuncio

        const houses = await House.updateOne({ _id: houseID }, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        })


        return res.send('Edição realizada com sucesso')
    }
}

export default new HouseController();
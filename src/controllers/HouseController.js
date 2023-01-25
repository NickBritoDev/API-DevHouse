import House from '../models/House'
import User from '../models/User'

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
        const { house_id } = req.params //captura o id do imovel
        const { filename } = req.file //captura de arquivo
        const { description, price, location, status } = req.body //captura do array com os dados do imovel
        const { user_id } = req.headers //captura do id do usuario que fizer o anuncio

        const user = await User.findById(user_id) //busca o id do usuario logado
        const houses = await House.findById(house_id) //busca o id do imovel

        //compara se o id do usuario é o mesmo id do usuario que fez o anuncio do imovel
        if (String(user._id) !== String(houses.user)) {
            return res.status(401).json({ message: 'Não autorizado' })
        }

        //itens que podem ser editados
        await House.updateOne({ _id: house_id }, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        })


        return res.status(200).json({ message: 'Imovel editado com sucesso' })
    }

    //faz a destruição do imovel
    async destroy(req, res) {
        const { house_id } = req.body //busca o id referente ao imovel
        const { user_id } = req.headers //busca o id referente ao usuario

        const user = await User.findById(user_id) //busca o id do usuario logado
        const houses = await House.findById(house_id) //busca o id do imovel


         //compara se o id do usuario é o mesmo id do usuario que fez o anuncio do imovel
         if (String(user._id) !== String(houses.user)) {
            return res.status(401).json({ message: 'Não autorizado' })
        }

        await House.findByIdAndDelete({_id: house_id})

        return res.json({ message: 'Excluida com sucesso' })
    }
}

export default new HouseController();
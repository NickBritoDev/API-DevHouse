import House from '../models/House'

class HouseController{

    async store(req, res){
        const {filename} = req.file //captura de arquivo
        const {description, price, location, status} = req.body //captura do array com os dados do imovel
        const {user_id} = req.headers //captura do id do usuario que fizer o anuncio

        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,

        })
        return res.json({house})
    }
}

export default new HouseController();
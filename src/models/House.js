import { Schema, model } from "mongoose";

//criação da tabela de usuario com os campos de imagem, descrição, preço, localização, disponibilidade e identificação do usuario referente ao anucio
const HouseSchema = new Schema({
    thumbnail: String, //imagem do imovel
    description: String, //descrição do imovel
    price: Number, //valor do imovel
    location: String, //localização do imovel
    status: Boolean, //disponibilidade do imovel
    user: {
        type: Schema.Types.ObjectId, //retorna o id do usuario do model de user
        ref: 'User',
    }
});

//exportando house e sua respectiva schema
export default model('House', HouseSchema);
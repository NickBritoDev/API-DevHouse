import { Schema, model } from "mongoose";

const ReserveSchema = new Schema({
    //envia os dados em forma de sting contendo a data de locação
    date: String,
    user: { //referencia o id do usuario que pretende locar
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    house: { //referencia o id do imovel que o usuario deseja locar
        type: Schema.Types.ObjectId,
        ref: 'House'
    }
})

export default model('Reserve', ReserveSchema)